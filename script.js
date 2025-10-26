// script.js - Main functionality for Best Miner Profit

// Global configurations
const CONFIG = {
    adsenseId: 'ca-pub-4103650365925612',
    currencies: ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY', 'INR', 'RUB', 'BRL', 'MXN', 'SGD', 'HKD', 'KRW', 'TRY', 'IDR', 'ZAR', 'SEK', 'NOK', 'BTC', 'ETH'],
    languages: [
        { code: 'en', name: 'English' },
        { code: 'es', name: 'Español' },
        { code: 'zh', name: '中文' },
        { code: 'ru', name: 'Русский' },
        { code: 'fr', name: 'Français' },
        { code: 'de', name: 'Deutsch' },
        { code: 'ja', name: '日本語' },
        { code: 'ko', name: '한국어' },
        { code: 'ar', name: 'العربية' },
        { code: 'pt', name: 'Português' },
        { code: 'it', name: 'Italiano' },
        { code: 'nl', name: 'Nederlands' },
        { code: 'pl', name: 'Polski' },
        { code: 'tr', name: 'Türkçe' },
        { code: 'vi', name: 'Tiếng Việt' },
        { code: 'th', name: 'ไทย' },
        { code: 'hi', name: 'हिन्दी' },
        { code: 'bn', name: 'বাংলা' }
    ]
};

// Crypto data
const CRYPTO_DATA = [
    { symbol: 'BTC', name: 'Bitcoin', price: 45231.45, change: 2.34 },
    { symbol: 'ETH', name: 'Ethereum', price: 2456.78, change: 1.23 },
    { symbol: 'LTC', name: 'Litecoin', price: 68.90, change: -0.45 },
    { symbol: 'BCH', name: 'Bitcoin Cash', price: 234.56, change: 0.89 },
    { symbol: 'XRP', name: 'Ripple', price: 0.5678, change: 1.45 },
    { symbol: 'ADA', name: 'Cardano', price: 0.4567, change: -1.23 },
    { symbol: 'DOT', name: 'Polkadot', price: 6.78, change: 2.34 },
    { symbol: 'LINK', name: 'Chainlink', price: 12.34, change: 0.56 }
];

// Initialize application
class BestMinerProfit {
    constructor() {
        this.currentCurrency = 'USD';
        this.currentLanguage = 'en';
        this.exchangeRates = {};
        this.init();
    }

    async init() {
        this.setupEventListeners();
        this.loadCryptoData();
        this.loadExchangeRates();
        this.updateUI();
        this.initializeAdSense();
    }

    setupEventListeners() {
        // Language selector
        document.getElementById('language-selector')?.addEventListener('change', (e) => {
            this.currentLanguage = e.target.value;
            this.updateUI();
        });

        // Currency selector
        document.getElementById('base-currency')?.addEventListener('change', (e) => {
            this.currentCurrency = e.target.value;
            this.updateCurrencyDisplay();
        });

        // Global search
        document.getElementById('global-search')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.globalSearch();
        });
    }

    loadCryptoData() {
        this.updateCryptoTicker();
        setInterval(() => this.updateCryptoTicker(), 30000); // Update every 30 seconds
    }

    updateCryptoTicker() {
        const ticker = document.getElementById('crypto-ticker');
        if (!ticker) return;

        ticker.innerHTML = CRYPTO_DATA.map(crypto => `
            <div class="ticker-item">
                <span class="ticker-symbol">${crypto.symbol}</span>
                <span class="ticker-price">$${crypto.price.toLocaleString()}</span>
                <span class="ticker-change ${crypto.change >= 0 ? 'positive' : 'negative'}">
                    ${crypto.change >= 0 ? '+' : ''}${crypto.change}%
                </span>
            </div>
        `).join('');
    }

    async loadExchangeRates() {
        // Simulate API call - in production, use real exchange rate API
        this.exchangeRates = {
            USD: 1, EUR: 0.92, GBP: 0.79, JPY: 150.23, CAD: 1.35, AUD: 1.52,
            CHF: 0.88, CNY: 7.23, INR: 83.12, RUB: 92.45, BRL: 4.98, MXN: 16.78,
            SGD: 1.34, HKD: 7.82, KRW: 1332.45, TRY: 32.12, IDR: 15678.90,
            ZAR: 18.67, SEK: 10.45, NOK: 10.67, BTC: 0.000022, ETH: 0.00041
        };
    }

    updateUI() {
        this.updateCurrencyDisplay();
        this.updateLanguageDisplay();
    }

    updateCurrencyDisplay() {
        // Update all currency displays on the page
        document.querySelectorAll('[data-currency]').forEach(element => {
            const value = parseFloat(element.dataset.value) || 0;
            const converted = value * (this.exchangeRates[this.currentCurrency] || 1);
            element.textContent = this.formatCurrency(converted, this.currentCurrency);
        });
    }

    updateLanguageDisplay() {
        // Update language-specific content
        // This would typically load translations from a language file
        console.log(`Language changed to: ${this.currentLanguage}`);
    }

    formatCurrency(amount, currency) {
        if (currency === 'BTC') return `₿${amount.toFixed(8)}`;
        if (currency === 'ETH') return `Ξ${amount.toFixed(6)}`;
        
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency
        }).format(amount);
    }

    globalSearch() {
        const query = document.getElementById('global-search')?.value.trim();
        if (query) {
            window.location.href = `asic-miners.html?search=${encodeURIComponent(query)}`;
        }
    }

    initializeAdSense() {
        // AdSense is initialized in adsense.js
        console.log('AdSense integration ready');
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    window.app = new BestMinerProfit();
});

// Utility functions
function formatHashrate(hashrate) {
    if (hashrate >= 1000000) return `${(hashrate / 1000000).toFixed(2)} PH/s`;
    if (hashrate >= 1000) return `${(hashrate / 1000).toFixed(2)} TH/s`;
    return `${hashrate} GH/s`;
}

function calculateProfitability(hashrate, power, electricityCost) {
    // Simplified calculation - in production, use real mining data
    const dailyRevenue = (hashrate * 0.00000002) * 45000; // BTC price
    const dailyCost = (power * 24 * electricityCost) / 1000;
    return dailyRevenue - dailyCost;
}

// SEO optimization
document.addEventListener('DOMContentLoaded', function() {
    // Add structured data
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Best Miner Profit",
        "url": "https://bestminerprofit.com",
        "potentialAction": {
            "@type": "SearchAction",
            "target": "https://bestminerprofit.com/asic-miners.html?search={search_term_string}",
            "query-input": "required name=search_term_string"
        }
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);
});
