// Main JavaScript for Best Miners Profit
document.addEventListener('DOMContentLoaded', function() {
    initCurrencySelector();
    loadFeaturedMiners();
    initQuickCalculator();
});

// Currency Management
function initCurrencySelector() {
    const currencySelect = document.getElementById('currencySelector');
    if (!currencySelect) return;

    const savedCurrency = localStorage.getItem('preferredCurrency') || 'USD';
    currencySelect.value = savedCurrency;

    currencySelect.addEventListener('change', function(e) {
        const selectedCurrency = e.target.value;
        localStorage.setItem('preferredCurrency', selectedCurrency);
        window.cryptoService.currentCurrency = selectedCurrency;
        window.cryptoService.updateUI();
        updateMinersDisplay();
    });
}

// Featured Miners Data
async function loadFeaturedMiners() {
    const miners = [
        {
            id: 1,
            name: "Bitmain Antminer S19 XP",
            algorithm: "SHA-256",
            hashrate: "140 TH/s",
            power: "3010W",
            price: 4200,
            dailyProfit: 12.50
        },
        {
            id: 2,
            name: "MicroBT Whatsminer M50",
            algorithm: "SHA-256",
            hashrate: "126 TH/s",
            power: "3276W",
            price: 3800,
            dailyProfit: 10.80
        },
        {
            id: 3,
            name: "Canaan Avalon A1266",
            algorithm: "SHA-256",
            hashrate: "110 TH/s",
            power: "3420W",
            price: 3200,
            dailyProfit: 8.95
        }
    ];

    displayFeaturedMiners(miners);
}

function displayFeaturedMiners(miners) {
    const container = document.getElementById('featuredMiners');
    if (!container) return;

    const currency = localStorage.getItem('preferredCurrency') || 'USD';
    
    container.innerHTML = miners.map(miner => {
        const price = window.cryptoService.convertPrice(miner.price, currency);
        const profit = window.cryptoService.convertPrice(miner.dailyProfit, currency);
        
        return `
            <div class="miner-card">
                <h3>${miner.name}</h3>
                <ul class="miner-specs">
                    <li><strong>Algorithm:</strong> ${miner.algorithm}</li>
                    <li><strong>Hashrate:</strong> ${miner.hashrate}</li>
                    <li><strong>Power:</strong> ${miner.power}</li>
                    <li><strong>Price:</strong> ${window.cryptoService.formatCurrency(price, currency)}</li>
                </ul>
                <div class="profitability">
                    Daily Profit: ${window.cryptoService.formatCurrency(profit, currency)}
                </div>
            </div>
        `;
    }).join('');
}

function updateMinersDisplay() {
    loadFeaturedMiners(); // Reload with new currency
}

// Quick Calculator
function initQuickCalculator() {
    const minerSelect = document.getElementById('minerSelect');
    const electricityInput = document.getElementById('electricityCost');
    
    if (!minerSelect) return;
    
    // Populate miner options
    const miners = [
        { name: "Antminer S19 XP", profit: 12.50 },
        { name: "Whatsminer M50", profit: 10.80 },
        { name: "Avalon A1266", profit: 8.95 }
    ];
    
    miners.forEach(miner => {
        const option = document.createElement('option');
        option.value = miner.profit;
        option.textContent = miner.name;
        minerSelect.appendChild(option);
    });
    
    // Add event listeners
    minerSelect.addEventListener('change', calculateQuickProfit);
    electricityInput.addEventListener('input', calculateQuickProfit);
}

function calculateQuickProfit() {
    const minerSelect = document.getElementById('minerSelect');
    const electricityInput = document.getElementById('electricityCost');
    const resultDiv = document.getElementById('quickResult');
    
    if (!minerSelect.value) return;
    
    const baseProfit = parseFloat(minerSelect.value);
    const electricityCost = parseFloat(electricityInput.value) || 0;
    const electricityCostDaily = electricityCost * 3.0 * 24; // Approximate for 3kW miner
    
    const netProfit = baseProfit - electricityCostDaily;
    const currency = localStorage.getItem('preferredCurrency') || 'USD';
    const formattedProfit = window.cryptoService.formatCurrency(
        window.cryptoService.convertPrice(netProfit, currency), 
        currency
    );
    
    resultDiv.innerHTML = netProfit > 0 ? 
        `💰 Daily Profit: <span style="color: green;">${formattedProfit}</span>` :
        `⚠️ Daily Loss: <span style="color: red;">${formattedProfit}</span>`;
}
