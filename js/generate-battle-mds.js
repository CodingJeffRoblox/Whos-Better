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

const fs = require('fs');
const path = require('path');

const battlesDir = path.join(__dirname, 'battles-md');

if (!fs.existsSync(battlesDir)) {
    fs.mkdirSync(battlesDir);
}

battles.forEach((battle, index) => {
    const battleKey = `${battle.left.toLowerCase().replace(/\s+/g, '-')}-vs-${battle.right.toLowerCase().replace(/\s+/g, '-')}`;
    const fileName = `${battleKey}.md`;
    const filePath = path.join(battlesDir, fileName);
    
    const content = `# ${battle.left} vs ${battle.right}

## Category
${battle.category}

## Battle Details

### Left Option: ${battle.left}
- Color: ${battle.leftColor}
- Image Placeholder: https://via.placeholder.com/400x400/${battle.leftColor.replace('#', '')}/ffffff?text=${encodeURIComponent(battle.left)}

### Right Option: ${battle.right}
- Color: ${battle.rightColor}
- Image Placeholder: https://via.placeholder.com/400x400/${battle.rightColor.replace('#', '')}/ffffff?text=${encodeURIComponent(battle.right)}

## Image Generation Instructions

### Left Option Image
- Size: 400x400 pixels
- Background color: ${battle.leftColor}
- Text: "${battle.left}"
- Text color: White
- Font: Bold, sans-serif
- Text size: Large, centered

### Right Option Image
- Size: 400x400 pixels
- Background color: ${battle.rightColor}
- Text: "${battle.right}"
- Text color: White
- Font: Bold, sans-serif
- Text size: Large, centered

## Battle Key
${battleKey}

---

*Generated for Who's Better? website*
`;

    fs.writeFileSync(filePath, content);
    console.log(`Created: ${fileName}`);
});

console.log(`\nGenerated ${battles.length} battle markdown files in ${battlesDir}`);
