// ==================== ADSENSE INTEGRATION ====================

// Your AdSense ID
const ADSENSE_ID = 'ca-app-pub-4103650365925612~8216006757';

// Initialize AdSense
function initializeAdSense() {
    // Load AdSense script
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_ID}`;
    script.crossOrigin = 'anonymous';
    document.head.appendChild(script);

    // Initialize auto ads
    window.adsbygoogle = window.adsbygoogle || [];
    adsbygoogle.push({
        google_ad_client: ADSENSE_ID,
        enable_page_level_ads: true
    });

    console.log('AdSense initialized for Best Miners Profit');
}

// Create ad containers dynamically
function createAdContainer(type, slotId) {
    const adDiv = document.createElement('div');
    adDiv.className = `adsense-${type}`;
    adDiv.innerHTML = `
        <ins class="adsbygoogle"
             style="display:block"
             data-ad-client="${ADSENSE_ID}"
             data-ad-slot="${slotId}"
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
    `;
    return adDiv;
}

// Inject ads into page
function injectAds() {
    // Top banner ad
    const topAd = createAdContainer('banner', 'top_banner');
    document.body.insertBefore(topAd, document.body.firstChild);

    // Sidebar ads
    const sidebar = document.querySelector('.sidebar');
    if (sidebar) {
        const sidebarAd1 = createAdContainer('sidebar', 'sidebar_1');
        const sidebarAd2 = createAdContainer('sidebar', 'sidebar_2');
        sidebar.insertBefore(sidebarAd1, sidebar.firstChild);
        sidebar.appendChild(sidebarAd2);
    }

    // Content ads
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        const contentAd = createAdContainer('inline', 'content_1');
        mainContent.insertBefore(contentAd, mainContent.firstChild);
    }

    // Push ads after injection
    (adsbygoogle = window.adsbygoogle || []).push({});
}

// AdSense revenue tracking
function trackAdRevenue(adType) {
    // This would integrate with Google Analytics
    console.log(`Ad impression: ${adType}`);
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeAdSense();
    setTimeout(injectAds, 1000); // Inject ads after 1 second
});
