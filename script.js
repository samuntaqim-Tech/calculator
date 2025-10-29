// ASIC Miner Value - Cryptocurrency Mining Calculator
class MiningCalculator {
    constructor() {
        this.coinData = {};
        this.minerData = {};
        this.currentPrices = {};
        this.init();
    }

    async init() {
        await this.loadCoinData();
        await this.loadMinerData();
        await this.loadLivePrices();
        this.setupEventListeners();
        this.setupAdSense();
        
        // Update prices every 2 minutes
        setInterval(() => this.loadLivePrices(), 120000);
    }

    async loadCoinData() {
        // Coin data with algorithm and base profitability
        this.coinData = {
            'bitcoin': {
                name: 'Bitcoin',
                symbol: 'BTC',
                algorithm: 'SHA-256',
                blockReward: 6.25,
                blockTime: 600,
                networkHashrate: 200000000 // 200 EH/s
            },
            'ethereum': {
                name: 'Ethereum',
                symbol: 'ETH',
                algorithm: 'Ethash',
                blockReward: 2,
                blockTime: 13.5,
                networkHashrate: 900000 // 900 TH/s
            },
            'monero': {
                name: 'Monero',
                symbol: 'XMR',
                algorithm: 'RandomX',
                blockReward: 0.6,
                blockTime: 120,
                networkHashrate: 2.5 // 2.5 GH/s
            },
            'litecoin': {
                name: 'Litecoin',
                symbol: 'LTC',
                algorithm: 'Scrypt',
                blockReward: 12.5,
                blockTime: 150,
                networkHashrate: 500000 // 500 TH/s
            }
        };
    }

    async loadMinerData() {
        // ASIC Miner specifications
        this.minerData = {
            'antminer-s19xp': {
                name: 'Antminer S19 XP',
                hashrate: 140,
                power: 3010,
                algorithm: 'SHA-256',
                price: 6500
            },
            'antminer-s19pro': {
                name: 'Antminer S19 Pro',
                hashrate: 110,
                power: 3250,
                algorithm: 'SHA-256',
                price: 3200
            },
            'whatsminer-m50': {
                name: 'Whatsminer M50',
                hashrate: 118,
                power: 3276,
                algorithm: 'SHA-256',
                price: 3800
            },
            'antminer-s19jpro': {
                name: 'Antminer S19j Pro',
                hashrate: 104,
                power: 3068,
                algorithm: 'SHA-256',
                price: 2800
            }
        };
    }

    async loadLivePrices() {
        try {
            const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,monero,litecoin&vs_currencies=usd&include_24hr_change=true');
            const data = await response.json();
            this.currentPrices = data;
            this.updatePriceDisplay();
        } catch (error) {
            console.error('Error loading prices:', error);
            this.showError('Failed to load live prices. Using cached data.');
        }
    }

    updatePriceDisplay() {
        const ticker = document.getElementById('priceTicker');
        if (!ticker) return;

        ticker.innerHTML = Object.entries(this.currentPrices).map(([coin, data]) => {
            const change = data.usd_24h_change || 0;
            const changeClass = change >= 0 ? 'positive' : 'negative';
            const changeSymbol = change >= 0 ? '+' : '';
            
            return `
                <div class="price-item">
                    <span class="coin-name">${this.coinData[coin]?.name || coin}</span>
                    <span class="coin-price">$${data.usd?.toLocaleString() || '0'}</span>
                    <span class="coin-change ${changeClass}">${changeSymbol}${change?.toFixed(2) || '0.00'}%</span>
                </div>
            `;
        }).join('');
    }

    setupEventListeners() {
        const calculateBtn = document.getElementById('calculateBtn');
        const minerSelect = document.getElementById('minerSelect');
        const coinSelect = document.getElementById('coinSelect');

        if (calculateBtn) {
            calculateBtn.addEventListener('click', () => this.calculateProfitability());
        }

        if (minerSelect) {
            minerSelect.addEventListener('change', (e) => this.onMinerSelect(e.target.value));
        }

        if (coinSelect) {
            coinSelect.addEventListener('change', (e) => this.onCoinSelect(e.target.value));
        }

        // Auto-calculate on input changes
        const inputs = ['hashrate', 'power', 'electricityCost', 'poolFee'];
        inputs.forEach(inputId => {
            const input = document.getElementById(inputId);
            if (input) {
                input.addEventListener('input', () => this.calculateProfitability());
            }
        });
    }

    onMinerSelect(minerId) {
        const miner = this.minerData[minerId];
        if (miner) {
            document.getElementById('hashrate').value = miner.hashrate;
            document.getElementById('power').value = miner.power;
            this.calculateProfitability();
        }
    }

    onCoinSelect(coinId) {
        // Update miner options based on coin algorithm
        const coin = this.coinData[coinId];
        const minerSelect = document.getElementById('minerSelect');
        
        if (coin && minerSelect) {
            const compatibleMiners = Object.entries(this.minerData)
                .filter(([_, miner]) => miner.algorithm === coin.algorithm)
                .map(([id, miner]) => `<option value="${id}">${miner.name}</option>`)
                .join('');
            
            minerSelect.innerHTML = '<option value="">Select Miner</option>' + compatibleMiners;
        }
        
        this.calculateProfitability();
    }

    calculateProfitability() {
        const coinId = document.getElementById('coinSelect').value;
        const minerId = document.getElementById('minerSelect').value;
        const hashrate = parseFloat(document.getElementById('hashrate').value) || 0;
        const power = parseFloat(document.getElementById('power').value) || 0;
        const electricityCost = parseFloat(document.getElementById('electricityCost').value) || 0;
        const poolFee = parseFloat(document.getElementById('poolFee').value) || 0;

        if (!coinId || hashrate <= 0) {
            return;
        }

        const coin = this.coinData[coinId];
        const price = this.currentPrices[coinId]?.usd || 50000; // Fallback price

        // Calculate daily revenue (simplified)
        const dailyRevenue = this.calculateDailyRevenue(coin, hashrate, price, poolFee);
        const dailyCost = this.calculateDailyCost(power, electricityCost);
        const dailyProfit = dailyRevenue - dailyCost;

        // Update results
        this.updateResults(dailyRevenue, dailyCost, dailyProfit, minerId);
    }

    calculateDailyRevenue(coin, hashrate, price, poolFee) {
        // Simplified profitability calculation
        // In production, you'd use more accurate formulas based on network difficulty
        const baseRevenue = (hashrate / coin.networkHashrate) * coin.blockReward * price * 144;
        return baseRevenue * (1 - poolFee / 100);
    }

    calculateDailyCost(power, electricityCost) {
        const dailyKwh = (power * 24) / 1000;
        return dailyKwh * electricityCost;
    }

    updateResults(revenue, cost, profit, minerId) {
        const elements = {
            dailyRevenue: revenue,
            dailyCost: cost,
            dailyProfit: profit,
            monthlyProfit: profit * 30,
            yearlyProfit: profit * 365
        };

        Object.entries(elements).forEach(([id, value]) => {
            const element = document.getElementById(id);
            if (element) {
                element.textContent = `$${value.toFixed(2)}`;
            }
        });

        // Calculate ROI if miner is selected
        if (minerId && this.minerData[minerId]) {
            const minerPrice = this.minerData[minerId].price;
            const roiDays = profit > 0 ? Math.ceil(minerPrice / profit) : Infinity;
            const roiElement = document.getElementById('roiPeriod');
            if (roiElement) {
                roiElement.textContent = profit > 0 ? `${roiDays} days` : 'Never';
            }
        }
    }

    setupAdSense() {
        // AdSense is already included in the HTML
        // This function can be used for additional AdSense configurations
        try {
            (adsbygoogle = window.adsbygoogle || []).push({});
        } catch (error) {
            console.error('AdSense error:', error);
        }
    }

    showError(message) {
        // Remove existing errors
        const existingError = document.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        // Create error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message error';
        errorDiv.textContent = message;
        
        // Insert at top of main content
        const main = document.querySelector('main');
        if (main) {
            main.insertBefore(errorDiv, main.firstChild);
            
            // Remove after 5 seconds
            setTimeout(() => {
                errorDiv.remove();
            }, 5000);
        }
    }
}

// Initialize the calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.miningCalculator = new MiningCalculator();
});

// SEO Optimization - Update meta tags dynamically
function updateMetaTags() {
    // Update canonical URL
    const canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
        const link = document.createElement('link');
        link.rel = 'canonical';
        link.href = window.location.href.split('?')[0];
        document.head.appendChild(link);
    }
}

// Call meta tag update
updateMetaTags();
