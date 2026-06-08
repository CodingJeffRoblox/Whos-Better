const firebaseConfig = {
  apiKey: "AIzaSyBSG1gnnUC0M77KL39zqWsetfnjnBaVJng",
  authDomain: "who-s-better-27d26.firebaseapp.com",
  databaseURL: "https://who-s-better-27d26-default-rtdb.firebaseio.com/",
  projectId: "who-s-better-27d26",
  storageBucket: "who-s-better-27d26.firebasestorage.app",
  messagingSenderId: "583497129419",
  appId: "1:583497129419:web:9d3216501c9741b6486a4e",
  measurementId: "G-FMR841X7XC"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database();

let currentUser = null;
let userData = null;
let isAdmin = false;

auth.onAuthStateChanged(async (user) => {
    currentUser = user;
    
    if (user) {
        const userRef = db.ref('users/' + user.uid);
        const snapshot = await userRef.once('value');
        
        if (snapshot.exists()) {
            userData = snapshot.val();
            isAdmin = userData.role === 'admin';
            
            // Check if user is banned or suspended
            if (userData.status === 'banned') {
                alert('Your account has been banned. Please contact support for more information.');
                await auth.signOut();
                window.location.href = 'banned.html';
                return;
            }
            
            if (userData.status === 'suspended') {
                alert('Your account has been suspended. Please contact support for more information.');
                await auth.signOut();
                window.location.href = 'suspended.html';
                return;
            }
            
            updateAuthUI(true);
            updateAdminUI();
        } else {
            userData = {
                username: user.displayName || 'User',
                email: user.email,
                totalVotes: 0,
                xp: 0,
                level: 1,
                streak: 0,
                lastVisit: null,
                categoryVotes: {
                    gaming: 0,
                    movies: 0,
                    food: 0,
                    cars: 0,
                    technology: 0,
                    sports: 0,
                    music: 0,
                    random: 0
                },
                achievements: [],
                battleResults: {},
                role: 'user',
                status: 'active',
                createdAt: firebase.database.ServerValue.TIMESTAMP
            };
            await userRef.set(userData);
            updateAuthUI(true);
            updateAdminUI();
        }
    } else {
        userData = null;
        isAdmin = false;
        updateAuthUI(false);
        updateAdminUI();
    }
});

function updateAuthUI(isLoggedIn) {
    const authSection = document.getElementById('authSection');
    const profileCard = document.getElementById('profileCard');
    
    if (isLoggedIn && userData) {
        authSection.style.display = 'none';
        profileCard.style.display = 'flex';
        
        const usernameEl = document.getElementById('username');
        const userLevelEl = document.getElementById('userLevel');
        const userXPEl = document.getElementById('userXP');
        const userStreakEl = document.getElementById('userStreak');
        
        if (usernameEl) usernameEl.textContent = userData.username;
        if (userLevelEl) userLevelEl.textContent = userData.level;
        if (userXPEl) userXPEl.textContent = userData.xp;
        if (userStreakEl) userStreakEl.textContent = userData.streak;
        
        const logoutButton = document.getElementById('logoutButton');
        if (logoutButton) {
            logoutButton.addEventListener('click', () => {
                auth.signOut();
                window.location.href = 'index.html';
            });
        }
    } else {
        const authSection = document.getElementById('authSection');
        const profileCard = document.getElementById('profileCard');
        if (authSection) authSection.style.display = 'flex';
        if (profileCard) profileCard.style.display = 'none';
    }
}

async function saveUserData() {
    if (currentUser && userData) {
        await db.ref('users/' + currentUser.uid).update(userData);
    }
}

async function loadGlobalBattleData() {
    const snapshot = await db.ref('battles').once('value');
    if (snapshot.exists()) {
        return snapshot.val();
    }
    return {};
}

async function saveGlobalBattleData(battleKey, results) {
    await db.ref('battles/' + battleKey).set(results);
}

function updateAdminUI() {
    const adminLink = document.getElementById('adminLink');
    const supportLink = document.getElementById('supportLink');
    
    if (adminLink) {
        adminLink.style.display = isAdmin ? 'block' : 'none';
    }
    
    if (supportLink) {
        supportLink.style.display = 'block';
    }
}

// Server API functions
const API_BASE_URL = 'https://whos-better.onrender.com';

async function getAuthToken() {
    if (!currentUser) return null;
    return await currentUser.getIdToken();
}

async function verifyUserStatus() {
    try {
        const token = await getAuthToken();
        if (!token) return false;
        
        const response = await fetch(`${API_BASE_URL}/api/verify-status`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error verifying user status:', error);
        return null;
    }
}

async function verifyAdminStatus() {
    try {
        const token = await getAuthToken();
        if (!token) return false;
        
        const response = await fetch(`${API_BASE_URL}/api/verify-admin`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        if (!response.ok) return false;
        
        const data = await response.json();
        return data.isAdmin;
    } catch (error) {
        console.error('Error verifying admin status:', error);
        return false;
    }
}

async function serverBanUser(uid) {
    try {
        const token = await getAuthToken();
        const response = await fetch(`${API_BASE_URL}/api/admin/users/${uid}/status`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: 'banned' })
        });
        
        return await response.json();
    } catch (error) {
        console.error('Error banning user:', error);
        throw error;
    }
}

async function serverSuspendUser(uid) {
    try {
        const token = await getAuthToken();
        const response = await fetch(`${API_BASE_URL}/api/admin/users/${uid}/status`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: 'suspended' })
        });
        
        return await response.json();
    } catch (error) {
        console.error('Error suspending user:', error);
        throw error;
    }
}

async function serverActivateUser(uid) {
    try {
        const token = await getAuthToken();
        const response = await fetch(`${API_BASE_URL}/api/admin/users/${uid}/status`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: 'active' })
        });
        
        return await response.json();
    } catch (error) {
        console.error('Error activating user:', error);
        throw error;
    }
}

async function serverChangeUserRole(uid, role) {
    try {
        const token = await getAuthToken();
        const response = await fetch(`${API_BASE_URL}/api/admin/users/${uid}/role`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ role: role })
        });
        
        return await response.json();
    } catch (error) {
        console.error('Error changing user role:', error);
        throw error;
    }
}

async function serverCreateTicket(type, subject, message) {
    try {
        const token = await getAuthToken();
        const response = await fetch(`${API_BASE_URL}/api/tickets`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ type, subject, message })
        });
        
        return await response.json();
    } catch (error) {
        console.error('Error creating ticket:', error);
        throw error;
    }
}

async function serverGetTickets() {
    try {
        const token = await getAuthToken();
        const response = await fetch(`${API_BASE_URL}/api/tickets`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        return await response.json();
    } catch (error) {
        console.error('Error fetching tickets:', error);
        throw error;
    }
}

async function serverGetAllTickets() {
    try {
        const token = await getAuthToken();
        const response = await fetch(`${API_BASE_URL}/api/admin/tickets`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        return await response.json();
    } catch (error) {
        console.error('Error fetching all tickets:', error);
        throw error;
    }
}

async function serverGetTicket(ticketId) {
    try {
        const token = await getAuthToken();
        const response = await fetch(`${API_BASE_URL}/api/tickets/${ticketId}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        return await response.json();
    } catch (error) {
        console.error('Error fetching ticket:', error);
        throw error;
    }
}

async function serverSendMessage(ticketId, message) {
    try {
        const token = await getAuthToken();
        const response = await fetch(`${API_BASE_URL}/api/tickets/${ticketId}/messages`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message })
        });
        
        return await response.json();
    } catch (error) {
        console.error('Error sending message:', error);
        throw error;
    }
}

async function serverCloseTicket(ticketId) {
    try {
        const token = await getAuthToken();
        const response = await fetch(`${API_BASE_URL}/api/admin/tickets/${ticketId}/close`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        
        return await response.json();
    } catch (error) {
        console.error('Error closing ticket:', error);
        throw error;
    }
}
