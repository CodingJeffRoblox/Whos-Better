// Check if user is logged in
if (!currentUser) {
    window.location.href = 'login.html';
}

// Get ticket ID from URL
const urlParams = new URLSearchParams(window.location.search);
const ticketId = urlParams.get('ticketId');

if (!ticketId) {
    window.location.href = 'support.html';
}

let ticketData = null;
let messagesListener = null;

async function loadTicket() {
    try {
        const snapshot = await db.ref('tickets/' + ticketId).once('value');
        ticketData = snapshot.val();
        
        if (!ticketData) {
            alert('Ticket not found');
            window.location.href = 'support.html';
            return;
        }
        
        // Check if user has access to this ticket
        if (!isAdmin && ticketData.userId !== currentUser.uid) {
            alert('You do not have access to this ticket');
            window.location.href = 'support.html';
            return;
        }
        
        // Check if ticket is closed
        if (ticketData.status === 'closed') {
            alert('This ticket has been closed');
            window.location.href = 'support.html';
            return;
        }
        
        // Update chat header
        document.getElementById('chatTitle').textContent = ticketData.subject;
        document.getElementById('chatSubtitle').textContent = `${ticketData.type} - ${ticketData.username}`;
        
        // Listen for messages
        listenForMessages();
    } catch (error) {
        console.error('Error loading ticket:', error);
        alert('Failed to load ticket');
        window.location.href = 'support.html';
    }
}

function listenForMessages() {
    if (messagesListener) {
        db.ref('tickets/' + ticketId + '/messages').off('child_added', messagesListener);
    }
    
    messagesListener = db.ref('tickets/' + ticketId + '/messages').on('child_added', (snapshot) => {
        renderMessages();
    });
}

async function renderMessages() {
    const container = document.getElementById('chatMessages');
    const snapshot = await db.ref('tickets/' + ticketId + '/messages').once('value');
    const messages = snapshot.val() || {};
    
    const sortedMessages = Object.entries(messages)
        .sort((a, b) => a[0] - b[0])
        .map(([timestamp, msg]) => ({ timestamp: parseInt(timestamp), ...msg }));
    
    container.innerHTML = sortedMessages.map(msg => {
        const isOwn = msg.sender === 'user' && msg.senderName === userData.username;
        const isAdminMsg = msg.sender === 'admin';
        
        return `
            <div class="chat-message ${isOwn ? 'own' : ''} ${isAdminMsg ? 'admin' : ''}">
                <div class="message-sender">${msg.senderName}</div>
                <div class="message-content">${msg.message}</div>
                <div class="message-time">${new Date(msg.timestamp).toLocaleTimeString()}</div>
            </div>
        `;
    }).join('');
    
    // Scroll to bottom
    container.scrollTop = container.scrollHeight;
}

async function sendMessage() {
    const input = document.getElementById('messageInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    try {
        await serverSendMessage(ticketId, message);
        input.value = '';
    } catch (error) {
        console.error('Error sending message:', error);
        alert('Failed to send message');
    }
}

async function closeTicket() {
    if (!isAdmin) return;
    
    if (!confirm('Are you sure you want to close this ticket?')) return;
    
    try {
        await serverCloseTicket(ticketId);
        alert('Ticket closed successfully');
        window.location.href = 'admin.html';
    } catch (error) {
        console.error('Error closing ticket:', error);
        alert('Failed to close ticket');
    }
}

// Event listeners
document.getElementById('sendMessage').addEventListener('click', sendMessage);
document.getElementById('messageInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
});

if (isAdmin) {
    document.getElementById('closeTicket').addEventListener('click', closeTicket);
}

// Load ticket
loadTicket();
