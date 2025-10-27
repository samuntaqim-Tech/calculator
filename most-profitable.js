// Fetch and display most profitable miners
async function loadMostProfitable() {
    const miners = await fetchMinerData();
    const profitable = miners.sort((a, b) => b.dailyProfit - a.dailyProfit);
    displayProfitabilityRanking(profitable.slice(0, 20));
}
