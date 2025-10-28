// Mining Profitability Calculator - Complete with Real Calculations
class ProfitabilityCalculator {
    constructor() {
        this.currentCurrency = 'USD';
        this.minerData = [];
        this.cryptoData = {};
        this.chart = null;
        
        this.init();
    }

    async init() {
        await this.loadMinerData();
        await this.loadCryptoData();
        this.setupEventListeners();
        this.populateMinerSelect();
        this.populatePopularMiners();
        this.updateCurrencyDisplay();
    }

    // Load miner data from our database
    loadMinerData() {
        this.minerData = [
            // Bitcoin Miners
            {
                id: 1,
                name: "Bitmain Antminer S19 XP Hyd. (255Th)",
                algorithm: "SHA-256",
                hashrate: 255,
                hashrateUnit: "TH/s",
                power: 5304,
                price: 4599,
                cryptocurrency: "bitcoin"
            },
            {
                id: 2,
                name: "MicroBT Whatsminer M50 (126Th)",
                algorithm: "SHA-256",
                hashrate: 126,
                hashrateUnit: "TH/s",
                power: 3276,
                price: 1899,
                cryptocurrency: "bitcoin"
            },
            {
                id: 3,
                name: "Bitmain Antminer S19 Pro (110Th)",
                algorithm: "SHA-256",
                hashrate: 110,
                hashrateUnit: "TH/s",
                power: 3250,
                price: 1499,
                cryptocurrency: "bitcoin"
            },
            {
                id: 4,
                name: "Canaan Avalon A1266 (110Th)",
                algorithm: "SHA-256",
                hashrate: 110,
                hashrateUnit: "TH/s",
                power: 3420,
                price: 1299,
                cryptocurrency: "bitcoin"
            },

            // Ethereum Miners
            {
                id: 5,
                name: "Innosilicon A11 Pro (2000Mh)",
                algorithm: "Ethash",
                hashrate: 2000,
                hashrateUnit: "MH/s",
                power: 2500,
                price: 8999,
                cryptocurrency: "ethereum"
            },
            {
                id: 6,
                name: "Bitmain Antminer E9 (2400Mh)",
                algorithm: "Ethash",
                hashrate: 2400,
                hashrateUnit: "MH/s",
                power: 1920,
                price: 14999,
                cryptocurrency: "ethereum"
            },

            // Litecoin Miners
            {
                id: 7,
                name: "Bitmain Antminer L7 (9500Mh)",
                algorithm: "Scrypt",
                hashrate: 9500,
                hashrateUnit: "MH/s",
                power: 3425,
                price: 6999,
                cryptocurrency: "litecoin"
            },
            {
                id: 8,
                name: "Innosilicon A6+ LTC Master (2200Mh)",
                algorithm: "Scrypt",
                hashrate: 2200,
                hashrateUnit: "MH/s",
                power: 2200,
                price: 2999,
                cryptocurrency: "litecoin"
            },

            // Other miners...
            {
                id: 9,
                name: "Bitmain Antminer D7 (1286Gh)",
                algorithm: "X11",
                hashrate: 1286,
                hashrateUnit: "GH/s",
                power: 3148,
                price: 4599,
                cryptocurrency: "dash"
            },
            {
                id: 10,
                name: "iBeLink BM-K1 (2000Gh)",
                algorithm: "Kadena",
                hashrate: 2000,
                hashrateUnit: "GH/s",
                power: 600,
                price: 3999,
                cryptocurrency: "custom"
            }
        ];
    }

    // Load cryptocurrency data
    async loadCryptoData() {
        try {
            // Use CoinGecko API for real-time data
            const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,litecoin,bitcoin-cash,monero,zcash,dash&vs_currencies=usd&include_24hr_change=true');
            const data = await response.json();
            
            this.cryptoData = {
                bitcoin: {
                    price: data.bitcoin.usd,
                    change: data.bitcoin.usd_24h_change,
                    networkHashrate: 250000000, // 250 EH/s
                    blockReward: 6.25,
                    blockTime: 600 // 10 minutes
                },
                ethereum: {
                    price: data.ethereum.usd,
                    change: data.ethereum.usd_24h_change,
                    networkHashrate: 900000, // 900 TH/s
                    blockReward: 2,
                    blockTime: 13
                },
                litecoin: {
                    price: data.litecoin.usd,
                    change: data.litecoin.usd_24h_change,
                    networkHashrate: 500000, // 500 TH/s
                    blockReward: 12.5,
                    blockTime: 150
                },
                'bitcoin-cash': {
                    price: data['bitcoin-cash'].usd,
                    change: data['bitcoin-cash'].usd_24h_change,
                    networkHashrate: 2000000, // 2 EH/s
                    blockReward: 6.25,
                    blockTime: 600
                },
                monero: {
                    price: data.monero.usd,
                    change: data.monero.usd_24h_change,
                    networkHashrate: 2000000, // 2 GH/s
                    blockReward: 0.6,
                    blockTime: 120
                },
                zcash: {
                    price: data.zcash.usd,
                    change: data.zcash.usd_24h_change,
                    networkHashrate: 5000000, // 5 GS/s
                    blockReward: 2.5,
                    blockTime: 75
                },
                dash: {
                    price: data.dash.usd,
                    change: data.dash.usd_24h_change,
                    networkHashrate: 3000000, // 3 PH/s
                    blockReward: 2.88,
                    blockTime: 150
                }
            };
        } catch (error) {
            console.error('Error loading crypto data:', error);
            // Fallback data
            this.cryptoData = {
                bitcoin: { price: 43450, change: 2.5, networkHashrate: 250000000, blockReward: 6.25, blockTime: 600 },
                ethereum: { price: 2340, change: 1.8, networkHashrate: 900000, blockReward: 2, blockTime: 13 },
                litecoin: { price: 72.5, change: -0.5, networkHashrate: 500000, blockReward: 12.5, blockTime: 150 },
                'bitcoin-cash': { price: 245, change: 1.2, networkHashrate: 2000000, blockReward: 6.25, blockTime: 600 },
                monero: { price: 165, change: 0.8, networkHashrate: 2000000, blockReward: 0.6, blockTime: 120 },
                zcash: { price: 28.5, change: -1.2, networkHashrate: 5000000, blockReward: 2.5, blockTime: 75 },
                dash: { price: 32.8, change: 0.5, networkHashrate: 3000000, blockReward: 2.88, blockTime: 150 }
            };
        }
    }

    setupEventListeners() {
        // Calculate button
        document.getElementById('calculateBtn').addEventListener('click', () => {
            this.calculateProfitability();
        });

        // Reset button
        document.getElementById('resetBtn').addEventListener('click', () => {
            this.resetCalculator();
        });

        // Crypto selection change
        document.getElementById('cryptoSelect').addEventListener('change', (e) => {
            this.onCryptoChange(e.target.value);
        });

        // Miner selection change
        document.getElementById('minerSelect').addEventListener('change', (e) => {
            this.onMinerChange(e.target.value);
        });

        // Currency change
        document.getElementById('currencySelector').addEventListener('change', (e) => {
            this.currentCurrency = e.target.value;
            this.updateCurrencyDisplay();
            this.calculateProfitability();
        });

        // Real-time input changes
        document.getElementById('hashrateInput').addEventListener('input', () => {
            this.calculateProfitability();
        });

        document.getElementById('powerInput').addEventListener('input', () => {
            this.calculateProfitability();
        });

        document.getElementById('electricityCost').addEventListener('input', () => {
            this.calculateProfitability();
        });

        // Theme toggle
        document.getElementById('theme-toggle').addEventListener('click', () => {
            this.toggleTheme();
        });

        // Mobile menu
        document.querySelector('.hamburger').addEventListener('click', () => {
            this.toggleMobileMenu();
        });
    }

    populateMinerSelect() {
        const select = document.getElementById('minerSelect');
        select.innerHTML = '<option value="">Select Miner...</option>';
        
        this.minerData.forEach(miner => {
            const option = document.createElement('option');
            option.value = miner.id;
            option.textContent = miner.name;
            option.dataset.crypto = miner.cryptocurrency;
            select.appendChild(option);
        });
    }

    populatePopularMiners() {
        const grid = document.getElementById('popularMinersGrid');
        const popularMiners = this.minerData.slice(0, 6); // Show first 6 miners
        
        grid.innerHTML = popularMiners.map(miner => {
            const price = window.cryptoService.convertPrice(miner.price, this.currentCurrency);
            const formattedPrice = window.cryptoService.formatCurrency(price, this.currentCurrency);
            
            return `
                <div class="miner-card" onclick="profitabilityCalculator.selectMiner(${miner.id})">
                    <div class="miner-header">
                        <h3>${miner.name}</h3>
                        <span class="manufacturer">${miner.algorithm}</span>
                    </div>
                    <div class="miner-specs">
                        <div class="spec-item">
                            <span class="spec-label">Hashrate:</span>
                            <span class="spec-value">${miner.hashrate} ${miner.hashrateUnit}</span>
                        </div>
                        <div class="spec-item">
                            <span class="spec-label">Power:</span>
                            <span class="spec-value">${miner.power}W</span>
                        </div>
                    </div>
                    <div class="miner-financial">
                        <div class="price">${formattedPrice}</div>
                    </div>
                    <div class="miner-actions">
                        <button class="btn btn-primary" onclick="event.stopPropagation(); profitabilityCalculator.selectMiner(${miner.id})">
                            <i class="fas fa-calculator"></i> Calculate
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }

    onCryptoChange(crypto) {
        // Filter miners for selected cryptocurrency
        const minerSelect = document.getElementById('minerSelect');
        const options = minerSelect.getElementsByTagName('option');
        
        for (let i = 0; i < options.length; i++) {
            if (options[i].value) {
                const shouldShow = !crypto || options[i].dataset.crypto === crypto;
                options[i].style.display = shouldShow ? '' : 'none';
            }
        }
        
        // Reset miner selection if it doesn't match the crypto
        const selectedMiner = this.minerData.find(m => m.id === parseInt(minerSelect.value));
        if (selectedMiner && selectedMiner.cryptocurrency !== crypto) {
            minerSelect.value = '';
        }
    }

    onMinerChange(minerId) {
        if (!minerId) return;
        
        const miner = this.minerData.find(m => m.id === parseInt(minerId));
        if (miner) {
            document.getElementById('hashrateInput').value = miner.hashrate;
            document.getElementById('hashrateUnit').value = miner.hashrateUnit;
            document.getElementById('powerInput').value = miner.power;
            document.getElementById('cryptoSelect').value = miner.cryptocurrency;
            
            // Trigger crypto change to filter properly
            this.onCryptoChange(miner.cryptocurrency);
            
            this.calculateProfitability();
        }
    }

    selectMiner(minerId) {
        document.getElementById('minerSelect').value = minerId;
        this.onMinerChange(minerId.toString());
        
        // Scroll to calculator
        document.querySelector('.calculator-section').scrollIntoView({ 
            behavior: 'smooth' 
        });
    }

    calculateProfitability() {
        // Get input values
        const hashrate = parseFloat(document.getElementById('hashrateInput').value) || 0;
        const hashrateUnit = document.getElementById('hashrateUnit').value;
        const power = parseFloat(document.getElementById('powerInput').value) || 0;
        const electricityCost = parseFloat(document.getElementById('electricityCost').value) || 0;
        const poolFees = parseFloat(document.getElementById('poolFees').value) || 0;
        const difficultyFactor = parseFloat(document.getElementById('difficultyFactor').value) || 0;
        const timePeriod = parseInt(document.getElementById('timePeriod').value) || 1;
        const cryptocurrency = document.getElementById('cryptoSelect').value;

        // Convert hashrate to H/s for calculations
        const hashrateInHs = this.convertToHs(hashrate, hashrateUnit);
        
        // Get cryptocurrency data
        const crypto = this.cryptoData[cryptocurrency];
        if (!crypto) return;

        // Calculate daily revenue
        const dailyRevenue = this.calculateDailyRevenue(hashrateInHs, crypto);
        const revenueAfterFees = dailyRevenue * (1 - poolFees / 100);

        // Calculate electricity cost
        const dailyElectricityCost = this.calculateElectricityCost(power, electricityCost);
        
        // Calculate daily profit
        const dailyProfit = revenueAfterFees - dailyElectricityCost;

        // Calculate period values
        const periodRevenue = revenueAfterFees * timePeriod;
        const periodElectricityCost = dailyElectricityCost * timePeriod;
        const periodProfit = dailyProfit * timePeriod;

        // Get miner price for ROI calculation
        const minerPrice = this.getSelectedMinerPrice();
        
        // Calculate ROI
        const roiPeriod = minerPrice > 0 ? Math.ceil(minerPrice / Math.max(dailyProfit, 0.01)) : 0;
        
        // Calculate profit margin
        const profitMargin = revenueAfterFees > 0 ? (dailyProfit / revenueAfterFees) * 100 : 0;
        
        // Calculate break-even price
        const breakEvenPrice = revenueAfterFees > 0 ? (dailyElectricityCost / revenueAfterFees) * crypto.price : 0;

        // Update results display
        this.updateResults({
            dailyRevenue: revenueAfterFees,
            dailyElectricityCost: dailyElectricityCost,
            dailyProfit: dailyProfit,
            roiPeriod: roiPeriod,
            profitMargin: profitMargin,
            breakEvenPrice: breakEvenPrice,
            periodRevenue: periodRevenue,
            periodElectricityCost: periodElectricityCost,
            periodProfit: periodProfit,
            poolFees: dailyRevenue * (poolFees / 100)
        });

        // Update chart
        this.updateProfitChart(periodProfit, periodRevenue, periodElectricityCost, timePeriod);
    }

    convertToHs(hashrate, unit) {
        const multipliers = {
            'H/s': 1,
            'KH/s': 1000,
            'MH/s': 1000000,
            'GH/s': 1000000000,
            'TH/s': 1000000000000,
            'PH/s': 1000000000000000
        };
        
        return hashrate * (multipliers[unit] || 1);
    }

    calculateDailyRevenue(hashrateInHs, crypto) {
        // Simplified revenue calculation
        const dailyBlocks = (24 * 60 * 60) / crypto.blockTime;
        const shareOfNetwork = hashrateInHs / crypto.networkHashrate;
        const dailyReward = dailyBlocks * crypto.blockReward * shareOfNetwork;
        
        return dailyReward * crypto.price;
    }

    calculateElectricityCost(power, costPerKwh) {
        const dailyKwh = (power * 24) / 1000;
        return dailyKwh * costPerKwh;
    }

    getSelectedMinerPrice() {
        const minerId = document.getElementById('minerSelect').value;
        if (!minerId) return 0;
        
        const miner = this.minerData.find(m => m.id === parseInt(minerId));
        return miner ? miner.price : 0;
    }

    updateResults(results) {
        const currency = this.currentCurrency;
        
        // Convert to current currency
        const dailyRevenue = window.cryptoService.convertPrice(results.dailyRevenue, currency);
        const dailyElectricityCost = window.cryptoService.convertPrice(results.dailyElectricityCost, currency);
        const dailyProfit = window.cryptoService.convertPrice(results.dailyProfit, currency);
        const periodRevenue = window.cryptoService.convertPrice(results.periodRevenue, currency);
        const periodElectricityCost = window.cryptoService.convertPrice(results.periodElectricityCost, currency);
        const periodProfit = window.cryptoService.convertPrice(results.periodProfit, currency);
        const poolFees = window.cryptoService.convertPrice(results.poolFees, currency);
        const breakEvenPrice = window.cryptoService.convertPrice(results.breakEvenPrice, currency);

        // Update main results
        document.getElementById('dailyRevenue').textContent = 
            window.cryptoService.formatCurrency(dailyRevenue, currency);
        document.getElementById('electricityCostResult').textContent = 
            window.cryptoService.formatCurrency(dailyElectricityCost, currency);
        document.getElementById('dailyProfit').textContent = 
            window.cryptoService.formatCurrency(dailyProfit, currency);
        document.getElementById('roiPeriod').textContent = 
            `${results.roiPeriod} days`;
        document.getElementById('profitMargin').textContent = 
            `${results.profitMargin.toFixed(1)}%`;
        document.getElementById('breakEvenPrice').textContent = 
            window.cryptoService.formatCurrency(breakEvenPrice, currency);

        // Update detailed breakdown
        document.getElementById('miningRevenue').textContent = 
            window.cryptoService.formatCurrency(periodRevenue, currency);
        document.getElementById('detailedElectricity').textContent = 
            window.cryptoService.formatCurrency(periodElectricityCost, currency);
        document.getElementById('poolFeesResult').textContent = 
            window.cryptoService.formatCurrency(poolFees, currency);
        document.getElementById('netProfit').textContent = 
            window.cryptoService.formatCurrency(periodProfit, currency);

        // Color code profit
        this.colorCodeProfit(dailyProfit);
    }

    colorCodeProfit(profit) {
        const elements = [
            document.getElementById('dailyProfit'),
            document.getElementById('netProfit')
        ];
        
        elements.forEach(element => {
            if (element) {
                element.style.color = profit >= 0 ? '#27ae60' : '#e74c3c';
            }
        });
    }

    updateProfitChart(profit, revenue, cost, timePeriod) {
        const ctx = document.getElementById('profitChart').getContext('2d');
        
        // Destroy existing chart
        if (this.chart) {
            this.chart.destroy();
        }

        const timeLabels = this.getTimeLabels(timePeriod);
        const revenueData = this.generateChartData(revenue, timePeriod, 0.1);
        const costData = this.generateChartData(cost, timePeriod, 0.1);
        const profitData = this.generateChartData(profit, timePeriod, 0.15);

        this.chart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: timeLabels,
                datasets: [
                    {
                        label: 'Revenue',
                        data: revenueData,
                        borderColor: '#27ae60',
                        backgroundColor: 'rgba(39, 174, 96, 0.1)',
                        fill: true,
                        tension: 0.4
                    },
                    {
                        label: 'Cost',
                        data: costData,
                        borderColor: '#e74c3c',
                        backgroundColor: 'rgba(231, 76, 60, 0.1)',
                        fill: true,
                        tension: 0.4
                    },
                    {
                        label: 'Profit',
                        data: profitData,
                        borderColor: '#3498db',
                        backgroundColor: 'rgba(52, 152, 219, 0.1)',
                        fill: true,
                        tension: 0.4
                    }
                ]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    title: {
                        display: true,
                        text: 'Profitability Projection'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return window.cryptoService.formatCurrency(value, profitabilityCalculator.currentCurrency);
                            }
                        }
                    }
                }
            }
        });
    }

    getTimeLabels(timePeriod) {
        const baseLabels = ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
        
        switch(timePeriod) {
            case 1: // Daily
                return ['Day 1'];
            case 7: // Weekly
                return baseLabels.slice(0, 1);
            case 30: // Monthly
                return baseLabels;
            case 365: // Yearly
                return ['Q1', 'Q2', 'Q3', 'Q4'];
            default:
                return baseLabels;
        }
    }

    generateChartData(baseValue, timePeriod, volatility) {
        const dataPoints = this.getTimeLabels(timePeriod).length;
        return Array.from({ length: dataPoints }, (_, i) => {
            const growth = 1 + (i * 0.05); // 5% growth per period
            const randomFactor = 1 + (Math.random() - 0.5) * volatility;
            return baseValue * growth * randomFactor;
        });
    }

    resetCalculator() {
        document.getElementById('hashrateInput').value = '';
        document.getElementById('powerInput').value = '';
        document.getElementById('electricityCost').value = '0.12';
        document.getElementById('poolFees').value = '1.0';
        document.getElementById('difficultyFactor').value = '5.0';
        document.getElementById('timePeriod').value = '7';
        document.getElementById('minerSelect').value = '';
        document.getElementById('cryptoSelect').value = 'bitcoin';
        
        this.onCryptoChange('bitcoin');
        this.calculateProfitability();
    }

    updateCurrencyDisplay() {
        const rateElement = document.getElementById('exchangeRate');
        const electricityUnit = document.getElementById('electricityUnit');
        
        if (rateElement && window.cryptoService) {
            const rate = window.cryptoService.currencyRates[this.currentCurrency] || 1;
            if (this.currentCurrency === 'PKR') {
                rateElement.textContent = `1 USD = ${rate.toFixed(2)} PKR`;
                electricityUnit.textContent = 'PKR/kWh';
            } else if (this.currentCurrency === 'AED') {
                rateElement.textContent = `1 USD = ${rate.toFixed(2)} AED`;
                electricityUnit.textContent = 'AED/kWh';
            } else {
                rateElement.textContent = `1 USD = ${rate.toFixed(2)} ${this.currentCurrency}`;
                electricityUnit.textContent = `${this.currentCurrency}/kWh`;
            }
        }
    }

    toggleTheme() {
        document.body.classList.toggle('dark-theme');
        const themeIcon = document.querySelector('#theme-toggle i');
        if (document.body.classList.contains('dark-theme')) {
            themeIcon.className = 'fas fa-sun';
            localStorage.setItem('theme', 'dark');
        } else {
            themeIcon.className = 'fas fa-moon';
            localStorage.setItem('theme', 'light');
        }
    }

    toggleMobileMenu() {
        document.querySelector('.nav-menu').classList.toggle('active');
        document.querySelector('.hamburger').classList.toggle('active');
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check for saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        document.querySelector('#theme-toggle i').className = 'fas fa-sun';
    }
});

// Initialize Profitability Calculator
const profitabilityCalculator = new ProfitabilityCalculator();
