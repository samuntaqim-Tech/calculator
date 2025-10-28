// Real-time Crypto Data for Best Miners Profit
class CryptoDataService {
    constructor() {
        this.cryptoPrices = {};
        this.currencyRates = {};
        this.currentCurrency = 'USD';
        this.init();
    }

    async init() {
        await this.loadCurrencyRates();
        await this.loadCryptoPrices();
        this.updateUI();
        
        // Update every 5 minutes
        setInterval(() => this.loadCryptoPrices(), 300000);
        setInterval(() => this.updateUI(), 60000);
    }

    async loadCurrencyRates() {
        try {
            const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
            const data = await response.json();
            this.currencyRates = data.rates;
            
            // Ensure PKR and AED are available
            if (!this.currencyRates.PKR) this.currencyRates.PKR = 278.50;
            if (!this.currencyRates.AED) this.currencyRates.AED = 3.67;
        } catch (error) {
            this.setFallbackRates();
        }
    }

    setFallbackRates() {
        this.currencyRates = {
            USD: 1, EUR: 0.92, GBP: 0.79, 
            PKR: 278.50, AED: 3.67, CNY: 7.23, JPY: 148.50
        };
    }

    async loadCryptoPrices() {
        const coins = ['bitcoin', 'ethereum', 'litecoin'];
        try {
            const response = await fetch(
                `https://api.coingecko.com/api/v3/simple/price?ids=${coins.join(',')}&vs_currencies=usd`
            );
            this.cryptoPrices = await response.json();
        } catch (error) {
            this.setFallbackCryptoPrices();
        }
    }

    setFallbackCryptoPrices() {
        this.cryptoPrices = {
            bitcoin: { usd: 43250 },
            ethereum: { usd: 2340 },
            litecoin: { usd: 72.5 }
        };
    }

    convertPrice(priceUSD, currency) {
        const rate = this.currencyRates[currency] || 1;
        return priceUSD * rate;
    }

    formatCurrency(amount, currency) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount);
    }

    updateUI() {
        // Update crypto prices
        if (this.cryptoPrices.bitcoin) {
            const btcPrice = this.convertPrice(this.cryptoPrices.bitcoin.usd, this.currentCurrency);
            const ethPrice = this.convertPrice(this.cryptoPrices.ethereum.usd, this.currentCurrency);
            const ltcPrice = this.convertPrice(this.cryptoPrices.litecoin.usd, this.currentCurrency);
            
            document.getElementById('btcPrice').textContent = this.formatCurrency(btcPrice, this.currentCurrency);
            document.getElementById('ethPrice').textContent = this.formatCurrency(ethPrice, this.currentCurrency);
            document.getElementById('ltcPrice').textContent = this.formatCurrency(ltcPrice, this.currentCurrency);
        }
    }
}

// Initialize service
window.cryptoService = new CryptoDataService();
