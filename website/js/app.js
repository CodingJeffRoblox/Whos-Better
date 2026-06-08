const battles = [
    { left: "Minecraft", right: "Roblox", category: "Gaming", leftColor: "#3b82f6", rightColor: "#ef4444", leftEmoji: "⛏️", rightEmoji: "🎮" },
    { left: "Fortnite", right: "Apex Legends", category: "Gaming", leftColor: "#22c55e", rightColor: "#f97316", leftEmoji: "🎯", rightEmoji: "🔫" },
    { left: "Call of Duty", right: "Battlefield", category: "Gaming", leftColor: "#6366f1", rightColor: "#8b5cf6", leftEmoji: "🎖️", rightEmoji: "💥" },
    { left: "League of Legends", right: "Dota 2", category: "Gaming", leftColor: "#ec4899", rightColor: "#14b8a6", leftEmoji: "🏆", rightEmoji: "⚔️" },
    { left: "PlayStation", right: "Xbox", category: "Gaming", leftColor: "#3b82f6", rightColor: "#22c55e", leftEmoji: "🎮", rightEmoji: "🎮" },
    { left: "Nintendo", right: "Sega", category: "Gaming", leftColor: "#ef4444", rightColor: "#3b82f6", leftEmoji: "🍄", rightEmoji: "🔵" },
    { left: "PC Gaming", right: "Console Gaming", category: "Gaming", leftColor: "#8b5cf6", rightColor: "#f97316", leftEmoji: "💻", rightEmoji: "🎮" },
    { left: "Mobile Games", right: "PC Games", category: "Gaming", leftColor: "#22c55e", rightColor: "#6366f1", leftEmoji: "📱", rightEmoji: "💻" },
    { left: "Among Us", right: "Fall Guys", category: "Gaming", leftColor: "#ef4444", rightColor: "#fbbf24", leftEmoji: "🔴", rightEmoji: "🟣" },
    { left: "Valorant", right: "CS:GO", category: "Gaming", leftColor: "#f97316", rightColor: "#fbbf24", leftEmoji: "🎯", rightEmoji: "💣" },
    { left: "The Avengers", right: "Justice League", category: "Movies", leftColor: "#ef4444", rightColor: "#3b82f6", leftEmoji: "🦸", rightEmoji: "⚡" },
    { left: "Star Wars", right: "Star Trek", category: "Movies", leftColor: "#fbbf24", rightColor: "#3b82f6", leftEmoji: "🚀", rightEmoji: "🖖" },
    { left: "Marvel", right: "DC", category: "Movies", leftColor: "#ef4444", rightColor: "#3b82f6", leftEmoji: "🦸", rightEmoji: "🦇" },
    { left: "Harry Potter", right: "Lord of the Rings", category: "Movies", leftColor: "#8b5cf6", rightColor: "#f97316", leftEmoji: "⚡", rightEmoji: "💍" },
    { left: "Disney", right: "Pixar", category: "Movies", leftColor: "#3b82f6", rightColor: "#ec4899", leftEmoji: "🏰", rightEmoji: "🎬" },
    { left: "Horror Movies", right: "Comedy Movies", category: "Movies", leftColor: "#6366f1", rightColor: "#fbbf24", leftEmoji: "👻", rightEmoji: "😂" },
    { left: "Action Movies", right: "Romance Movies", category: "Movies", leftColor: "#ef4444", rightColor: "#ec4899", leftEmoji: "💥", rightEmoji: "❤️" },
    { left: "Netflix", right: "HBO Max", category: "Movies", leftColor: "#ef4444", rightColor: "#8b5cf6", leftEmoji: "📺", rightEmoji: "🎬" },
    { left: "Cinema", right: "Streaming", category: "Movies", leftColor: "#fbbf24", rightColor: "#22c55e", leftEmoji: "🎬", rightEmoji: "📱" },
    { left: "Pizza", right: "Burger", category: "Food", leftColor: "#f97316", rightColor: "#ef4444", leftEmoji: "🍕", rightEmoji: "🍔" },
    { left: "Tacos", right: "Burritos", category: "Food", leftColor: "#fbbf24", rightColor: "#8b5cf6", leftEmoji: "🌮", rightEmoji: "🌯" },
    { left: "Sushi", right: "Ramen", category: "Food", leftColor: "#ef4444", rightColor: "#f97316", leftEmoji: "🍣", rightEmoji: "🍜" },
    { left: "Ice Cream", right: "Cake", category: "Food", leftColor: "#ec4899", rightColor: "#fbbf24", leftEmoji: "🍦", rightEmoji: "🎂" },
    { left: "Coffee", right: "Tea", category: "Food", leftColor: "#8b5cf6", rightColor: "#22c55e", leftEmoji: "☕", rightEmoji: "🍵" },
    { left: "Chocolate", right: "Vanilla", category: "Food", leftColor: "#8b5cf6", rightColor: "#fbbf24", leftEmoji: "🍫", rightEmoji: "🍦" },
    { left: "Spicy Food", right: "Sweet Food", category: "Food", leftColor: "#ef4444", rightColor: "#ec4899", leftEmoji: "🌶️", rightEmoji: "🍬" },
    { left: "Fast Food", right: "Home Cooked", category: "Food", leftColor: "#f97316", rightColor: "#22c55e", leftEmoji: "🍟", rightEmoji: "🍳" },
    { left: "Mexican Food", right: "Italian Food", category: "Food", leftColor: "#ef4444", rightColor: "#22c55e", leftEmoji: "🌮", rightEmoji: "🍝" },
    { left: "Chinese Food", right: "Indian Food", category: "Food", leftColor: "#fbbf24", rightColor: "#f97316", leftEmoji: "🥡", rightEmoji: "🍛" },
    { left: "Tesla", right: "BMW", category: "Cars", leftColor: "#ef4444", rightColor: "#3b82f6", leftEmoji: "⚡", rightEmoji: "🚗" },
    { left: "Ferrari", right: "Lamborghini", category: "Cars", leftColor: "#f97316", rightColor: "#fbbf24", leftEmoji: "🏎️", rightEmoji: "🚗" },
    { left: "Ford", right: "Chevrolet", category: "Cars", leftColor: "#3b82f6", rightColor: "#ef4444", leftEmoji: "🚙", rightEmoji: "🚗" },
    { left: "Toyota", right: "Honda", category: "Cars", leftColor: "#22c55e", rightColor: "#6366f1", leftEmoji: "🚗", rightEmoji: "🚗" },
    { left: "SUV", right: "Sedan", category: "Cars", leftColor: "#8b5cf6", rightColor: "#3b82f6", leftEmoji: "🚙", rightEmoji: "🚗" },
    { left: "Electric Cars", right: "Gas Cars", category: "Cars", leftColor: "#22c55e", rightColor: "#f97316", leftEmoji: "⚡", rightEmoji: "⛽" },
    { left: "Sports Car", right: "Luxury Car", category: "Cars", leftColor: "#ef4444", rightColor: "#8b5cf6", leftEmoji: "🏎️", rightEmoji: "🚗" },
    { left: "Mercedes", right: "Audi", category: "Cars", leftColor: "#3b82f6", rightColor: "#6366f1", leftEmoji: "🚗", rightEmoji: "🚗" },
    { left: "iPhone", right: "Android", category: "Technology", leftColor: "#8b5cf6", rightColor: "#22c55e", leftEmoji: "📱", rightEmoji: "🤖" },
    { left: "Mac", right: "PC", category: "Technology", leftColor: "#8b5cf6", rightColor: "#3b82f6", leftEmoji: "💻", rightEmoji: "🖥️" },
    { left: "Google", right: "Microsoft", category: "Technology", leftColor: "#3b82f6", rightColor: "#ef4444", leftEmoji: "🔍", rightEmoji: "💻" },
    { left: "Apple", right: "Samsung", category: "Technology", leftColor: "#8b5cf6", rightColor: "#3b82f6", leftEmoji: "🍎", rightEmoji: "📱" },
    { left: "Laptop", right: "Desktop", category: "Technology", leftColor: "#6366f1", rightColor: "#22c55e", leftEmoji: "💻", rightEmoji: "🖥️" },
    { left: "iOS", right: "Android", category: "Technology", leftColor: "#8b5cf6", rightColor: "#22c55e", leftEmoji: "🍎", rightEmoji: "🤖" },
    { left: "Chrome", right: "Safari", category: "Technology", leftColor: "#3b82f6", rightColor: "#22c55e", leftEmoji: "🌐", rightEmoji: "🧭" },
    { left: "Twitter", right: "Instagram", category: "Technology", leftColor: "#3b82f6", rightColor: "#ec4899", leftEmoji: "🐦", rightEmoji: "📷" },
    { left: "Soccer", right: "Basketball", category: "Sports", leftColor: "#22c55e", rightColor: "#f97316", leftEmoji: "⚽", rightEmoji: "🏀" },
    { left: "Football", right: "Baseball", category: "Sports", leftColor: "#ef4444", rightColor: "#3b82f6", leftEmoji: "🏈", rightEmoji: "⚾" },
    { left: "Tennis", right: "Golf", category: "Sports", leftColor: "#fbbf24", rightColor: "#22c55e", leftEmoji: "🎾", rightEmoji: "⛳" },
    { left: "Swimming", right: "Running", category: "Sports", leftColor: "#3b82f6", rightColor: "#f97316", leftEmoji: "🏊", rightEmoji: "🏃" },
    { left: "Yoga", right: "Gym", category: "Sports", leftColor: "#8b5cf6", rightColor: "#ef4444", leftEmoji: "🧘", rightEmoji: "🏋️" },
    { left: "Team Sports", right: "Individual Sports", category: "Sports", leftColor: "#22c55e", rightColor: "#6366f1", leftEmoji: "👥", rightEmoji: "🏃" },
    { left: "Pop Music", right: "Rock Music", category: "Music", leftColor: "#ec4899", rightColor: "#ef4444", leftEmoji: "🎤", rightEmoji: "🎸" },
    { left: "Hip Hop", right: "R&B", category: "Music", leftColor: "#fbbf24", rightColor: "#8b5cf6", leftEmoji: "🎧", rightEmoji: "🎵" },
    { left: "Spotify", right: "Apple Music", category: "Music", leftColor: "#22c55e", rightColor: "#ef4444", leftEmoji: "🎵", rightEmoji: "🍎" },
    { left: "Live Concert", right: "Studio Album", category: "Music", leftColor: "#f97316", rightColor: "#3b82f6", leftEmoji: "🎤", rightEmoji: "💿" },
    { left: "Guitar", right: "Piano", category: "Music", leftColor: "#fbbf24", rightColor: "#6366f1", leftEmoji: "🎸", rightEmoji: "🎹" },
    { left: "Cats", right: "Dogs", category: "Random", leftColor: "#fbbf24", rightColor: "#8b5cf6", leftEmoji: "🐱", rightEmoji: "🐕" },
    { left: "Summer", right: "Winter", category: "Random", leftColor: "#f97316", rightColor: "#3b82f6", leftEmoji: "☀️", rightEmoji: "❄️" },
    { left: "Beach", right: "Mountains", category: "Random", leftColor: "#fbbf24", rightColor: "#22c55e", leftEmoji: "🏖️", rightEmoji: "⛰️" },
    { left: "Morning", right: "Night", category: "Random", leftColor: "#fbbf24", rightColor: "#6366f1", leftEmoji: "🌅", rightEmoji: "🌙" },
    { left: "Coffee", right: "Energy Drink", category: "Random", leftColor: "#8b5cf6", rightColor: "#ef4444", leftEmoji: "☕", rightEmoji: "🥤" }
];

let currentBattleIndex = 0;
let isVoting = false;
let globalBattleData = {};
let usedBattles = new Set();

async function initializeData() {
    globalBattleData = await loadGlobalBattleData();
    
    if (!currentUser) {
        document.getElementById('battleCard').style.pointerEvents = 'none';
        document.getElementById('battleCard').style.opacity = '0.5';
        return;
    }
    
    checkStreak();
    updateUI();
    loadBattle();
}

async function checkStreak() {
    if (!userData) return;
    
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    
    if (userData.lastVisit === today) {
        return;
    }
    
    if (userData.lastVisit === yesterday) {
        userData.streak++;
    } else if (userData.lastVisit !== today) {
        userData.streak = 1;
    }
    
    userData.lastVisit = today;
    await saveUserData();
}

function updateUI() {
    if (!userData) return;
    
    document.getElementById('userLevel').textContent = userData.level;
    document.getElementById('userXP').textContent = userData.xp;
    document.getElementById('userStreak').textContent = userData.streak;
    document.getElementById('yourVotes').textContent = userData.totalVotes;
    
    updateAchievements();
}

function updateAchievements() {
    if (!userData || !userData.achievements) return;
    
    const achievements = document.querySelectorAll('.achievement-badge');
    
    achievements.forEach(badge => {
        const achievementId = badge.getAttribute('data-achievement');
        if (userData.achievements.includes(achievementId)) {
            badge.classList.remove('locked');
            badge.classList.add('unlocked');
        }
    });
}

function loadBattle() {
    // Randomize battle selection
    let battleIndex;
    let attempts = 0;
    const maxAttempts = battles.length * 2;
    
    do {
        battleIndex = Math.floor(Math.random() * battles.length);
        attempts++;
        
        // If we've used all battles, reset
        if (usedBattles.size >= battles.length) {
            usedBattles.clear();
        }
    } while (usedBattles.has(battleIndex) && attempts < maxAttempts);
    
    usedBattles.add(battleIndex);
    currentBattleIndex = battleIndex;
    
    const battle = battles[currentBattleIndex];
    
    document.getElementById('leftName').textContent = battle.left;
    document.getElementById('rightName').textContent = battle.right;
    document.getElementById('categoryBadge').textContent = battle.category;
    
    const leftImg = document.getElementById('leftImage');
    const rightImg = document.getElementById('rightImage');
    
    leftImg.src = `https://placehold.co/200x200/${battle.leftColor.replace('#', '')}/ffffff?text=${encodeURIComponent(battle.leftEmoji)}`;
    rightImg.src = `https://placehold.co/200x200/${battle.rightColor.replace('#', '')}/ffffff?text=${encodeURIComponent(battle.rightEmoji)}`;
    
    document.getElementById('leftPercentage').classList.remove('show');
    document.getElementById('rightPercentage').classList.remove('show');
    document.getElementById('leftOption').classList.remove('voted');
    document.getElementById('rightOption').classList.remove('voted');
    
    updateBattleStats();
}

function updateBattleStats() {
    const battle = battles[currentBattleIndex];
    const battleKey = `${battle.left}-vs-${battle.right}`;
    const globalResults = globalBattleData[battleKey] || { left: 0, right: 0 };
    const total = globalResults.left + globalResults.right;
    
    document.getElementById('totalVotes').textContent = total;
}

async function vote(side) {
    if (isVoting) {
        console.log('Already voting');
        return;
    }
    
    if (!currentUser) {
        console.log('User not logged in');
        alert('Please log in to vote');
        window.location.href = 'login.html';
        return;
    }
    
    if (!userData) {
        console.log('User data not loaded');
        return;
    }
    
    isVoting = true;
    
    try {
        const battle = battles[currentBattleIndex];
        const battleKey = `${battle.left}-vs-${battle.right}`;
        
        // Initialize battleResults if it doesn't exist
        if (!userData.battleResults) {
            userData.battleResults = {};
        }
        
        // Update user data
        if (!userData.battleResults[battleKey]) {
            userData.battleResults[battleKey] = { left: 0, right: 0 };
        }
        
        userData.battleResults[battleKey][side]++;
        userData.totalVotes++;
        userData.xp++;
        userData.level = Math.floor(userData.xp / 100) + 1;
        
        const categoryLower = battle.category.toLowerCase();
        if (userData.categoryVotes[categoryLower] !== undefined) {
            userData.categoryVotes[categoryLower]++;
        }
        
        // Update global battle data
        if (!globalBattleData[battleKey]) {
            globalBattleData[battleKey] = { left: 0, right: 0 };
        }
        globalBattleData[battleKey][side]++;
        
        // Save to Firebase
        await saveUserData();
        await saveGlobalBattleData(battleKey, globalBattleData[battleKey]);
        
        showXPPopup();
        await checkAchievements(battle.category);
        
        const totalVotes = globalBattleData[battleKey].left + globalBattleData[battleKey].right;
        const leftPercent = totalVotes > 0 ? Math.round((globalBattleData[battleKey].left / totalVotes) * 100) : 50;
        const rightPercent = totalVotes > 0 ? 100 - leftPercent : 50;
        
        document.getElementById('leftPercentage').textContent = `${leftPercent}%`;
        document.getElementById('rightPercentage').textContent = `${rightPercent}%`;
        document.getElementById('leftPercentage').classList.add('show');
        document.getElementById('rightPercentage').classList.add('show');
        
        if (side === 'left') {
            document.getElementById('leftOption').classList.add('voted');
        } else {
            document.getElementById('rightOption').classList.add('voted');
        }
        
        updateUI();
        updateBattleStats();
        
        setTimeout(() => {
            currentBattleIndex = (currentBattleIndex + 1) % battles.length;
            loadBattle();
            isVoting = false;
        }, 2000);
    } catch (error) {
        console.error('Error voting:', error);
        isVoting = false;
        alert('Failed to vote. Please try again.');
    }
}

function showXPPopup() {
    const popup = document.getElementById('xpPopup');
    popup.style.animation = 'none';
    popup.offsetHeight;
    popup.style.animation = 'xpPopup 1s ease forwards';
}

async function checkAchievements(category) {
    if (!userData.achievements) {
        userData.achievements = [];
    }
    
    const newAchievements = [];
    
    if (userData.totalVotes === 1 && !userData.achievements.includes('first-vote')) {
        newAchievements.push('first-vote');
    }
    
    if (userData.totalVotes === 10 && !userData.achievements.includes('10-votes')) {
        newAchievements.push('10-votes');
    }
    
    if (userData.totalVotes === 100 && !userData.achievements.includes('100-votes')) {
        newAchievements.push('100-votes');
    }
    
    if (userData.totalVotes === 500 && !userData.achievements.includes('500-votes')) {
        newAchievements.push('500-votes');
    }
    
    if (userData.totalVotes === 1000 && !userData.achievements.includes('1000-votes')) {
        newAchievements.push('1000-votes');
    }
    
    if (category === 'Gaming' && userData.categoryVotes.gaming >= 50 && !userData.achievements.includes('gaming-expert')) {
        newAchievements.push('gaming-expert');
    }
    
    if (category === 'Food' && userData.categoryVotes.food >= 50 && !userData.achievements.includes('food-expert')) {
        newAchievements.push('food-expert');
    }
    
    if (category === 'Movies' && userData.categoryVotes.movies >= 50 && !userData.achievements.includes('movie-expert')) {
        newAchievements.push('movie-expert');
    }
    
    newAchievements.forEach(achievement => {
        userData.achievements.push(achievement);
        showAchievementPopup(achievement);
    });
    
    if (newAchievements.length > 0) {
        await saveUserData();
        updateAchievements();
    }
}

function showAchievementPopup(achievementId) {
    const popup = document.getElementById('achievementPopup');
    const achievementName = document.querySelector(`[data-achievement="${achievementId}"] .badge-name`).textContent;
    
    document.getElementById('achievementName').textContent = achievementName;
    popup.style.animation = 'none';
    popup.offsetHeight;
    popup.style.animation = 'achievementPopup 2s ease forwards';
}

document.addEventListener('DOMContentLoaded', () => {
    // Wait for Firebase to be initialized
    setTimeout(() => {
        if (typeof auth === 'undefined' || typeof db === 'undefined') {
            console.error('Firebase not initialized');
            return;
        }
        
        const leftVoteBtn = document.getElementById('leftVote');
        const rightVoteBtn = document.getElementById('rightVote');
        
        if (leftVoteBtn) {
            leftVoteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                vote('left');
            });
        }
        
        if (rightVoteBtn) {
            rightVoteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                vote('right');
            });
        }
        
        const submitBattleBtn = document.getElementById('submitBattleBtn');
        if (submitBattleBtn) {
            submitBattleBtn.addEventListener('click', submitBattle);
        }

        const leftOption = document.getElementById('leftOption');
        if (leftOption) {
            leftOption.addEventListener('click', () => {
                if (!isVoting) vote('left');
            });
        }

        const rightOption = document.getElementById('rightOption');
        if (rightOption) {
            rightOption.addEventListener('click', () => {
                if (!isVoting) vote('right');
            });
        }

        initializeData();
    }, 100);
});

async function submitBattle() {
    if (!currentUser) {
        alert('Please log in to submit battles');
        window.location.href = 'login.html';
        return;
    }

    const leftItem = document.getElementById('leftItem').value.trim();
    const rightItem = document.getElementById('rightItem').value.trim();
    const category = document.getElementById('category').value;
    const formMessage = document.getElementById('formMessage');

    // Validation
    if (!leftItem || !rightItem || !category) {
        formMessage.textContent = 'Please fill in all fields';
        formMessage.className = 'form-message error';
        return;
    }

    if (leftItem.toLowerCase() === rightItem.toLowerCase()) {
        formMessage.textContent = 'Left and right items cannot be the same';
        formMessage.className = 'form-message error';
        return;
    }

    // Content filtering - check for inappropriate content
    const inappropriateWords = ['porn', 'sex', 'nude', 'naked', 'xxx', 'drugs', 'illegal', 'murder', 'kill', 'terrorism', 'bomb', 'weapon'];
    const combinedText = (leftItem + ' ' + rightItem).toLowerCase();
    
    for (const word of inappropriateWords) {
        if (combinedText.includes(word)) {
            formMessage.textContent = 'This content is not allowed. Please submit appropriate content only.';
            formMessage.className = 'form-message error';
            return;
        }
    }

    try {
        const token = await currentUser.getIdToken();
        
        const response = await fetch(`${API_BASE_URL}/api/submit-battle`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                left: leftItem,
                right: rightItem,
                category: category
            })
        });

        const data = await response.json();

        if (response.ok) {
            formMessage.textContent = data.message;
            formMessage.className = 'form-message success';
            
            // Clear form
            document.getElementById('leftItem').value = '';
            document.getElementById('rightItem').value = '';
            document.getElementById('category').value = '';
            
            // Add new battle to local battles array
            const colors = ['#3b82f6', '#ef4444', '#22c55e', '#f97316', '#8b5cf6', '#ec4899', '#fbbf24', '#14b8a6'];
            const emojis = ['⭐', '🎯', '🔥', '💎', '🏆', '⚡', '🎮', '🎬'];
            
            battles.push({
                left: leftItem,
                right: rightItem,
                category: category,
                leftColor: colors[Math.floor(Math.random() * colors.length)],
                rightColor: colors[Math.floor(Math.random() * colors.length)],
                leftEmoji: emojis[Math.floor(Math.random() * emojis.length)],
                rightEmoji: emojis[Math.floor(Math.random() * emojis.length)]
            });
        } else {
            formMessage.textContent = data.error || 'Failed to submit battle';
            formMessage.className = 'form-message error';
        }
    } catch (error) {
        console.error('Error submitting battle:', error);
        formMessage.textContent = 'Failed to submit battle. Please try again.';
        formMessage.className = 'form-message error';
    }
}
