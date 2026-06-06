// Check if user is logged in
if (!currentUser) {
    window.location.href = 'login.html';
}

let userTickets = {};

async function loadUserTickets() {
    try {
        // Try to load from server
        userTickets = await serverGetTickets();
        renderUserTickets();
    } catch (error) {
        console.error('Error loading tickets from server:', error);
        // Fallback to direct Firebase
        try {
            const snapshot = await db.ref('tickets').once('value');
            const allTickets = snapshot.val() || {};
            
            userTickets = Object.entries(allTickets)
                .filter(([ticketId, ticket]) => ticket.userId === currentUser.uid)
                .reduce((acc, [ticketId, ticket]) => {
                    acc[ticketId] = ticket;
                    return acc;
                }, {});
            
            renderUserTickets();
        } catch (fallbackError) {
            console.error('Fallback also failed:', fallbackError);
        }
    }
}

function renderUserTickets() {
    const container = document.getElementById('userTicketsList');
    const tickets = Object.entries(userTickets)
        .map(([ticketId, ticket]) => ({ ticketId, ...ticket }))
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
                    <div class="ticket-date">${new Date(ticket.createdAt).toLocaleDateString()}</div>
                    <div class="ticket-message-count">${ticket.messages ? Object.keys(ticket.messages).length : 0} messages</div>
                </div>
            `).join('')}
        </div>
    `;
}

async function submitTicket() {
    const type = document.getElementById('ticketType').value;
    const subject = document.getElementById('ticketSubject').value;
    const message = document.getElementById('ticketMessage').value;
    
    if (!subject || !message) {
        showSuccess('Please fill in all fields', 'error');
        return;
    }
    
    try {
        await serverCreateTicket(type, subject, message);
        
        showSuccess('Ticket created successfully!');
        
        document.getElementById('ticketSubject').value = '';
        document.getElementById('ticketMessage').value = '';
        
        await loadUserTickets();
    } catch (error) {
        console.error('Error creating ticket:', error);
        showSuccess('Failed to create ticket', 'error');
    }
}

function openTicketChat(ticketId) {
    window.location.href = `support-chat.html?ticketId=${ticketId}`;
}

function showSuccess(message, type = 'success') {
    const popup = document.getElementById('successPopup');
    popup.textContent = message;
    popup.style.background = type === 'error' 
        ? 'linear-gradient(135deg, #ef4444, #dc2626)' 
        : 'linear-gradient(135deg, #22c55e, #16a34a)';
    popup.style.display = 'block';
    popup.style.animation = 'fadeInUp 0.3s ease';
    
    setTimeout(() => {
        popup.style.display = 'none';
    }, 3000);
}

// Tab switching
document.querySelectorAll('.support-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.support-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        document.querySelectorAll('.support-tab-content').forEach(content => {
            content.style.display = 'none';
        });
        
        const tabName = tab.getAttribute('data-tab');
        document.getElementById(tabName + 'Tab').style.display = 'block';
        
        if (tabName === 'my-tickets') {
            loadUserTickets();
        }
    });
});

// Submit ticket
document.getElementById('submitTicket').addEventListener('click', submitTicket);

// Load tickets on page load
loadUserTickets();
