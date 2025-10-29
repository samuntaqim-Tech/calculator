// Enhanced Comparison Tool - Updated for Best Miners Profit
class ComparisonTool {
    constructor() {
        this.selectedMiners = [];
        this.comparisonData = [];
        this.currentCurrency = 'USD';
        this.charts = {};
        
        this.init();
    }

    async init() {
        await this.loadComparisonData();
        this.setupEventListeners();
        this.loadStoredComparison();
        this.updateDisplay();
        this.updateCurrencyDisplay();
    }

    async loadComparisonData() {
        // Load data from both ASIC and GPU sources
        try {
            // Try to load from existing data sources
            if (typeof asicManager !== 'undefined') {
                this.comparisonData = this.comparisonData.concat(asicManager.miners.map(miner => ({
                    ...miner,
                    type: 'ASIC',
                    id: `asic-${miner.id}`
                })));
            }
            
            if (typeof gpuManager !== 'undefined') {
                this.comparisonData = this.comparisonData.concat(gpuManager.gpus.map(gpu => ({
                    ...gpu,
                    type: 'GPU',
                    id: `gpu-${gpu.id}`
                })));
            }

            // Fallback data if managers aren't available
            if (this.comparisonData.length === 0) {
                this.comparisonData = this.getFallbackData();
            }
        } catch (error) {
            console.error('Error loading comparison data:', error);
            this.comparisonData = this.getFallbackData();
        }
    }

    getFallbackData() {
        return [
            // ASIC Miners
            {
                id: 'asic-1',
                type: 'ASIC',
                name: "Bitmain Antminer S19 XP Hyd.",
                manufacturer: "Bitmain",
                algorithm: "SHA-256",
                hashrate: "255 TH/s",
                power: "5304W",
                efficiency: "20.8 J/TH",
                noise: "75 db",
                weight: "14500 g",
                release: "2022",
                price: 4599,
                dailyProfit: 15.82,
                roi: 290,
                popularity: 95
            },
            {
                id: 'asic-2',
                type: 'ASIC',
                name: "MicroBT Whatsminer M50",
                manufacturer: "MicroBT",
                algorithm: "SHA-256",
                hashrate: "126 TH/s",
                power: "3276W",
                efficiency: "26 J/TH",
                noise: "75 db",
                weight: "12600 g",
                release: "2022",
                price: 1899,
                dailyProfit: 4.15,
                roi: 457,
                popularity: 88
            },
            // GPU Miners
            {
                id: 'gpu-1',
                type: 'GPU',
                name: "NVIDIA GeForce RTX 4090",
                manufacturer: "NVIDIA",
                algorithm: "Ethash",
                hashrate: "140 MH/s",
                power: "300W",
                efficiency: "0.47 MH/J",
                memory: "24GB GDDR6X",
                release: "2022",
                price: 1599,
                dailyProfit: 2.85,
                roi: 561,
                popularity: 95
            },
            {
                id: 'gpu-2',
                type: 'GPU',
                name: "NVIDIA GeForce RTX 3080",
                manufacturer: "NVIDIA",
                algorithm: "Ethash",
                hashrate: "100 MH/s",
                power: "220W",
                efficiency: "0.45 MH/J",
                memory: "10GB GDDR6X",
                release: "2020",
                price: 699,
                dailyProfit: 1.95,
                roi: 359,
                popularity: 94
            }
        ];
    }

    setupEventListeners() {
        // Clear all button
        const clearAllBtn = document.getElementById('clearAll');
        if (clearAllBtn) {
            clearAllBtn.addEventListener('click', () => {
                this.clearAll();
            });
        }

        // Add miner button
        const addMinerBtn = document.getElementById('addMiner');
        if (addMinerBtn) {
            addMinerBtn.addEventListener('click', () => {
                this.showAddMinerModal();
            });
        }

        // Export results
        const exportBtn = document.getElementById('exportResults');
        if (exportBtn) {
            exportBtn.addEventListener('click', () => {
                this.exportToCSV();
            });
        }

        // Share comparison
        const shareBtn = document.getElementById('shareComparison');
        if (shareBtn) {
            shareBtn.addEventListener('click', () => {
                this.shareComparison();
            });
        }

        // Currency selector
        const currencySelect = document.getElementById('currencySelector');
        if (currencySelect) {
            currencySelect.addEventListener('change', (e) => {
                this.currentCurrency = e.target.value;
                this.updateCurrencyDisplay();
                this.updateDisplay();
            });
        }

        // Global search
        const globalSearch = document.getElementById('global-search');
        if (globalSearch) {
            globalSearch.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });
        }

        // Theme toggle
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }

        // Mobile menu
        const hamburger = document.querySelector('.hamburger');
        if (hamburger) {
            hamburger.addEventListener('click', () => {
                this.toggleMobileMenu();
            });
        }
    }

    loadStoredComparison() {
        try {
            const savedComparison = localStorage.getItem('minerComparison');
            const savedGpuComparison = localStorage.getItem('gpuComparison');
            
            if (savedComparison) {
                const minerIds = JSON.parse(savedComparison);
                minerIds.forEach(minerId => {
                    const miner = this.comparisonData.find(m => m.id === `asic-${minerId}`);
                    if (miner && !this.selectedMiners.some(m => m.id === miner.id)) {
                        this.selectedMiners.push(miner);
                    }
                });
            }

            if (savedGpuComparison) {
                const gpuIds = JSON.parse(savedGpuComparison);
                gpuIds.forEach(gpuId => {
                    const miner = this.comparisonData.find(m => m.id === `gpu-${gpuId}`);
                    if (miner && !this.selectedMiners.some(m => m.id === miner.id)) {
                        this.selectedMiners.push(miner);
                    }
                });
            }
        } catch (error) {
            console.error('Error loading stored comparison:', error);
        }
    }

    addMiner(miner) {
        // Check if miner is already in comparison
        if (this.selectedMiners.some(m => m.id === miner.id)) {
            this.showNotification('Miner already in comparison!');
            return false;
        }

        // Limit to 4 miners for better comparison
        if (this.selectedMiners.length >= 4) {
            this.showNotification('Maximum 4 miners can be compared at once');
            return false;
        }

        this.selectedMiners.push(miner);
        this.saveComparison();
        this.updateDisplay();
        this.showNotification(`${miner.name} added to comparison`);
        return true;
    }

    addMinerById(minerId) {
        const miner = this.comparisonData.find(m => m.id === minerId);
        if (miner) {
            this.addMiner(miner);
        }
    }

    removeMiner(minerId) {
        this.selectedMiners = this.selectedMiners.filter(miner => miner.id !== minerId);
        this.saveComparison();
        this.updateDisplay();
        this.showNotification('Miner removed from comparison');
    }

    clearAll() {
        this.selectedMiners = [];
        this.saveComparison();
        this.updateDisplay();
        this.showNotification('All miners removed from comparison');
    }

    saveComparison() {
        try {
            const asicIds = this.selectedMiners
                .filter(miner => miner.type === 'ASIC')
                .map(miner => miner.id.replace('asic-', ''));
            
            const gpuIds = this.selectedMiners
                .filter(miner => miner.type === 'GPU')
                .map(miner => miner.id.replace('gpu-', ''));

            if (asicIds.length > 0) {
                localStorage.setItem('minerComparison', JSON.stringify(asicIds));
            } else {
                localStorage.removeItem('minerComparison');
            }

            if (gpuIds.length > 0) {
                localStorage.setItem('gpuComparison', JSON.stringify(gpuIds));
            } else {
                localStorage.removeItem('gpuComparison');
            }
        } catch (error) {
            console.error('Error saving comparison:', error);
        }
    }

    updateDisplay() {
        this.updateSelectedMiners();
        this.updateComparisonTable();
        this.updateCharts();
        this.updateWinnerAnalysis();
        this.updateQuickAdd();
        this.updateRecommended();
    }

    updateSelectedMiners() {
        const container = document.getElementById('selectedMiners');
        const resultsSection = document.getElementById('comparisonResults');

        if (!container) return;

        if (this.selectedMiners.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-exchange-alt"></i>
                    <h3>No Miners Selected</h3>
                    <p>Add miners from ASIC or GPU pages to start comparing</p>
                    <div class="empty-actions">
                        <a href="asic-miners.html" class="btn btn-primary">
                            <i class="fas fa-microchip"></i> Browse ASIC Miners
                        </a>
                        <a href="gpu-miners.html" class="btn btn-primary">
                            <i class="fas fa-desktop"></i> Browse GPU Miners
                        </a>
                    </div>
                </div>
            `;
            if (resultsSection) {
                resultsSection.style.display = 'none';
            }
            return;
        }

        // Update selected miners display
        container.innerHTML = this.selectedMiners.map(miner => {
            const price = this.convertPrice(miner.price);
            const formattedPrice = this.formatCurrency(price);
            
            return `
                <div class="selected-miner-card" data-id="${miner.id}">
                    <div class="miner-preview">
                        <div class="miner-preview-header">
                            <h4>${miner.name}</h4>
                            <button class="remove-miner" onclick="comparisonTool.removeMiner('${miner.id}')">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                        <div class="miner-preview-specs">
                            <div class="spec">
                                <span>Type:</span>
                                <span>${miner.type}</span>
                            </div>
                            <div class="spec">
                                <span>Hashrate:</span>
                                <span>${miner.hashrate}</span>
                            </div>
                            <div class="spec">
                                <span>Price:</span>
                                <span>${formattedPrice}</span>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        // Show results section
        if (resultsSection) {
            resultsSection.style.display = 'block';
        }
    }

    updateComparisonTable() {
        const table = document.getElementById('comparisonTable');
        if (!table) return;

        const thead = table.querySelector('thead');
        const tbody = table.querySelector('tbody');

        // Clear existing content
        thead.innerHTML = '<tr><th class="spec-header">Specification</th></tr>';
        tbody.innerHTML = '';

        // Add miner headers
        this.selectedMiners.forEach(miner => {
            const price = this.convertPrice(miner.price);
            const formattedPrice = this.formatCurrency(price);
            
            const th = document.createElement('th');
            th.className = 'miner-header';
            th.innerHTML = `
                <div class="miner-header-content">
                    <h4>${miner.name}</h4>
                    <span class="miner-type ${miner.type.toLowerCase()}">${miner.type}</span>
                    <div class="miner-price">${formattedPrice}</div>
                </div>
            `;
            thead.querySelector('tr').appendChild(th);
        });

        // Define comparison rows
        const comparisonRows = [
            { label: 'Manufacturer', key: 'manufacturer' },
            { label: 'Algorithm', key: 'algorithm' },
            { label: 'Hashrate', key: 'hashrate' },
            { label: 'Power Consumption', key: 'power' },
            { label: 'Efficiency', key: 'efficiency' },
            { label: 'Memory', key: 'memory', optional: true },
            { label: 'Noise Level', key: 'noise', optional: true },
            { label: 'Weight', key: 'weight', optional: true },
            { label: 'Release Year', key: 'release' },
            { label: 'Daily Profit', key: 'dailyProfit', financial: true },
            { label: 'ROI Period', key: 'roi', financial: true },
            { label: 'Popularity', key: 'popularity', percentage: true }
        ];

        // Add rows to table
        comparisonRows.forEach(row => {
            // Skip optional rows if no miner has the data
            if (row.optional && !this.selectedMiners.some(miner => miner[row.key])) {
                return;
            }

            const tr = document.createElement('tr');
            const tdLabel = document.createElement('td');
            tdLabel.className = 'spec-label';
            tdLabel.textContent = row.label;
            tr.appendChild(tdLabel);

            this.selectedMiners.forEach(miner => {
                const td = document.createElement('td');
                td.className = 'spec-value';
                
                let value = miner[row.key];
                if (value === undefined || value === null) {
                    value = 'N/A';
                } else if (row.financial) {
                    if (row.key === 'dailyProfit') {
                        const profit = this.convertPrice(value);
                        value = this.formatCurrency(profit);
                    } else if (row.key === 'roi') {
                        value = `${value} days`;
                    }
                } else if (row.percentage) {
                    value = `${value}%`;
                }

                td.textContent = value;
                tr.appendChild(td);
            });

            tbody.appendChild(tr);
        });
    }

    updateCharts() {
        if (typeof Chart === 'undefined') {
            console.warn('Chart.js not loaded');
            return;
        }

        this.createProfitabilityChart();
        this.createEfficiencyChart();
        this.createRoiChart();
        this.createPricePerformanceChart();
    }

    createProfitabilityChart() {
        const ctx = document.getElementById('profitabilityChart');
        if (!ctx) return;
        
        // Destroy existing chart
        if (this.charts.profitability) {
            this.charts.profitability.destroy();
        }

        const labels = this.selectedMiners.map(miner => 
            miner.name.length > 15 ? miner.name.substring(0, 15) + '...' : miner.name
        );
        
        const profits = this.selectedMiners.map(miner => this.convertPrice(miner.dailyProfit));

        this.charts.profitability = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: `Daily Profit (${this.currentCurrency})`,
                    data: profits,
                    backgroundColor: '#27ae60',
                    borderColor: '#219653',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: 'Daily Profit Comparison'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: (value) => this.formatCurrency(value)
                        }
                    }
                }
            }
        });
    }

    createEfficiencyChart() {
        const ctx = document.getElementById('efficiencyChart');
        if (!ctx) return;
        
        if (this.charts.efficiency) {
            this.charts.efficiency.destroy();
        }

        const labels = this.selectedMiners.map(miner => 
            miner.name.length > 15 ? miner.name.substring(0, 15) + '...' : miner.name
        );
        
        const efficiencies = this.selectedMiners.map(miner => {
            const eff = parseFloat(miner.efficiency);
            return isNaN(eff) ? 0 : eff;
        });

        this.charts.efficiency = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Efficiency',
                    data: efficiencies,
                    backgroundColor: '#3498db',
                    borderColor: '#2980b9',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: 'Efficiency Comparison'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    createRoiChart() {
        const ctx = document.getElementById('roiChart');
        if (!ctx) return;
        
        if (this.charts.roi) {
            this.charts.roi.destroy();
        }

        const labels = this.selectedMiners.map(miner => 
            miner.name.length > 15 ? miner.name.substring(0, 15) + '...' : miner.name
        );
        
        const roiData = this.selectedMiners.map(miner => miner.roi);

        this.charts.roi = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'ROI (Days)',
                    data: roiData,
                    backgroundColor: '#e74c3c',
                    borderColor: '#c0392b',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: 'ROI Period Comparison'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    createPricePerformanceChart() {
        const ctx = document.getElementById('pricePerformanceChart');
        if (!ctx) return;
        
        if (this.charts.pricePerformance) {
            this.charts.pricePerformance.destroy();
        }

        const data = this.selectedMiners.map(miner => ({
            x: this.convertPrice(miner.price),
            y: this.convertPrice(miner.dailyProfit),
            name: miner.name
        }));

        this.charts.pricePerformance = new Chart(ctx, {
            type: 'scatter',
            data: {
                datasets: [{
                    label: 'Price vs Performance',
                    data: data,
                    backgroundColor: '#9b59b6',
                    borderColor: '#8e44ad',
                    borderWidth: 1,
                    pointRadius: 8,
                    pointHoverRadius: 10
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    },
                    title: {
                        display: true,
                        text: 'Price vs Performance'
                    },
                    tooltip: {
                        callbacks: {
                            label: (context) => {
                                const point = data[context.dataIndex];
                                return [
                                    point.name,
                                    `Price: ${this.formatCurrency(point.x)}`,
                                    `Daily Profit: ${this.formatCurrency(point.y)}`
                                ];
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: `Price (${this.currentCurrency})`
                        },
                        ticks: {
                            callback: (value) => this.formatCurrency(value)
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: `Daily Profit (${this.currentCurrency})`
                        },
                        ticks: {
                            callback: (value) => this.formatCurrency(value)
                        }
                    }
                }
            }
        });
    }

    updateWinnerAnalysis() {
        const container = document.getElementById('winnerCards');
        if (!container) return;
        
        if (this.selectedMiners.length < 2) {
            container.innerHTML = '<p>Add more miners to see winner analysis</p>';
            return;
        }

        // Find winners in different categories
        const bestProfit = [...this.selectedMiners].sort((a, b) => b.dailyProfit - a.dailyProfit)[0];
        const bestEfficiency = [...this.selectedMiners].sort((a, b) => {
            const effA = parseFloat(a.efficiency);
            const effB = parseFloat(b.efficiency);
            return (effB || 0) - (effA || 0);
        })[0];
        const bestROI = [...this.selectedMiners].sort((a, b) => a.roi - b.roi)[0];
        const bestValue = [...this.selectedMiners].sort((a, b) => {
            const valueA = a.dailyProfit / a.price;
            const valueB = b.dailyProfit / b.price;
            return valueB - valueA;
        })[0];

        container.innerHTML = `
            <div class="winner-card">
                <div class="winner-icon" style="background: #27ae60;">
                    <i class="fas fa-money-bill-wave"></i>
                </div>
                <div class="winner-content">
                    <h4>Highest Profit</h4>
                    <div class="winner-name">${bestProfit.name}</div>
                    <div class="winner-value">
                        ${this.formatCurrency(this.convertPrice(bestProfit.dailyProfit))}/day
                    </div>
                </div>
            </div>
            <div class="winner-card">
                <div class="winner-icon" style="background: #3498db;">
                    <i class="fas fa-bolt"></i>
                </div>
                <div class="winner-content">
                    <h4>Most Efficient</h4>
                    <div class="winner-name">${bestEfficiency.name}</div>
                    <div class="winner-value">${bestEfficiency.efficiency}</div>
                </div>
            </div>
            <div class="winner-card">
                <div class="winner-icon" style="background: #e74c3c;">
                    <i class="fas fa-calendar-day"></i>
                </div>
                <div class="winner-content">
                    <h4>Fastest ROI</h4>
                    <div class="winner-name">${bestROI.name}</div>
                    <div class="winner-value">${bestROI.roi} days</div>
                </div>
            </div>
            <div class="winner-card">
                <div class="winner-icon" style="background: #9b59b6;">
                    <i class="fas fa-chart-line"></i>
                </div>
                <div class="winner-content">
                    <h4>Best Value</h4>
                    <div class="winner-name">${bestValue.name}</div>
                    <div class="winner-value">
                        ${(bestValue.dailyProfit / bestValue.price * 100).toFixed(2)}% ROI/day
                    </div>
                </div>
            </div>
        `;
    }

    updateQuickAdd() {
        const grid = document.getElementById('quickAddGrid');
        if (!grid) return;

        const popularMiners = this.comparisonData
            .filter(miner => miner.popularity > 90)
            .filter(miner => !this.selectedMiners.some(selected => selected.id === miner.id))
            .slice(0, 6);
        
        grid.innerHTML = popularMiners.map(miner => {
            const price = this.convertPrice(miner.price);
            const formattedPrice = this.formatCurrency(price);
            
            return `
                <div class="quick-add-card" data-id="${miner.id}">
                    <div class="quick-add-header">
                        <h4>${miner.name}</h4>
                        <span class="miner-type ${miner.type.toLowerCase()}">${miner.type}</span>
                    </div>
                    <div class="quick-add-specs">
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
                            <span>${formattedPrice}</span>
                        </div>
                    </div>
                    <button class="btn btn-primary btn-sm" onclick="comparisonTool.addMinerById('${miner.id}')">
                        <i class="fas fa-plus"></i> Add to Compare
                    </button>
                </div>
            `;
        }).join('');
    }

    updateRecommended() {
        const grid = document.getElementById('recommendedGrid');
        if (!grid) return;

        const recommendedMiners = this.comparisonData
            .filter(miner => !this.selectedMiners.some(selected => selected.id === miner.id))
            .sort((a, b) => b.popularity - a.popularity)
            .slice(0, 4);
        
        grid.innerHTML = recommendedMiners.map(miner => {
            const price = this.convertPrice(miner.price);
            const dailyProfit = this.convertPrice(miner.dailyProfit);
            const formattedPrice = this.formatCurrency(price);
            const formattedProfit = this.formatCurrency(dailyProfit);
            
            return `
                <div class="miner-card" data-id="${miner.id}">
                    <div class="miner-header">
                        <h3>${miner.name}</h3>
                        <span class="manufacturer ${miner.manufacturer.toLowerCase()}">${miner.manufacturer}</span>
                    </div>
                    <div class="miner-specs">
                        <div class="spec-item">
                            <span class="spec-label">Type:</span>
                            <span class="spec-value">${miner.type}</span>
                        </div>
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
                    </div>
                    <div class="miner-financial">
                        <div class="price">${formattedPrice}</div>
                        <div class="profitability">
                            <span class="profit-label">Daily Profit:</span>
                            <span class="profit-value">${formattedProfit}</span>
                        </div>
                    </div>
                    <div class="miner-actions">
                        <button class="btn btn-primary" onclick="comparisonTool.addMinerById('${miner.id}')">
                            <i class="fas fa-plus"></i> Add to Compare
                        </button>
                    </div>
                </div>
            `;
        }).join('');
    }

    // Utility methods
    convertPrice(priceUSD) {
        if (typeof window.cryptoService !== 'undefined') {
            return window.cryptoService.convertPrice(priceUSD, this.currentCurrency);
        }
        
        // Fallback conversion rates
        const rates = {
            USD: 1,
            EUR: 0.92,
            GBP: 0.79,
            PKR: 278.50,
            AED: 3.67,
            CNY: 7.23,
            JPY: 148.50
        };
        
        return priceUSD * (rates[this.currentCurrency] || 1);
    }

    formatCurrency(amount) {
        if (typeof window.cryptoService !== 'undefined') {
            return window.cryptoService.formatCurrency(amount, this.currentCurrency);
        }
        
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: this.currentCurrency,
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(amount);
    }

    exportToCSV() {
        if (this.selectedMiners.length === 0) {
            this.showNotification('No miners to export');
            return;
        }

        let csv = 'Specification,' + this.selectedMiners.map(m => m.name).join(',') + '\n';
        
        const rows = [
            ['Manufacturer', 'manufacturer'],
            ['Algorithm', 'algorithm'],
            ['Hashrate', 'hashrate'],
            ['Power Consumption', 'power'],
            ['Efficiency', 'efficiency'],
            ['Price', 'price', true],
            ['Daily Profit', 'dailyProfit', true],
            ['ROI Period', 'roi'],
            ['Popularity', 'popularity']
        ];

        rows.forEach(([label, key, isFinancial]) => {
            let row = label;
            this.selectedMiners.forEach(miner => {
                let value = miner[key];
                if (isFinancial) {
                    value = this.convertPrice(value);
                }
                row += ',' + (value || 'N/A');
            });
            csv += row + '\n';
        });

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'miner-comparison.csv';
        a.click();
        window.URL.revokeObjectURL(url);

        this.showNotification('Comparison exported to CSV');
    }

    shareComparison() {
        if (this.selectedMiners.length === 0) {
            this.showNotification('No miners to share');
            return;
        }

        const minerNames = this.selectedMiners.map(m => m.name).join(', ');
        const text = `Check out this miner comparison on Best Miners Profit: ${minerNames}`;
        
        if (navigator.share) {
            navigator.share({
                title: 'Miner Comparison - Best Miners Profit',
                text: text,
                url: window.location.href
            });
        } else {
            // Fallback: copy to clipboard
            navigator.clipboard.writeText(text + '\n' + window.location.href);
            this.showNotification('Comparison link copied to clipboard!');
        }
    }

    showAddMinerModal() {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Add Miner to Comparison</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <p>Browse our miner listings to add to comparison:</p>
                    <div class="modal-actions">
                        <a href="asic-miners.html" class="btn btn-primary">
                            <i class="fas fa-microchip"></i> ASIC Miners
                        </a>
                        <a href="gpu-miners.html" class="btn btn-primary">
                            <i class="fas fa-desktop"></i> GPU Miners
                        </a>
                    </div>
                </div>
            </div>
        `;

        modal.querySelector('.modal-close').addEventListener('click', () => {
            document.body.removeChild(modal);
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                document.body.removeChild(modal);
            }
        });

        document.body.appendChild(modal);
    }

    handleSearch(term) {
        if (term.length < 2) return;
        // Search functionality can be implemented here
        console.log('Searching for:', term);
    }

    updateCurrencyDisplay() {
        const rateElement = document.getElementById('exchangeRate');
        if (!rateElement) return;

        // Fallback rates if cryptoService not available
        const rates = {
            USD: 1,
            EUR: 0.92,
            GBP: 0.79,
            PKR: 278.50,
            AED: 3.67,
            CNY: 7.23,
            JPY: 148.50
        };

        const rate = rates[this.currentCurrency] || 1;
        if (this.currentCurrency === 'PKR') {
            rateElement.textContent = `1 USD = ${rate.toFixed(2)} PKR`;
        } else if (this.currentCurrency === 'AED') {
            rateElement.textContent = `1 USD = ${rate.toFixed(2)} AED`;
        } else {
            rateElement.textContent = `1 USD = ${rate.toFixed(2)} ${this.currentCurrency}`;
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

    showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #27ae60;
            color: white;
            padding: 15px 20px;
            border-radius: 5px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            font-weight: 600;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}

// Global function to add miners from other pages
function addToComparison(minerId, type = 'asic') {
    if (typeof comparisonTool !== 'undefined') {
        const fullId = type === 'asic' ? `asic-${minerId}` : `gpu-${minerId}`;
        comparisonTool.addMinerById(fullId);
    } else {
        // Fallback: store in localStorage for later
        let comparison = JSON.parse(localStorage.getItem('minerComparison') || '[]');
        if (!comparison.includes(minerId)) {
            comparison.push(minerId);
            localStorage.setItem('minerComparison', JSON.stringify(comparison));
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check for saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        const themeIcon = document.querySelector('#theme-toggle i');
        if (themeIcon) {
            themeIcon.className = 'fas fa-sun';
        }
    }
});

// Initialize Comparison Tool
const comparisonTool = new ComparisonTool();
