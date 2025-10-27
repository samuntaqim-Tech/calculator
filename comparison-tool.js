class MinerComparison {
    constructor() {
        this.selectedMiners = [];
    }
    
    addMinerToCompare(minerId) {
        if (this.selectedMiners.length < 4) {
            this.selectedMiners.push(minerId);
            this.updateComparisonTable();
        }
    }
    
    updateComparisonTable() {
        // Generate comparison table dynamically
    }
}
