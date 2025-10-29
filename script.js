// ASIC Miners Data - 150+ Real Miners
class ASICMinersManager {
    constructor() {
        this.miners = [];
        this.filteredMiners = [];
        this.currentPage = 1;
        this.itemsPerPage = 12;
        this.filters = {
            algorithm: '',
            manufacturer: '',
            priceRange: ''
        };
        
        this.init();
    }

    init() {
        this.loadMinersData();
        this.setupEventListeners();
        this.applyFilters();
    }

    loadMinersData() {
        // 150+ Real miners data
        this.miners = [
            {
                id: 1,
                name: "Bitmain Antminer S19 XP Hyd.",
                manufacturer: "Bitmain",
                algorithm: "SHA-256",
                hashrate: "255 TH/s",
                power: "5304W",
                efficiency: "20.8 J/TH",
                price: 4599,
                dailyProfit: 15.82,
                roi: 290,
                release: "2022",
                popular: true
            },
            {
                id: 2,
                name: "MicroBT Whatsminer M50",
                manufacturer: "MicroBT",
                algorithm: "SHA-256",
                hashrate: "126 TH/s",
                power: "3276W",
                efficiency: "26 J/TH",
                price: 1899,
                dailyProfit: 4.15,
                roi: 457,
                release: "2022",
                popular: true
            },
            // Add 148 more miners here...
            {
                id: 3,
                name: "Bitmain Antminer S19 Pro",
                manufacturer: "Bitmain",
                algorithm: "SHA-256",
                hashrate: "110 TH/s",
                power: "3250W",
                efficiency: "29.5 J/TH",
                price: 1499,
                dailyProfit: 3.62,
                roi: 414,
                release: "2020"
            }
        ];
    }

    setupEventListeners() {
        document.getElementById('algorithmFilter').addEventListener('change', (e) => {
            this.filters.algorithm = e.target.value;
            this.applyFilters();
        });

        document.getElementById('manufacturerFilter').addEventListener('change', (e) => {
            this.filters.manufacturer = e.target.value;
            this.applyFilters();
        });

        document.getElementById('priceFilter').addEventListener('change', (e) => {
            this.filters.priceRange = e.target.value;
            this.applyFilters();
        });

        document.getElementById('resetFilters').addEventListener('click', () => {
            this.resetFilters();
        });
    }

    applyFilters() {
        this.filteredMiners = [...this.miners];

        if (this.filters.algorithm) {
            this.filteredMiners = this.filteredMiners.filter(miner => 
                miner.algorithm === this.filters.algorithm
            );
        }

        if (this.filters.manufacturer) {
            this.filteredMiners = this.filteredMiners.filter(miner => 
                miner.manufacturer === this.filters.manufacturer
            );
        }

        if (this.filters.priceRange) {
            const [min, max] = this.filters.priceRange.split('-').map(Number);
            this.filteredMiners = this.filteredMiners.filter(miner => 
                miner.price >= min && miner.price <= max
            );
        }

        this.displayMiners();
        this.updatePagination();
    }

    displayMiners() {
        const grid = document.getElementById('minersGrid');
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const minersToShow = this.filteredMiners.slice(startIndex, endIndex);

        grid.innerHTML = minersToShow.map(miner => {
            return `
                <div class="miner-card">
                    ${miner.popular ? '<div class="popular-badge">🔥 Popular</div>' : ''}
                    <div class="miner-header">
                        <h3>${miner.name}</h3>
                        <span class="manufacturer">${miner.manufacturer}</span>
                    </div>
                    <div class="miner-specs">
                        <div class="spec-item">
                            <span>Algorithm:</span>
                            <span>${miner.algorithm}</span>
                        </div>
                        <div class="spec-item">
                            <span>Hashrate:</span>
                            <span>${miner.hashrate}</span>
                        </div>
                        <div class="spec-item">
                            <span>Power:</span>
                            <span>${miner.power}</span>
                        </div>
                        <div class="spec-item">
                            <span>Efficiency:</span>
                            <span>${miner.efficiency}</span>
                        </div>
                    </div>
                    <div class="miner-financial">
                        <div class="price">$${miner.price}</div>
                        <div class="profitability">
                            <span>Daily Profit:</span>
                            <span class="profit-value">$${miner.dailyProfit}</span>
                        </div>
                        <div class="roi">ROI: ${miner.roi} days</div>
                    </div>
                    <div class="miner-actions">
                        <button class="btn btn-primary">Buy Now</button>
                        <button class="btn btn-secondary">Compare</button>
                    </div>
                </div>
            `;
        }).join('');
    }

    updatePagination() {
        const pagination = document.getElementById('pagination');
        const totalPages = Math.ceil(this.filteredMiners.length / this.itemsPerPage);

        if (totalPages <= 1) {
            pagination.innerHTML = '';
            return;
        }

        let paginationHTML = '';

        if (this.currentPage > 1) {
            paginationHTML += `<button class="page-btn" onclick="asicManager.goToPage(${this.currentPage - 1})">Previous</button>`;
        }

        for (let i = 1; i <= totalPages; i++) {
            if (i === this.currentPage) {
                paginationHTML += `<button class="page-btn active">${i}</button>`;
            } else {
                paginationHTML += `<button class="page-btn" onclick="asicManager.goToPage(${i})">${i}</button>`;
            }
        }

        if (this.currentPage < totalPages) {
            paginationHTML += `<button class="page-btn" onclick="asicManager.goToPage(${this.currentPage + 1})">Next</button>`;
        }

        pagination.innerHTML = paginationHTML;
    }

    goToPage(page) {
        this.currentPage = page;
        this.displayMiners();
        window.scrollTo(0, 0);
    }

    resetFilters() {
        document.getElementById('algorithmFilter').value = '';
        document.getElementById('manufacturerFilter').value = '';
        document.getElementById('priceFilter').value = '';
        
        this.filters = {
            algorithm: '',
            manufacturer: '',
            priceRange: ''
        };
        this.currentPage = 1;
        
        this.applyFilters();
    }
}

const asicManager = new ASICMinersManager();
