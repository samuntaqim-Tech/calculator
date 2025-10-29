// Main JavaScript for Best Miners Profit
document.addEventListener('DOMContentLoaded', function() {
    console.log('Website loaded successfully!');
    initCurrencySelector();
    loadLiveCryptoPrices();
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
        alert('Currency changed to: ' + selectedCurrency);
    });
}

// Live Crypto Prices
async function loadLiveCryptoPrices() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,litecoin&vs_currencies=usd&include_24hr_change=true');
        const data = await response.json();
        
        updateCryptoPrices(data);
    } catch (error) {
        console.error('Error loading crypto prices:', error);
        // Fallback prices
        const fallbackData = {
            bitcoin: { usd: 43250, usd_24h_change: 2.5 },
            ethereum: { usd: 2340, usd_24h_change: 1.8 },
            litecoin: { usd: 72.5, usd_24h_change: -0.5 }
        };
        updateCryptoPrices(fallbackData);
    }
}

function updateCryptoPrices(data) {
    const btcPrice = document.getElementById('btcPrice');
    const ethPrice = document.getElementById('ethPrice');
    const ltcPrice = document.getElementById('ltcPrice');
    
    if (btcPrice && data.bitcoin) {
        btcPrice.textContent = `$${data.bitcoin.usd.toLocaleString()}`;
        updatePriceChange('btcPrice', data.bitcoin.usd_24h_change);
    }
    
    if (ethPrice && data.ethereum) {
        ethPrice.textContent = `$${data.ethereum.usd.toLocaleString()}`;
        updatePriceChange('ethPrice', data.ethereum.usd_24h_change);
    }
    
    if (ltcPrice && data.litecoin) {
        ltcPrice.textContent = `$${data.litecoin.usd.toLocaleString()}`;
        updatePriceChange('ltcPrice', data.litecoin.usd_24h_change);
    }
}

function updatePriceChange(elementId, change) {
    const element = document.getElementById(elementId);
    const parent = element.parentElement;
    const changeElement = parent.querySelector('.crypto-change');
    
    if (changeElement) {
        changeElement.textContent = `${change > 0 ? '+' : ''}${change.toFixed(1)}%`;
        changeElement.className = `crypto-change ${change >= 0 ? 'positive' : 'negative'}`;
    }
}

// Featured Miners
function loadFeaturedMiners() {
    const featuredMiners = [
        {
            id: 1,
            name: "Bitmain Antminer S19 XP Hyd.",
            algorithm: "SHA-256",
            hashrate: "255 TH/s",
            power: "5304W",
            price: 4599,
            dailyProfit: 15.82
        },
        {
            id: 2,
            name: "MicroBT Whatsminer M50",
            algorithm: "SHA-256",
            hashrate: "126 TH/s",
            power: "3276W",
            price: 1899,
            dailyProfit: 4.15
        },
        {
            id: 3,
            name: "Bitmain Antminer L7",
            algorithm: "Scrypt",
            hashrate: "9500 MH/s",
            power: "3425W",
            price: 6999,
            dailyProfit: 18.25
        }
    ];

    displayFeaturedMiners(featuredMiners);
}

function displayFeaturedMiners(miners) {
    const grid = document.getElementById('featuredMinersGrid');
    if (!grid) return;

    grid.innerHTML = miners.map(miner => `
        <div class="miner-card">
            <div class="miner-header">
                <h3>${miner.name}</h3>
                <span class="algorithm-badge">${miner.algorithm}</span>
            </div>
            <div class="miner-specs">
                <div class="spec">
                    <span>Hashrate:</span>
                    <span>${miner.hashrate}</span>
                </div>
                <div class="spec">
                    <span>Power:</span>
                    <span>${miner.power}</span>
                </div>
                <div class="spec">
                    <span>Price:</span>
                    <span>$${miner.price.toLocaleString()}</span>
                </div>
            </div>
            <div class="miner-profit">
                <span class="profit-amount">$${miner.dailyProfit}/day</span>
                <a href="asic-miners.html" class="btn btn-primary">View Details</a>
            </div>
        </div>
    `).join('');
}

// Quick Calculator
function initQuickCalculator() {
    const minerSelect = document.getElementById('quickMinerSelect');
    if (!minerSelect) return;

    const miners = [
        { name: "Antminer S19 XP", profit: 12.50 },
        { name: "Whatsminer M50", profit: 4.15 },
        { name: "Antminer L7", profit: 18.25 },
        { name: "Avalon A1266", profit: 3.02 }
    ];

    miners.forEach(miner => {
        const option = document.createElement('option');
        option.value = miner.profit;
        option.textContent = miner.name;
        minerSelect.appendChild(option);
    });
}

function calculateQuickProfit() {
    const minerSelect = document.getElementById('quickMinerSelect');
    const electricityInput = document.getElementById('quickElectricity');
    const resultDiv = document.getElementById('quickResult');
    
    if (!minerSelect.value || !resultDiv) {
        alert('Please select a miner first!');
        return;
    }
    
    const baseProfit = parseFloat(minerSelect.value);
    const electricityCost = parseFloat(electricityInput.value) || 0;
    const electricityCostDaily = electricityCost * 3.0 * 24;
    
    const netProfit = baseProfit - electricityCostDaily;
    
    resultDiv.style.display = 'block';
    
    if (netProfit > 0) {
        resultDiv.innerHTML = `💰 Daily Profit: <strong>$${netProfit.toFixed(2)}</strong>`;
        resultDiv.style.background = '#48bb78';
    } else {
        resultDiv.innerHTML = `⚠️ Daily Loss: <strong>$${Math.abs(netProfit).toFixed(2)}</strong>`;
        resultDiv.style.background = '#e74c3c';
    }
}

// Simple function to show loading works
function testFunction() {
    console.log('JavaScript is working!');
}
testFunction();
