// top-bar.js - Enhanced top bar functionality
class TopBar {
    constructor() {
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateExchangeRates();
        this.setupThemeToggle();
    }

    setupEventListeners() {
        // Language selector
        const languageSelector = document.getElementById('language-selector');
        if (languageSelector) {
            languageSelector.addEventListener('change', (e) => {
                this.changeLanguage(e.target.value);
            });
        }

        // Currency selector
        const currencySelector = document.getElementById('currency-selector');
        if (currencySelector) {
            currencySelector.addEventListener('change', (e) => {
                this.changeCurrency(e.target.value);
            });
        }

        // Search functionality
        const searchInput = document.getElementById('global-search');
        if (searchInput) {
            searchInput.addEventListener('input', this.handleSearch.bind(this));
            searchInput.addEventListener('focus', this.showSearchSuggestions.bind(this));
            searchInput.addEventListener('blur', this.hideSearchSuggestions.bind(this));
        }
    }

    async updateExchangeRates() {
        try {
            // Simulate API call for exchange rates
            const rates = {
                USD: 1,
                EUR: 0.85,
                GBP: 0.73,
                CNY: 6.45,
                RUB: 75.23,
                JPY: 110.45
            };

            const selectedCurrency = document.getElementById('currency-selector').value;
            const btcPrice = 45123.45; // This would come from API
            const convertedPrice = btcPrice * rates[selectedCurrency];
            
            const rateElement = document.querySelector('.exchange-rate');
            if (rateElement) {
                rateElement.textContent = `1 BTC = ${this.formatCurrency(convertedPrice, selectedCurrency)}`;
            }
        } catch (error) {
            console.log('Error updating exchange rates:', error);
        }
    }

    formatCurrency(amount, currency) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: currency,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount);
    }

    changeLanguage(language) {
        // In a real implementation, this would reload the page with selected language
        console.log('Changing language to:', language);
        // You would typically make an API call or reload the page with new language
    }

    changeCurrency(currency) {
        this.updateExchangeRates();
        // In a real implementation, this would update all prices on the page
        console.log('Changing currency to:', currency);
    }

    handleSearch(event) {
        const query = event.target.value.toLowerCase();
        if (query.length > 2) {
            this.showSearchSuggestions();
            // In a real implementation, you would fetch search results from an API
            this.updateSearchSuggestions(query);
        } else {
            this.hideSearchSuggestions();
        }
    }

    showSearchSuggestions() {
        const suggestions = document.querySelector('.search-suggestions');
        if (suggestions) {
            suggestions.style.display = 'block';
        }
    }

    hideSearchSuggestions() {
        // Small delay to allow clicking on suggestions
        setTimeout(() => {
            const suggestions = document.querySelector('.search-suggestions');
            if (suggestions) {
                suggestions.style.display = 'none';
            }
        }, 200);
    }

    updateSearchSuggestions(query) {
        const suggestions = document.querySelector('.search-suggestions');
        if (!suggestions) return;

        // Mock search results - in real implementation, this would come from an API
        const mockResults = [
            { type: 'miner', name: 'Antminer S19 XP', url: 'miner-details.html?id=1' },
            { type: 'miner', name: 'Whatsminer M50', url: 'miner-details.html?id=2' },
            { type: 'algorithm', name: 'SHA-256', url: 'most-profitable.html?algorithm=sha256' },
            { type: 'manufacturer', name: 'Bitmain', url: 'asic-miners.html?manufacturer=bitmain' }
        ];

        const filteredResults = mockResults.filter(item => 
            item.name.toLowerCase().includes(query)
        );

        suggestions.innerHTML = '';
        
        if (filteredResults.length > 0) {
            filteredResults.forEach(result => {
                const suggestion = document.createElement('a');
                suggestion.href = result.url;
                suggestion.className = 'search-suggestion';
                suggestion.innerHTML = `
                    <i class="fas fa-${this.getIconForType(result.type)}"></i>
                    <span>${result.name}</span>
                    <span class="suggestion-type">${result.type}</span>
                `;
                suggestions.appendChild(suggestion);
            });
        } else {
            suggestions.innerHTML = '<div class="no-results">No results found</div>';
        }
    }

    getIconForType(type) {
        const icons = {
            miner: 'microchip',
            algorithm: 'code',
            manufacturer: 'industry'
        };
        return icons[type] || 'search';
    }

    setupThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', this.toggleTheme.bind(this));
            
            // Check for saved theme preference
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'dark') {
                document.body.classList.add('dark-theme');
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            }
        }
    }

    toggleTheme() {
        const themeToggle = document.getElementById('theme-toggle');
        document.body.classList.toggle('dark-theme');
        
        if (document.body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    }
}

// Initialize top bar when page loads
document.addEventListener('DOMContentLoaded', function() {
    new TopBar();
});
