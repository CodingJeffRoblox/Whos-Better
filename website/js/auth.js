// Firebase config is already loaded from firebase-config.js
const auth = firebase.auth();
const db = firebase.database();

let currentUser = null;

auth.onAuthStateChanged((user) => {
    currentUser = user;
    if (user && window.location.pathname.includes('login.html')) {
        window.location.href = 'index.html';
    }
});

function showError(message) {
    const popup = document.getElementById('errorPopup');
    if (!popup) return;
    popup.textContent = message;
    popup.style.display = 'block';
    popup.style.animation = 'fadeInUp 0.3s ease';
    
    setTimeout(() => {
        popup.style.display = 'none';
    }, 3000);
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('loginForm')) {
        document.getElementById('loginForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            try {
                await auth.signInWithEmailAndPassword(email, password);
                window.location.href = 'index.html';
            } catch (error) {
                showError(error.message);
            }
        });
        
        const googleLoginBtn = document.getElementById('googleLogin');
        if (googleLoginBtn) {
            googleLoginBtn.addEventListener('click', async () => {
                try {
                    const provider = new firebase.auth.GoogleAuthProvider();
                    await auth.signInWithPopup(provider);
                    window.location.href = 'index.html';
                } catch (error) {
                    showError(error.message);
                }
            });
        }
    }

    if (document.getElementById('signupForm')) {
        document.getElementById('signupForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            const confirmPassword = document.getElementById('confirmPassword').value;
            
            if (password !== confirmPassword) {
                showError('Passwords do not match');
                return;
            }
            
            if (password.length < 6) {
                showError('Password must be at least 6 characters');
                return;
            }
            
            try {
                const userCredential = await auth.createUserWithEmailAndPassword(email, password);
                
                await db.ref('users/' + userCredential.user.uid).set({
                    username: username,
                    email: email,
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
                    createdAt: firebase.database.ServerValue.TIMESTAMP
                });
                
                window.location.href = 'index.html';
            } catch (error) {
                showError(error.message);
            }
        });
        
        const googleSignupBtn = document.getElementById('googleSignup');
        if (googleSignupBtn) {
            googleSignupBtn.addEventListener('click', async () => {
                try {
                    const provider = new firebase.auth.GoogleAuthProvider();
                    const result = await auth.signInWithPopup(provider);
                    
                    const userRef = db.ref('users/' + result.user.uid);
                    const snapshot = await userRef.once('value');
                    
                    if (!snapshot.exists()) {
                        await userRef.set({
                            username: result.user.displayName || 'User',
                            email: result.user.email,
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
                            createdAt: firebase.database.ServerValue.TIMESTAMP
                        });
                    }
                    
                    window.location.href = 'index.html';
                } catch (error) {
                    showError(error.message);
                }
            });
        }
    }
});
