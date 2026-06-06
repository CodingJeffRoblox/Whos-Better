// Check if user is admin using server verification
async function checkAdminAccess() {
    const isAdminVerified = await verifyAdminStatus();
    if (!isAdminVerified) {
        window.location.href = 'index.html';
    }
}

checkAdminAccess();

let allUsers = {};
let allTickets = {};

async function loadAdminData() {
    try {
        // Load users from server
        const usersResponse = await fetch(`${API_BASE_URL}/api/admin/users`, {
            headers: {
                'Authorization': `Bearer ${await getAuthToken()}`
            }
        });
        allUsers = await usersResponse.json();
        
        // Load tickets from server
        const ticketsResponse = await fetch(`${API_BASE_URL}/api/admin/tickets`, {
            headers: {
                'Authorization': `Bearer ${await getAuthToken()}`
            }
        });
        allTickets = await ticketsResponse.json();
        
        updateAdminStats();
        renderUsersTable();
        renderTicketsList();
    } catch (error) {
        console.error('Error loading admin data from server:', error);
        // Fallback to direct Firebase
        try {
            const usersSnapshot = await db.ref('users').once('value');
            allUsers = usersSnapshot.val() || {};
            
            const ticketsSnapshot = await db.ref('tickets').once('value');
            allTickets = ticketsSnapshot.val() || {};
            
            updateAdminStats();
            renderUsersTable();
            renderTicketsList();
        } catch (fallbackError) {
            console.error('Fallback also failed:', fallbackError);
        }
    }
}

function updateAdminStats() {
    const users = Object.values(allUsers);
    const totalUsers = users.length;
    const activeUsers = users.filter(u => u.status === 'active').length;
    const bannedUsers = users.filter(u => u.status === 'banned').length;
    const suspendedUsers = users.filter(u => u.status === 'suspended').length;
    const openTickets = Object.values(allTickets).filter(t => t.status === 'open').length;
    
    document.getElementById('totalUsers').textContent = totalUsers;
    document.getElementById('activeUsers').textContent = activeUsers;
    document.getElementById('bannedUsers').textContent = bannedUsers;
    document.getElementById('suspendedUsers').textContent = suspendedUsers;
    document.getElementById('openTickets').textContent = openTickets;
}

function renderUsersTable() {
    const container = document.getElementById('usersTable');
    const searchTerm = document.getElementById('userSearch').value.toLowerCase();
    const statusFilter = document.getElementById('statusFilter').value;
    
    let users = Object.entries(allUsers).map(([uid, data]) => ({ uid, ...data }));
    
    // Filter users
    users = users.filter(user => {
        const matchesSearch = user.username.toLowerCase().includes(searchTerm) || 
                            user.email.toLowerCase().includes(searchTerm);
        const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
        return matchesSearch && matchesStatus;
    });
    
    container.innerHTML = `
        <table class="admin-table">
            <thead>
                <tr>
                    <th>User</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>XP</th>
                    <th>Level</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${users.map(user => `
                    <tr>
                        <td>
                            <div class="user-cell">
                                <div class="user-avatar">${user.username.charAt(0).toUpperCase()}</div>
                                <div class="user-name">${user.username}</div>
                            </div>
                        </td>
                        <td>${user.email}</td>
                        <td>
                            <span class="status-badge ${user.role === 'admin' ? 'admin' : 'user'}">${user.role}</span>
                        </td>
                        <td>
                            <span class="status-badge ${user.status}">${user.status}</span>
                        </td>
                        <td>${user.xp}</td>
                        <td>${user.level}</td>
                        <td>
                            <button class="action-button" onclick="openUserModal('${user.uid}')">Manage</button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

function renderTicketsList() {
    const container = document.getElementById('ticketsList');
    const tickets = Object.entries(allTickets)
        .map(([ticketId, data]) => ({ ticketId, ...data }))
        .filter(t => t.status === 'open');
    
    if (tickets.length === 0) {
        container.innerHTML = '<div class="no-data">No open tickets</div>';
        return;
    }
    
    container.innerHTML = `
        <div class="tickets-grid">
            ${tickets.map(ticket => `
                <div class="ticket-card" onclick="openTicketChat('${ticket.ticketId}')">
                    <div class="ticket-header">
                        <div class="ticket-type">${ticket.type}</div>
                        <div class="ticket-status">${ticket.status}</div>
                    </div>
                    <div class="ticket-subject">${ticket.subject}</div>
                    <div class="ticket-user">From: ${ticket.username}</div>
                    <div class="ticket-date">${new Date(ticket.createdAt).toLocaleDateString()}</div>
                    <div class="ticket-message-count">${ticket.messages ? Object.keys(ticket.messages).length : 0} messages</div>
                </div>
            `).join('')}
        </div>
    `;
}

function openUserModal(uid) {
    const user = allUsers[uid];
    const modal = document.getElementById('userModal');
    const modalBody = document.getElementById('userModalBody');
    
    modalBody.innerHTML = `
        <div class="user-details">
            <div class="user-detail-row">
                <span class="user-detail-label">Username:</span>
                <span class="user-detail-value">${user.username}</span>
            </div>
            <div class="user-detail-row">
                <span class="user-detail-label">Email:</span>
                <span class="user-detail-value">${user.email}</span>
            </div>
            <div class="user-detail-row">
                <span class="user-detail-label">Role:</span>
                <span class="user-detail-value">${user.role}</span>
            </div>
            <div class="user-detail-row">
                <span class="user-detail-label">Status:</span>
                <span class="user-detail-value">${user.status}</span>
            </div>
            <div class="user-detail-row">
                <span class="user-detail-label">XP:</span>
                <span class="user-detail-value">${user.xp}</span>
            </div>
            <div class="user-detail-row">
                <span class="user-detail-label">Level:</span>
                <span class="user-detail-value">${user.level}</span>
            </div>
        </div>
        
        <div class="user-actions">
            <h4>Actions</h4>
            <div class="action-buttons">
                ${user.role !== 'admin' ? `
                    <button class="action-button promote" onclick="changeUserRole('${uid}', 'admin')">Promote to Admin</button>
                ` : ''}
                ${user.role === 'admin' ? `
                    <button class="action-button demote" onclick="changeUserRole('${uid}', 'user')">Demote to User</button>
                ` : ''}
                ${user.status === 'active' ? `
                    <button class="action-button suspend" onclick="changeUserStatus('${uid}', 'suspended')">Suspend User</button>
                    <button class="action-button ban" onclick="changeUserStatus('${uid}', 'banned')">Ban User</button>
                ` : ''}
                ${user.status === 'suspended' ? `
                    <button class="action-button activate" onclick="changeUserStatus('${uid}', 'active')">Activate User</button>
                    <button class="action-button ban" onclick="changeUserStatus('${uid}', 'banned')">Ban User</button>
                ` : ''}
                ${user.status === 'banned' ? `
                    <button class="action-button activate" onclick="changeUserStatus('${uid}', 'active')">Activate User</button>
                ` : ''}
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
}

async function changeUserRole(uid, newRole) {
    if (!confirm(`Are you sure you want to change this user's role to ${newRole}?`)) return;
    
    try {
        await serverChangeUserRole(uid, newRole);
        await loadAdminData();
        document.getElementById('userModal').style.display = 'none';
    } catch (error) {
        console.error('Error changing user role:', error);
        alert('Failed to change user role');
    }
}

async function changeUserStatus(uid, newStatus) {
    if (!confirm(`Are you sure you want to ${newStatus} this user?`)) return;
    
    try {
        if (newStatus === 'banned') {
            await serverBanUser(uid);
        } else if (newStatus === 'suspended') {
            await serverSuspendUser(uid);
        } else if (newStatus === 'active') {
            await serverActivateUser(uid);
        }
        await loadAdminData();
        document.getElementById('userModal').style.display = 'none';
    } catch (error) {
        console.error('Error changing user status:', error);
        alert('Failed to change user status');
    }
}

function openTicketChat(ticketId) {
    window.location.href = `support-chat.html?ticketId=${ticketId}`;
}

// Tab switching
document.querySelectorAll('.admin-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.admin-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        document.querySelectorAll('.admin-tab-content').forEach(content => {
            content.style.display = 'none';
        });
        
        const tabName = tab.getAttribute('data-tab');
        document.getElementById(tabName + 'Tab').style.display = 'block';
    });
});

// Search and filter
document.getElementById('userSearch').addEventListener('input', renderUsersTable);
document.getElementById('statusFilter').addEventListener('change', renderUsersTable);

// Modal close
document.getElementById('closeUserModal').addEventListener('click', () => {
    document.getElementById('userModal').style.display = 'none';
});

// Close modal on outside click
window.addEventListener('click', (e) => {
    const modal = document.getElementById('userModal');
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Load data
loadAdminData();
