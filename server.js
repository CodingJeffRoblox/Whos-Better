const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const serviceAccount = require('./service-account-key.json');

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://who-s-better-27d26-default-rtdb.firebaseio.com/'
});

const db = admin.database();

// Middleware
app.use(cors());
app.use(express.json());

// Middleware to verify Firebase ID token
async function verifyToken(req, res, next) {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }
    
    const token = authHeader.split('Bearer ')[1];
    
    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.user = decodedToken;
        next();
    } catch (error) {
        console.error('Token verification error:', error);
        return res.status(401).json({ error: 'Unauthorized: Invalid token' });
    }
}

// Middleware to verify admin status
async function verifyAdmin(req, res, next) {
    try {
        const userSnapshot = await db.ref('users/' + req.user.uid).once('value');
        const userData = userSnapshot.val();
        
        if (!userData || userData.role !== 'admin') {
            return res.status(403).json({ error: 'Forbidden: Admin access required' });
        }
        
        req.userData = userData;
        next();
    } catch (error) {
        console.error('Admin verification error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

// Middleware to verify user is not banned/suspended
async function verifyUserStatus(req, res, next) {
    try {
        const userSnapshot = await db.ref('users/' + req.user.uid).once('value');
        const userData = userSnapshot.val();
        
        if (!userData) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        if (userData.status === 'banned') {
            return res.status(403).json({ error: 'Account banned' });
        }
        
        if (userData.status === 'suspended') {
            return res.status(403).json({ error: 'Account suspended' });
        }
        
        req.userData = userData;
        next();
    } catch (error) {
        console.error('User status verification error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ status: 'ok', message: 'Server is running' });
});

// Verify user status endpoint
app.get('/api/verify-status', verifyToken, verifyUserStatus, (req, res) => {
    res.json({
        uid: req.user.uid,
        email: req.user.email,
        role: req.userData.role,
        status: req.userData.status,
        username: req.userData.username
    });
});

// Verify admin status endpoint
app.get('/api/verify-admin', verifyToken, verifyAdmin, (req, res) => {
    res.json({
        uid: req.user.uid,
        email: req.user.email,
        role: req.userData.role,
        isAdmin: true
    });
});

// Get user data (admin only)
app.get('/api/admin/users/:uid', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const snapshot = await db.ref('users/' + req.params.uid).once('value');
        const userData = snapshot.val();
        
        if (!userData) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        res.json(userData);
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get all users (admin only)
app.get('/api/admin/users', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const snapshot = await db.ref('users').once('value');
        const users = snapshot.val() || {};
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Change user role (admin only)
app.put('/api/admin/users/:uid/role', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const { role } = req.body;
        
        if (role !== 'admin' && role !== 'user') {
            return res.status(400).json({ error: 'Invalid role' });
        }
        
        // Prevent removing last admin
        if (role === 'user') {
            const snapshot = await db.ref('users').once('value');
            const users = snapshot.val() || {};
            const adminCount = Object.values(users).filter(u => u.role === 'admin').length;
            
            if (adminCount <= 1) {
                return res.status(400).json({ error: 'Cannot remove last admin' });
            }
        }
        
        await db.ref('users/' + req.params.uid + '/role').set(role);
        res.json({ success: true, message: 'Role updated successfully' });
    } catch (error) {
        console.error('Error updating user role:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Change user status (admin only)
app.put('/api/admin/users/:uid/status', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const { status } = req.body;
        
        if (status !== 'active' && status !== 'suspended' && status !== 'banned') {
            return res.status(400).json({ error: 'Invalid status' });
        }
        
        // Prevent banning other admins
        const userSnapshot = await db.ref('users/' + req.params.uid).once('value');
        const userData = userSnapshot.val();
        
        if (userData.role === 'admin' && status !== 'active') {
            return res.status(400).json({ error: 'Cannot ban/suspend admin' });
        }
        
        await db.ref('users/' + req.params.uid + '/status').set(status);
        res.json({ success: true, message: 'Status updated successfully' });
    } catch (error) {
        console.error('Error updating user status:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Create support ticket
app.post('/api/tickets', verifyToken, verifyUserStatus, async (req, res) => {
    try {
        const { type, subject, message } = req.body;
        
        if (!type || !subject || !message) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        
        const ticketRef = db.ref('tickets').push();
        const ticketId = ticketRef.key;
        
        const ticketData = {
            userId: req.user.uid,
            username: req.userData.username,
            email: req.userData.email,
            type: type,
            subject: subject,
            status: 'open',
            createdAt: admin.database.ServerValue.TIMESTAMP,
            messages: {
                [Date.now()]: {
                    sender: 'user',
                    senderName: req.userData.username,
                    message: message
                }
            }
        };
        
        await ticketRef.set(ticketData);
        res.json({ success: true, ticketId: ticketId });
    } catch (error) {
        console.error('Error creating ticket:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get user's tickets
app.get('/api/tickets', verifyToken, verifyUserStatus, async (req, res) => {
    try {
        const snapshot = await db.ref('tickets').once('value');
        const allTickets = snapshot.val() || {};
        
        const userTickets = Object.entries(allTickets)
            .filter(([ticketId, ticket]) => ticket.userId === req.user.uid)
            .reduce((acc, [ticketId, ticket]) => {
                acc[ticketId] = ticket;
                return acc;
            }, {});
        
        res.json(userTickets);
    } catch (error) {
        console.error('Error fetching tickets:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get all tickets (admin only)
app.get('/api/admin/tickets', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const snapshot = await db.ref('tickets').once('value');
        const tickets = snapshot.val() || {};
        res.json(tickets);
    } catch (error) {
        console.error('Error fetching tickets:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get specific ticket
app.get('/api/tickets/:ticketId', verifyToken, async (req, res) => {
    try {
        const snapshot = await db.ref('tickets/' + req.params.ticketId).once('value');
        const ticket = snapshot.val();
        
        if (!ticket) {
            return res.status(404).json({ error: 'Ticket not found' });
        }
        
        // Get user data to check admin status
        const userSnapshot = await db.ref('users/' + req.user.uid).once('value');
        const userData = userSnapshot.val();
        const isAdmin = userData && userData.role === 'admin';
        
        // Check if user has access
        if (!isAdmin && ticket.userId !== req.user.uid) {
            return res.status(403).json({ error: 'Forbidden: Access denied' });
        }
        
        // Check if ticket is closed
        if (ticket.status === 'closed') {
            return res.status(403).json({ error: 'Ticket is closed' });
        }
        
        res.json(ticket);
    } catch (error) {
        console.error('Error fetching ticket:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Add message to ticket
app.post('/api/tickets/:ticketId/messages', verifyToken, async (req, res) => {
    try {
        const { message } = req.body;
        
        if (!message) {
            return res.status(400).json({ error: 'Message is required' });
        }
        
        const snapshot = await db.ref('tickets/' + req.params.ticketId).once('value');
        const ticket = snapshot.val();
        
        if (!ticket) {
            return res.status(404).json({ error: 'Ticket not found' });
        }
        
        // Get user data to check admin status
        const userSnapshot = await db.ref('users/' + req.user.uid).once('value');
        const userData = userSnapshot.val();
        const isAdmin = userData && userData.role === 'admin';
        
        // Check if user has access
        if (!isAdmin && ticket.userId !== req.user.uid) {
            return res.status(403).json({ error: 'Forbidden: Access denied' });
        }
        
        // Check if ticket is closed
        if (ticket.status === 'closed') {
            return res.status(403).json({ error: 'Ticket is closed' });
        }
        
        const sender = isAdmin ? 'admin' : 'user';
        const senderName = isAdmin ? 'Support' : userData.username;
        
        await db.ref('tickets/' + req.params.ticketId + '/messages').push({
            sender: sender,
            senderName: senderName,
            message: message,
            timestamp: admin.database.ServerValue.TIMESTAMP
        });
        
        res.json({ success: true });
    } catch (error) {
        console.error('Error adding message:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Close ticket (admin only)
app.put('/api/admin/tickets/:ticketId/close', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const snapshot = await db.ref('tickets/' + req.params.ticketId).once('value');
        const ticket = snapshot.val();
        
        if (!ticket) {
            return res.status(404).json({ error: 'Ticket not found' });
        }
        
        if (ticket.status === 'closed') {
            return res.status(400).json({ error: 'Ticket is already closed' });
        }
        
        await db.ref('tickets/' + req.params.ticketId).update({
            status: 'closed',
            closedAt: admin.database.ServerValue.TIMESTAMP,
            closedBy: req.user.uid
        });
        
        res.json({ success: true, message: 'Ticket closed successfully' });
    } catch (error) {
        console.error('Error closing ticket:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
