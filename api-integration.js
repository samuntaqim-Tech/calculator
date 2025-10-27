// Add to your existing script.js or create new file
const CRYPTO_APIS = {
    coinGecko: 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd',
    whatToMine: 'https://whattomine.com/calculators.json',
    minerStats: 'https://api.asicminervalue.com/v1/miners'
};

async function fetchCryptoData() {
    try {
        const response = await fetch(CRYPTO_APIS.coinGecko);
        const data = await response.json();
        updatePrices(data);
    } catch (error) {
        console.log('Using fallback data');
        useFallbackData();
    }
}
