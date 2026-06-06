async function loadLeaderboard() {
    const container = document.getElementById('leaderboardContainer');
    
    try {
        const snapshot = await db.ref('users').once('value');
        const users = snapshot.val();
        
        if (!users) {
            container.innerHTML = `
                <div class="no-data">
                    <div style="font-size: 4rem; margin-bottom: 1rem;">🏆</div>
                    <div style="font-size: 1.5rem; margin-bottom: 0.5rem;">No users yet</div>
                    <div>Be the first to join the leaderboard!</div>
                </div>
            `;
            return;
        }
        
        const leaderboard = Object.entries(users)
            .map(([uid, data]) => ({
                uid,
                ...data
            }))
            .sort((a, b) => b.xp - a.xp)
            .slice(0, 100);
        
        container.innerHTML = `
            <div class="leaderboard-table">
                <table>
                    <thead>
                        <tr>
                            <th>Rank</th>
                            <th>User</th>
                            <th>Level</th>
                            <th>XP</th>
                            <th>Total Votes</th>
                            <th>Streak</th>
                            <th>Achievements</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${leaderboard.map((user, index) => `
                            <tr class="${currentUser && user.uid === currentUser.uid ? 'current-user' : ''}">
                                <td>
                                    <span class="rank-badge ${index < 3 ? 'top-' + (index + 1) : ''}">
                                        ${index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '#' + (index + 1)}
                                    </span>
                                </td>
                                <td>
                                    <div class="user-cell">
                                        <div class="user-avatar">${user.username.charAt(0).toUpperCase()}</div>
                                        <div class="user-name">${user.username}</div>
                                    </div>
                                </td>
                                <td>${user.level}</td>
                                <td>${user.xp}</td>
                                <td>${user.totalVotes}</td>
                                <td>
                                    <span class="streak-badge">🔥 ${user.streak}</span>
                                </td>
                                <td>
                                    <div class="achievements-count">
                                        ${user.achievements ? user.achievements.length : 0}
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    } catch (error) {
        console.error('Error loading leaderboard:', error);
        container.innerHTML = `
            <div class="error-message">
                Failed to load leaderboard. Please try again later.
            </div>
        `;
    }
}

loadLeaderboard();
