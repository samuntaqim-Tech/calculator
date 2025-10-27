// REPLACE your empty file with this REAL miner data
const MINER_DATABASE = [
    {
        id: 1,
        name: "Antminer S19 XP",
        manufacturer: "Bitmain",
        algorithm: "SHA-256",
        hashrate: "140 TH/s",
        power: "3010W",
        noise: "75db",
        price: 4200,
        profit: 12.45,
        roi: 338,
        release: "2022",
        image: "https://via.placeholder.com/300x200/3498db/white?text=S19+XP"
    },
    {
        id: 2,
        name: "Whatsminer M50",
        manufacturer: "MicroBT",
        algorithm: "SHA-256", 
        hashrate: "118 TH/s",
        power: "3276W",
        noise: "75db",
        price: 3500,
        profit: 9.80,
        roi: 357,
        release: "2022",
        image: "https://via.placeholder.com/300x200/e74c3c/white?text=M50"
    },
    {
        id: 3,
        name: "Avalon Miner 1246",
        manufacturer: "Canaan",
        algorithm: "SHA-256",
        hashrate: "90 TH/s", 
        power: "3420W",
        noise: "75db",
        price: 3800,
        profit: 7.20,
        roi: 528,
        release: "2022",
        image: "https://via.placeholder.com/300x200/2ecc71/white?text=A1246"
    },
    {
        id: 4,
        name: "Antminer S19j Pro",
        manufacturer: "Bitmain",
        algorithm: "SHA-256",
        hashrate: "104 TH/s",
        power: "3068W",
        noise: "75db", 
        price: 3200,
        profit: 8.90,
        roi: 359,
        release: "2021",
        image: "https://via.placeholder.com/300x200/9b59b6/white?text=S19j+Pro"
    },
    {
        id: 5,
        name: "Whatsminer M30S++",
        manufacturer: "MicroBT",
        algorithm: "SHA-256",
        hashrate: "112 TH/s",
        power: "3472W",
        noise: "75db",
        price: 2900,
        profit: 8.10,
        roi: 358,
        release: "2021",
        image: "https://via.placeholder.com/300x200/f39c12/white?text=M30S++"
    }
];

// Add this function to make the data accessible
function getAllMiners() {
    return MINER_DATABASE;
}

function getMinerById(id) {
    return MINER_DATABASE.find(miner => miner.id === id);
}

function getMinersByAlgorithm(algorithm) {
    return MINER_DATABASE.filter(miner => miner.algorithm === algorithm);
}
// Add this function to get miner by ID (if not already there)
function getMinerById(id) {
    return MINER_DATABASE.find(miner => miner.id === id);
}
