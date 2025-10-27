// live-prices.js - Real-time cryptocurrency prices
class LivePrices {
    constructor() {
        this.btcPriceElement = document.getElementById('btc-price');
        this.ethPriceElement = document.getElementById('eth-price');
        this.lastUpdateElement = document.getElementById('last-update');
        this.init();
    }

    async init() {
        await this.updatePrices();
        // Update every 30 seconds
        setInterval(() => this.updatePrices(), 30000);
    }

    async updatePrices() {
        try {
            const prices = await this.fetchPrices();
            this.displayPrices(prices);
            this.updateTimestamp();
        } catch (error) {
            console.log('Error fetching prices:', error);
            this.useFallbackData();
        }
    }

    async fetchPrices() {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd');
        const data = await response.json();
        
        return {
            btc: data.bitcoin.usd,
            eth: data.ethereum.usd
        };
    }

    displayPrices(prices) {
        if (this.btcPriceElement) {
            this.btcPriceElement.textContent = this.formatPrice(prices.btc);
        }
        if (this.ethPriceElement) {
            this.ethPriceElement.textContent = this.formatPrice(prices.eth);
        }
    }

    formatPrice(price) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(price);
    }

    updateTimestamp() {
        if (this.lastUpdateElement) {
            const now = new Date();
            this.lastUpdateElement.textContent = `Last updated: ${now.toLocaleTimeString()}`;
        }
    }

    useFallbackData() {
        const fallbackPrices = {
            btc: 45000,
            eth: 2800
        };
        this.displayPrices(fallbackPrices);
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    new LivePrices();
});
