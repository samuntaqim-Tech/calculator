// ASIC Miner Value - Main Script
class MiningCalculator {
    constructor() {
        this.minerData = {
            's19xp': {
                name: 'Bitmain Antminer S19 XP',
                hashrate: 140,
                power: 3010,
                price: 6500,
                efficiency: 21.5
            },
            's19pro': {
                name: 'Bitmain Antminer S19 Pro',
                hashrate: 110,
                power: 3250,
                price: 3200,
                efficiency: 29.5
            },
            's19jpro': {
                name: 'Bitmain Antminer S19j Pro',
                hashrate: 104,
                power: 3068,
                price: 2800,
                efficiency: 29.5
            },
            'whatsm50': {
                name: 'Whatsminer M50',
                hashrate: 118,
                power: 3276,
                price: 3800,
                efficiency: 27.8
            },
            's19': {
                name: 'Bitmain Antminer S19',
                hashrate: 95,
                power: 3250,
                price: 2500,
                efficiency: 34.2
            }
        };
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadLiveData();
        this.calculateProfitability();
        
        // Update every 2 minutes
        setInterval(() => this.loadLiveData(), 120000);
    }

    setupEventListeners() {
        const calculateBtn = document.getElementById('calculateBtn');
        const minerSelect = document.getElementById('minerSelect');
        const inputs = ['hashrate', 'power', 'electricity', 'poolfee'];

        calculateBtn.addEventListener('click', () => this.calculateProfitability());
        
        minerSelect.addEventListener('change', (e) => {
            const miner = this.minerData[e.target.value];
            if (miner) {
                document.getElementById('hashrate').value = miner.hashrate;
                document.getElementById('power').value = miner.power;
                this.calculateProfitability();
            }
        });

        inputs.forEach(inputId => {
            const input = document.getElementById(inputId);
            input.addEventListener('input', () => this.calculateProfitability());
        });
    }

    loadLiveData() {
        // Simulate live data updates
        const btcPrice = 67000 + Math.random() * 2000 - 1000;
        const ethPrice = 3500 + Math.random() * 200 - 100;
        
        document.getElementById('dailyRevenue').textContent = '$' + (12 + Math.random() * 2).toFixed(2);
        document.getElementById('dailyProfit').textContent = '$' + (3 + Math.random() * 1).toFixed(2);
    }

    calculateProfitability() {
        const hashrate = parseFloat(document.getElementById('hashrate').value) || 0;
        const power = parseFloat(document.getElementById('power').value) || 0;
        const electricityCost = parseFloat(document.getElementById('electricity').value) || 0;
        const poolFee = parseFloat(document.getElementById('poolfee').value) || 0;

        if (hashrate <= 0 || power <= 0) return;

        // Calculate daily revenue (simplified)
        const dailyRevenue = (hashrate * 0.113).toFixed(2);
        const dailyCost = ((power * 24 * electricityCost) / 1000).toFixed(2);
        const dailyProfit = (dailyRevenue - dailyCost).toFixed(2);
        const monthlyProfit = (dailyProfit * 30).toFixed(2);
        const yearlyProfit = (dailyProfit * 365).toFixed(2);

        // Update results
        document.getElementById('dailyRevenue').textContent = '$' + dailyRevenue;
        document.getElementById('dailyCost').textContent = '$' + dailyCost;
        document.getElementById('dailyProfit').textContent = '$' + dailyProfit;
        document.getElementById('monthlyProfit').textContent = '$' + monthlyProfit;
        document.getElementById('yearlyProfit').textContent = '$' + yearlyProfit;

        // Calculate ROI
        const minerSelect = document.getElementById('minerSelect');
        const selectedMiner = this.minerData[minerSelect.value];
        if (selectedMiner && dailyProfit > 0) {
            const roiDays = Math.ceil(selectedMiner.price / dailyProfit);
            document.getElementById('roiPeriod').textContent = roiDays + ' days';
        }
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    window.miningCalculator = new MiningCalculator();
});

// AdSense initialization
(adsbygoogle = window.adsbygoogle || []).push({});
