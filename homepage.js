// homepage.js - Homepage functionality
class Homepage {
    constructor() {
        this.init();
    }

    init() {
        this.loadProfitableMiners();
        this.setupEventListeners();
        this.updateLivePrices();
    }

    loadProfitableMiners() {
        // This will load from your miner database
        const miners = [
            {
                id: 1,
                name: "Antminer S19 XP",
                algorithm: "SHA-256",
                hashrate: "140 TH/s",
                power: "3010W",
                profit: 12.45,
                efficiency: "21.5 J/TH"
            },
            {
                id: 2, 
                name: "Whatsminer M50",
                algorithm: "SHA-256",
                hashrate: "118 TH/s", 
                power: "3276W",
                profit: 9.80,
                efficiency: "27.8 J/TH"
            },
            // Add more miners...
        ];

        this.displayMiners(miners);
    }

    displayMiners(miners) {
        const grid = document.getElementById('profitable-miners');
        grid.innerHTML = '';

        miners.forEach(miner => {
            const minerCard = this.createMinerCard(miner);
            grid.appendChild(minerCard);
        });
    }

    createMinerCard(miner) {
        const card = document.createElement('div');
        card.className = 'miner-card';
        card.innerHTML = `
            <div class="miner-header">
                <h3>${miner.name}</h3>
                <span class="algorithm-badge">${miner.algorithm}</span>
            </div>
            <div class="miner-specs">
                <div class="spec">
                    <span class="spec-label">Hashrate</span>
                    <span class="spec-value">${miner.hashrate}</span>
                </div>
                <div class="spec">
                    <span class="spec-label">Power</span>
                    <span class="spec-value">${miner.power}</span>
                </div>
                <div class="spec">
                    <span class="spec-label">Efficiency</span>
                    <span class="spec-value">${miner.efficiency}</span>
                </div>
            </div>
            <div class="miner-profit">
                <span class="profit-amount">$${miner.profit}/day</span>
                <button class="btn-compare" onclick="addToComparison(${miner.id})">
                    <i class="fas fa-balance-scale"></i> Compare
                </button>
            </div>
        `;

        card.addEventListener('click', (e) => {
            if (!e.target.closest('.btn-compare')) {
                window.location.href = `miner-details.html?id=${miner.id}`;
            }
        });

        return card;
    }

    updateLivePrices() {
        // Implement live price updates
        setInterval(() => {
            // Update BTC and ETH prices
        }, 30000);
    }

    setupEventListeners() {
        // Setup filters and search functionality
        document.getElementById('global-search').addEventListener('input', this.handleSearch);
        document.getElementById('theme-toggle').addEventListener('click', this.toggleTheme);
    }

    handleSearch(event) {
        const query = event.target.value.toLowerCase();
        // Implement search functionality
    }

    toggleTheme() {
        document.body.classList.toggle('dark-theme');
    }
}

// Initialize homepage
document.addEventListener('DOMContentLoaded', () => {
    new Homepage();
});
