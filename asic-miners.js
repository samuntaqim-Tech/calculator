// ASIC Miners Data - Exact same as competitor
class ASICMinersManager {
    constructor() {
        this.miners = [];
        this.filteredMiners = [];
        this.currentPage = 1;
        this.itemsPerPage = 12;
        this.filters = {
            algorithm: '',
            manufacturer: '',
            priceRange: '',
            hashrate: ''
        };
        this.sortBy = 'profitability';
        this.sortOrder = 'desc';
        
        this.init();
    }

    async init() {
        await this.loadMinersData();
        this.setupEventListeners();
        this.applyFilters();
    }

    // Real miner data from competitor analysis
    loadMinersData() {
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
                noise: "75 db",
                weight: "14500 g",
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
                noise: "75 db",
                weight: "12600 g",
                release: "2022",
                popular: true
            },
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
                noise: "75 db",
                weight: "13600 g",
                release: "2020",
                popular: true
            },
            {
                id: 4,
                name: "Canaan Avalon A1266",
                manufacturer: "Canaan",
                algorithm: "SHA-256",
                hashrate: "110 TH/s",
                power: "3420W",
                efficiency: "31 J/TH",
                price: 1299,
                dailyProfit: 3.02,
                roi: 430,
                noise: "75 db",
                weight: "12500 g",
                release: "2022"
            },
            {
                id: 5,
                name: "Bitmain Antminer L7",
                manufacturer: "Bitmain",
                algorithm: "Scrypt",
                hashrate: "9500 MH/s",
                power: "3425W",
                efficiency: "0.36 J/MH",
                price: 6999,
                dailyProfit: 18.25,
                roi: 383,
                noise: "75 db",
                weight: "13000 g",
                release: "2021",
                popular: true
            },
            {
                id: 6,
                name: "MicroBT Whatsminer M53",
                manufacturer: "MicroBT",
                algorithm: "SHA-256",
                hashrate: "240 TH/s",
                power: "6720W",
                efficiency: "28 J/TH",
                price: 5899,
                dailyProfit: 8.42,
                roi: 700,
                noise: "75 db",
                weight: "15600 g",
                release: "2023"
            },
            {
                id: 7,
                name: "Bitmain Antminer S19",
                manufacturer: "Bitmain",
                algorithm: "SHA-256",
                hashrate: "95 TH/s",
                power: "3250W",
                efficiency: "34 J/TH",
                price: 1199,
                dailyProfit: 2.61,
                roi: 459,
                noise: "75 db",
                weight: "13600 g",
                release: "2020"
            },
            {
                id: 8,
                name: "Innosilicon A11 Pro",
                manufacturer: "Innosilicon",
                algorithm: "Ethash",
                hashrate: "2000 MH/s",
                power: "2500W",
                efficiency: "1.25 J/MH",
                price: 8999,
                dailyProfit: 12.45,
                roi: 722,
                noise: "75 db",
                weight: "12000 g",
                release: "2021"
            },
            {
                id: 9,
                name: "Bitmain Antminer E9",
                manufacturer: "Bitmain",
                algorithm: "Ethash",
                hashrate: "2400 MH/s",
                power: "1920W",
                efficiency: "0.8 J/MH",
                price: 14999,
                dailyProfit: 15.82,
                roi: 948,
                noise: "75 db",
                weight: "14200 g",
                release: "2021"
            },
            {
                id: 10,
                name: "iBeLink BM-K1",
                manufacturer: "iBeLink",
                algorithm: "Kadena",
                hashrate: "2000 GH/s",
                power: "600W",
                efficiency: "0.3 J/GH",
                price: 3999,
                dailyProfit: 6.25,
                roi: 640,
                noise: "35 db",
                weight: "5800 g",
                release: "2021"
            },
            {
                id: 11,
                name: "Bitmain Antminer D7",
                manufacturer: "Bitmain",
                algorithm: "X11",
                hashrate: "1286 GH/s",
                power: "3148W",
                efficiency: "2.45 J/GH",
                price: 4599,
                dailyProfit: 8.92,
                roi: 515,
                noise: "75 db",
                weight: "13600 g",
                release: "2021"
            },
            {
                id: 12,
                name: "Canaan Avalon A1246",
                manufacturer: "Canaan",
                algorithm: "SHA-256",
                hashrate: "90 TH/s",
                power: "3420W",
                efficiency: "38 J/TH",
                price: 999,
                dailyProfit: 1.96,
                roi: 510,
                noise: "75 db",
                weight: "12500 g",
                release: "2021"
            }
        ];
    }

    setupEventListeners() {
        // Filter event listeners
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

        document.getElementById('hashrateFilter').addEventListener('change', (e) => {
            this.filters.hashrate = e.target.value;
            this.applyFilters();
        });

        // Sort event listeners
        document.getElementById('sortBy').addEventListener('change', (e) => {
            this.sortBy = e.target.value;
            this.applyFilters();
        });

        document.getElementById('sortOrder').addEventListener('change', (e) => {
            this.sortOrder = e.target.value;
            this.applyFilters();
        });

        // Reset filters
        document.getElementById('resetFilters').addEventListener('click', () => {
            this.resetFilters();
        });
    }

    applyFilters() {
        this.filteredMiners = [...this.miners];

        // Apply algorithm filter
        if (this.filters.algorithm) {
            this.filteredMiners = this.filteredMiners.filter(miner => 
                miner.algorithm === this.filters.algorithm
            );
        }

        // Apply manufacturer filter
        if (this.filters.manufacturer) {
            this.filteredMiners = this.filteredMiners.filter(miner => 
                miner.manufacturer === this.filters.manufacturer
            );
        }

        // Apply price range filter
        if (this.filters.priceRange) {
            const [min, max] = this.filters.priceRange.split('-').map(Number);
            this.filteredMiners = this.filteredMiners.filter(miner => 
                miner.price >= min && miner.price <= max
            );
        }

        // Apply hashrate filter
        if (this.filters.hashrate) {
            const [min, max] = this.filters.hashrate.split('-').map(Number);
            this.filteredMiners = this.filteredMiners.filter(miner => {
                const hashrateValue = parseFloat(miner.hashrate);
                return hashrateValue >= min && hashrateValue <= max;
            });
        }

        // Sort miners
        this.sortMiners();

        // Display results
        this.displayMiners();
        this.updatePagination();
    }

    sortMiners() {
        this.filteredMiners.sort((a, b) => {
            let valueA, valueB;

            switch (this.sortBy) {
                case 'profitability':
                    valueA = a.dailyProfit;
                    valueB = b.dailyProfit;
                    break;
                case 'price':
                    valueA = a.price;
                    valueB = b.price;
                    break;
                case 'hashrate':
                    valueA = parseFloat(a.hashrate);
                    valueB = parseFloat(b.hashrate);
                    break;
                case 'efficiency':
                    valueA = parseFloat(a.efficiency);
                    valueB = parseFloat(b.efficiency);
                    break;
                case 'name':
                    valueA = a.name;
                    valueB = b.name;
                    break;
                default:
                    valueA = a.dailyProfit;
                    valueB = b.dailyProfit;
            }

            if (this.sortOrder === 'asc') {
                return valueA > valueB ? 1 : -1;
            } else {
                return valueA < valueB ? 1 : -1;
            }
        });
    }

    displayMiners() {
        const grid = document.getElementById('minersGrid');
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const minersToShow = this.filteredMiners.slice(startIndex, endIndex);

        const currency = localStorage.getItem('preferredCurrency') || 'USD';

        grid.innerHTML = minersToShow.map(miner => {
            const price = window.cryptoService.convertPrice(miner.price, currency);
            const dailyProfit = window.cryptoService.convertPrice(miner.dailyProfit, currency);
            const formattedPrice = window.cryptoService.formatCurrency(price, currency);
            const formattedProfit = window.cryptoService.formatCurrency(dailyProfit, currency);

            return `
                <div class="miner-card" data-id="${miner.id}">
                    ${miner.popular ? '<div class="popular-badge">🔥 Popular</div>' : ''}
                    <div class="miner-header">
                        <h3>${miner.name}</h3>
                        <span class="manufacturer">${miner.manufacturer}</span>
                    </div>
                    
                    <div class="miner-specs">
                        <div class="spec-item">
                            <span class="spec-label">Algorithm:</span>
                            <span class="spec-value">${miner.algorithm}</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label">Hashrate:</span>
                            <span class="spec-value">${miner.hashrate}</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label">Power:</span>
                            <span class="spec-value">${miner.power}</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label">Efficiency:</span>
                            <span class="spec-value">${miner.efficiency}</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label">Noise:</span>
                            <span class="spec-value">${miner.noise}</span>
                        </div>
                    </div>

                    <div class="miner-financial">
                        <div class="price">${formattedPrice}</div>
                        <div class="profitability">
                            <span class="profit-label">Daily Profit:</span>
                            <span class="profit-value">${formattedProfit}</span>
                        </div>
                        <div class="roi">
                            ROI: ${miner.roi} days
                        </div>
                    </div>

                    <div class="miner-actions">
                        <button class="btn btn-primary" onclick="viewMinerDetails(${miner.id})">View Details</button>
                        <button class="btn btn-secondary" onclick="addToComparison(${miner.id})">Compare</button>
                    </div>
                </div>
            `;
        }).join('');

        // Update results count
        this.updateResultsCount();
    }

    updateResultsCount() {
        // You can add a results count display if needed
        console.log(`Showing ${this.filteredMiners.length} miners`);
    }

    updatePagination() {
        const pagination = document.getElementById('pagination');
        const totalPages = Math.ceil(this.filteredMiners.length / this.itemsPerPage);

        if (totalPages <= 1) {
            pagination.innerHTML = '';
            return;
        }

        let paginationHTML = '';

        // Previous button
        if (this.currentPage > 1) {
            paginationHTML += `<button class="page-btn" onclick="asicManager.goToPage(${this.currentPage - 1})">Previous</button>`;
        }

        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            if (i === this.currentPage) {
                paginationHTML += `<button class="page-btn active">${i}</button>`;
            } else {
                paginationHTML += `<button class="page-btn" onclick="asicManager.goToPage(${i})">${i}</button>`;
            }
        }

        // Next button
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
        document.getElementById('hashrateFilter').value = '';
        document.getElementById('sortBy').value = 'profitability';
        document.getElementById('sortOrder').value = 'desc';

        this.filters = {
            algorithm: '',
            manufacturer: '',
            priceRange: '',
            hashrate: ''
        };
        this.sortBy = 'profitability';
        this.sortOrder = 'desc';
        this.currentPage = 1;

        this.applyFilters();
    }
}

// Global functions
function viewMinerDetails(minerId) {
    alert(`View details for miner ${minerId} - This will open a detailed page`);
    // Implement detailed view
}

function addToComparison(minerId) {
    alert(`Added miner ${minerId} to comparison`);
    // Implement comparison functionality
}

// Initialize
const asicManager = new ASICMinersManager();
