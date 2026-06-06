const battles = [
    { left: "Minecraft", right: "Roblox", category: "Gaming", leftColor: "#3b82f6", rightColor: "#ef4444" },
    { left: "Fortnite", right: "Apex Legends", category: "Gaming", leftColor: "#22c55e", rightColor: "#f97316" },
    { left: "Call of Duty", right: "Battlefield", category: "Gaming", leftColor: "#6366f1", rightColor: "#8b5cf6" },
    { left: "League of Legends", right: "Dota 2", category: "Gaming", leftColor: "#ec4899", rightColor: "#14b8a6" },
    { left: "PlayStation", right: "Xbox", category: "Gaming", leftColor: "#3b82f6", rightColor: "#22c55e" },
    { left: "Nintendo", right: "Sega", category: "Gaming", leftColor: "#ef4444", rightColor: "#3b82f6" },
    { left: "PC Gaming", right: "Console Gaming", category: "Gaming", leftColor: "#8b5cf6", rightColor: "#f97316" },
    { left: "Mobile Games", right: "PC Games", category: "Gaming", leftColor: "#22c55e", rightColor: "#6366f1" },
    { left: "Among Us", right: "Fall Guys", category: "Gaming", leftColor: "#ef4444", rightColor: "#fbbf24" },
    { left: "Valorant", right: "CS:GO", category: "Gaming", leftColor: "#f97316", rightColor: "#fbbf24" },
    { left: "The Avengers", right: "Justice League", category: "Movies", leftColor: "#ef4444", rightColor: "#3b82f6" },
    { left: "Star Wars", right: "Star Trek", category: "Movies", leftColor: "#fbbf24", rightColor: "#3b82f6" },
    { left: "Marvel", right: "DC", category: "Movies", leftColor: "#ef4444", rightColor: "#3b82f6" },
    { left: "Harry Potter", right: "Lord of the Rings", category: "Movies", leftColor: "#8b5cf6", rightColor: "#f97316" },
    { left: "Disney", right: "Pixar", category: "Movies", leftColor: "#3b82f6", rightColor: "#ec4899" },
    { left: "Horror Movies", right: "Comedy Movies", category: "Movies", leftColor: "#6366f1", rightColor: "#fbbf24" },
    { left: "Action Movies", right: "Romance Movies", category: "Movies", leftColor: "#ef4444", rightColor: "#ec4899" },
    { left: "Netflix", right: "HBO Max", category: "Movies", leftColor: "#ef4444", rightColor: "#8b5cf6" },
    { left: "Cinema", right: "Streaming", category: "Movies", leftColor: "#fbbf24", rightColor: "#22c55e" },
    { left: "Pizza", right: "Burger", category: "Food", leftColor: "#f97316", rightColor: "#ef4444" },
    { left: "Tacos", right: "Burritos", category: "Food", leftColor: "#fbbf24", rightColor: "#8b5cf6" },
    { left: "Sushi", right: "Ramen", category: "Food", leftColor: "#ef4444", rightColor: "#f97316" },
    { left: "Ice Cream", right: "Cake", category: "Food", leftColor: "#ec4899", rightColor: "#fbbf24" },
    { left: "Coffee", right: "Tea", category: "Food", leftColor: "#8b5cf6", rightColor: "#22c55e" },
    { left: "Chocolate", right: "Vanilla", category: "Food", leftColor: "#8b5cf6", rightColor: "#fbbf24" },
    { left: "Spicy Food", right: "Sweet Food", category: "Food", leftColor: "#ef4444", rightColor: "#ec4899" },
    { left: "Fast Food", right: "Home Cooked", category: "Food", leftColor: "#f97316", rightColor: "#22c55e" },
    { left: "Mexican Food", right: "Italian Food", category: "Food", leftColor: "#ef4444", rightColor: "#22c55e" },
    { left: "Chinese Food", right: "Indian Food", category: "Food", leftColor: "#fbbf24", rightColor: "#f97316" },
    { left: "Tesla", right: "BMW", category: "Cars", leftColor: "#ef4444", rightColor: "#3b82f6" },
    { left: "Ferrari", right: "Lamborghini", category: "Cars", leftColor: "#f97316", rightColor: "#fbbf24" },
    { left: "Ford", right: "Chevrolet", category: "Cars", leftColor: "#3b82f6", rightColor: "#ef4444" },
    { left: "Toyota", right: "Honda", category: "Cars", leftColor: "#22c55e", rightColor: "#6366f1" },
    { left: "SUV", right: "Sedan", category: "Cars", leftColor: "#8b5cf6", rightColor: "#3b82f6" },
    { left: "Electric Cars", right: "Gas Cars", category: "Cars", leftColor: "#22c55e", rightColor: "#f97316" },
    { left: "Sports Car", right: "Luxury Car", category: "Cars", leftColor: "#ef4444", rightColor: "#8b5cf6" },
    { left: "Mercedes", right: "Audi", category: "Cars", leftColor: "#3b82f6", rightColor: "#6366f1" },
    { left: "iPhone", right: "Android", category: "Technology", leftColor: "#8b5cf6", rightColor: "#22c55e" },
    { left: "Mac", right: "PC", category: "Technology", leftColor: "#8b5cf6", rightColor: "#3b82f6" },
    { left: "Google", right: "Microsoft", category: "Technology", leftColor: "#3b82f6", rightColor: "#ef4444" },
    { left: "Apple", right: "Samsung", category: "Technology", leftColor: "#8b5cf6", rightColor: "#3b82f6" },
    { left: "Laptop", right: "Desktop", category: "Technology", leftColor: "#6366f1", rightColor: "#22c55e" },
    { left: "iOS", right: "Android", category: "Technology", leftColor: "#8b5cf6", rightColor: "#22c55e" },
    { left: "Chrome", right: "Safari", category: "Technology", leftColor: "#3b82f6", rightColor: "#22c55e" },
    { left: "Twitter", right: "Instagram", category: "Technology", leftColor: "#3b82f6", rightColor: "#ec4899" },
    { left: "Soccer", right: "Basketball", category: "Sports", leftColor: "#22c55e", rightColor: "#f97316" },
    { left: "Football", right: "Baseball", category: "Sports", leftColor: "#ef4444", rightColor: "#3b82f6" },
    { left: "Tennis", right: "Golf", category: "Sports", leftColor: "#fbbf24", rightColor: "#22c55e" },
    { left: "Swimming", right: "Running", category: "Sports", leftColor: "#3b82f6", rightColor: "#f97316" },
    { left: "Yoga", right: "Gym", category: "Sports", leftColor: "#8b5cf6", rightColor: "#ef4444" },
    { left: "Team Sports", right: "Individual Sports", category: "Sports", leftColor: "#22c55e", rightColor: "#6366f1" },
    { left: "Pop Music", right: "Rock Music", category: "Music", leftColor: "#ec4899", rightColor: "#ef4444" },
    { left: "Hip Hop", right: "R&B", category: "Music", leftColor: "#fbbf24", rightColor: "#8b5cf6" },
    { left: "Spotify", right: "Apple Music", category: "Music", leftColor: "#22c55e", rightColor: "#ef4444" },
    { left: "Live Concert", right: "Studio Album", category: "Music", leftColor: "#f97316", rightColor: "#3b82f6" },
    { left: "Guitar", right: "Piano", category: "Music", leftColor: "#fbbf24", rightColor: "#6366f1" },
    { left: "Cats", right: "Dogs", category: "Random", leftColor: "#fbbf24", rightColor: "#8b5cf6" },
    { left: "Summer", right: "Winter", category: "Random", leftColor: "#f97316", rightColor: "#3b82f6" },
    { left: "Beach", right: "Mountains", category: "Random", leftColor: "#fbbf24", rightColor: "#22c55e" },
    { left: "Morning", right: "Night", category: "Random", leftColor: "#fbbf24", rightColor: "#6366f1" },
    { left: "Coffee", right: "Energy Drink", category: "Random", leftColor: "#8b5cf6", rightColor: "#ef4444" }
];

let userData = {
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
    battleResults: {}
};

let currentSort = 'rank';
let currentFilter = 'all';
let searchTerm = '';

function initializeData() {
    const stored = localStorage.getItem('whosBetterData');
    if (stored) {
        userData = JSON.parse(stored);
    }
    
    updateUI();
    renderRankings();
}

function updateUI() {
    document.getElementById('userLevel').textContent = userData.level;
    document.getElementById('userXP').textContent = userData.xp;
    document.getElementById('userStreak').textContent = userData.streak;
}

function getItemStats() {
    const itemStats = {};
    
    battles.forEach(battle => {
        const battleKey = `${battle.left}-vs-${battle.right}`;
        const results = userData.battleResults[battleKey] || { left: 0, right: 0 };
        
        if (!itemStats[battle.left]) {
            itemStats[battle.left] = {
                name: battle.left,
                category: battle.category,
                color: battle.leftColor,
                wins: 0,
                losses: 0,
                total: 0
            };
        }
        
        if (!itemStats[battle.right]) {
            itemStats[battle.right] = {
                name: battle.right,
                category: battle.category,
                color: battle.rightColor,
                wins: 0,
                losses: 0,
                total: 0
            };
        }
        
        itemStats[battle.left].wins += results.left;
        itemStats[battle.left].losses += results.right;
        itemStats[battle.left].total += results.left + results.right;
        
        itemStats[battle.right].wins += results.right;
        itemStats[battle.right].losses += results.left;
        itemStats[battle.right].total += results.left + results.right;
    });
    
    return Object.values(itemStats).map(item => ({
        ...item,
        winRate: item.total > 0 ? Math.round((item.wins / item.total) * 100) : 50
    })).filter(item => item.total > 0);
}

function renderRankings() {
    const tbody = document.getElementById('rankingsBody');
    const items = getItemStats();
    
    let filteredItems = items;
    
    if (currentFilter !== 'all') {
        filteredItems = items.filter(item => item.category === currentFilter);
    }
    
    if (searchTerm) {
        filteredItems = filteredItems.filter(item => 
            item.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    
    filteredItems.sort((a, b) => {
        switch (currentSort) {
            case 'rank':
                return b.winRate - a.winRate;
            case 'name':
                return a.name.localeCompare(b.name);
            case 'winRate':
                return b.winRate - a.winRate;
            case 'wins':
                return b.wins - a.wins;
            case 'losses':
                return b.losses - a.losses;
            case 'category':
                return a.category.localeCompare(b.category);
            default:
                return 0;
        }
    });
    
    filteredItems.forEach((item, index) => {
        item.rank = index + 1;
    });
    
    tbody.innerHTML = filteredItems.map(item => `
        <tr>
            <td><span style="color: ${item.color}; font-weight: 700;">#${item.rank}</span></td>
            <td><span style="color: ${item.color}; font-weight: 600;">${item.name}</span></td>
            <td><span style="color: ${item.winRate >= 60 ? '#22c55e' : item.winRate <= 40 ? '#ef4444' : '#3b82f6'}; font-weight: 700;">${item.winRate}%</span></td>
            <td>${item.wins}</td>
            <td>${item.losses}</td>
            <td><span class="category-badge" style="background: ${item.color}; font-size: 0.75rem; padding: 0.25rem 0.75rem;">${item.category}</span></td>
        </tr>
    `).join('');
    
    if (filteredItems.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" style="text-align: center; padding: 2rem; color: rgba(255,255,255,0.5);">
                    No votes yet. Start voting on the homepage!
                </td>
            </tr>
        `;
    }
}

document.getElementById('searchBox').addEventListener('input', (e) => {
    searchTerm = e.target.value;
    renderRankings();
});

document.querySelectorAll('.filter-button').forEach(button => {
    button.addEventListener('click', () => {
        document.querySelectorAll('.filter-button').forEach(b => b.classList.remove('active'));
        button.classList.add('active');
        currentFilter = button.getAttribute('data-filter');
        renderRankings();
    });
});

document.querySelectorAll('th[data-sort]').forEach(th => {
    th.addEventListener('click', () => {
        currentSort = th.getAttribute('data-sort');
        renderRankings();
    });
});

initializeData();
