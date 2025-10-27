// Enhanced calculator with more parameters
function calculateAdvancedProfitability() {
    const hashrate = document.getElementById('hashrate').value;
    const power = document.getElementById('power').value;
    const cost = document.getElementById('electricity-cost').value;
    const poolFee = document.getElementById('pool-fee').value;
    const hardwareCost = document.getElementById('hardware-cost').value;
    
    // Advanced calculations
    const dailyRevenue = (hashrate * currentBitcoinPrice * blockReward) / networkDifficulty;
    const dailyCost = (power * 24 * cost) / 1000;
    const dailyProfit = dailyRevenue - dailyCost - (dailyRevenue * poolFee / 100);
    const roiDays = hardwareCost / dailyProfit;
    
    displayResults(dailyProfit, roiDays);
}
