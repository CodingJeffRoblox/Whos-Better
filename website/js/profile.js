// Profile page JavaScript

function updateProfileUI() {
    if (!currentUser || !userData) {
        window.location.href = 'login.html';
        return;
    }

    // Update profile header
    document.getElementById('profileUsername').textContent = userData.username;
    document.getElementById('profileEmail').textContent = userData.email;
    document.getElementById('profileAvatar').textContent = userData.username.charAt(0).toUpperCase();
    document.getElementById('profileStatus').textContent = userData.status || 'active';
    document.getElementById('profileRole').textContent = userData.role || 'user';

    // Update stats
    document.getElementById('profileXP').textContent = userData.xp || 0;
    document.getElementById('profileLevel').textContent = userData.level || 1;
    document.getElementById('profileVotes').textContent = userData.totalVotes || 0;
    document.getElementById('profileStreak').textContent = userData.streak || 0;

    // Update category stats
    const categoryVotes = userData.categoryVotes || {};
    document.getElementById('gamingVotes').textContent = categoryVotes.gaming || 0;
    document.getElementById('moviesVotes').textContent = categoryVotes.movies || 0;
    document.getElementById('foodVotes').textContent = categoryVotes.food || 0;
    document.getElementById('carsVotes').textContent = categoryVotes.cars || 0;
    document.getElementById('technologyVotes').textContent = categoryVotes.technology || 0;
    document.getElementById('sportsVotes').textContent = categoryVotes.sports || 0;
    document.getElementById('musicVotes').textContent = categoryVotes.music || 0;
    document.getElementById('randomVotes').textContent = categoryVotes.random || 0;

    // Update achievements
    updateAchievements();

    // Update account settings
    if (userData.createdAt) {
        const createdDate = new Date(userData.createdAt);
        document.getElementById('accountCreated').textContent = createdDate.toLocaleDateString();
    }
    if (userData.lastVisit) {
        const lastVisitDate = new Date(userData.lastVisit);
        document.getElementById('lastVisit').textContent = lastVisitDate.toLocaleDateString();
    }
}

function updateAchievements() {
    const achievements = userData.achievements || [];
    const achievementBadges = document.querySelectorAll('.achievement-badge');

    achievementBadges.forEach(badge => {
        const achievementId = badge.getAttribute('data-achievement');
        if (achievements.includes(achievementId)) {
            badge.classList.remove('locked');
            badge.classList.add('unlocked');
        }
    });
}

// Initialize profile page
auth.onAuthStateChanged((user) => {
    if (user) {
        updateProfileUI();
    } else {
        window.location.href = 'login.html';
    }
});
