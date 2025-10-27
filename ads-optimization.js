// Optimal ad placements
const AD_PLACEMENTS = [
    { id: 'header-ad', size: [728, 90] },
    { id: 'sidebar-ad', size: [300, 600] },
    { id: 'in-content-ad', size: [300, 250] },
    { id: 'footer-ad', size: [728, 90] }
];

function initializeAds() {
    AD_PLACEMENTS.forEach(placement => {
        if (document.getElementById(placement.id)) {
            loadAd(placement.id, placement.size);
        }
    });
}
