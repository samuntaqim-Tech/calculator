// adsense.js - Complete AdSense Integration for Best Miners Profit

class AdSenseManager {
    constructor() {
        this.adsenseId = 'ca-pub-4103650365925612';
        this.adsLoaded = false;
        this.adSlots = [];
    }

    // Initialize AdSense
    init() {
        this.loadAdSenseScript();
        this.setupAutoAds();
        this.createAdContainers();
        this.injectAds();
    }

    // Load AdSense script
    loadAdSenseScript() {
        if (this.adsLoaded) return;

        const script = document.createElement('script');
        script.async = true;
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${this.adsenseId}`;
        script.crossOrigin = 'anonymous';
        script.onload = () => {
            this.adsLoaded = true;
            console.log('AdSense script loaded successfully');
            this.pushAds();
        };
        document.head.appendChild(script);
    }

    // Setup auto ads
    setupAutoAds() {
        window.adsbygoogle = window.adsbygoogle || [];
        adsbygoogle.push({
            google_ad_client: this.adsenseId,
            enable_page_level_ads: true
        });
    }

    // Create ad containers
    createAdContainers() {
        const adPositions = [
            { type: 'banner', position: 'top', slot: 'top_banner' },
            { type: 'sidebar', position: 'sidebar_top', slot: 'sidebar_1' },
            { type: 'sidebar', position: 'sidebar_bottom', slot: 'sidebar_2' },
            { type: 'inline', position: 'content_top', slot: 'content_1' },
            { type: 'inline', position: 'content_middle', slot: 'content_2' },
            { type: 'banner', position: 'bottom', slot: 'bottom_banner' }
        ];

        adPositions.forEach(pos => {
            this.createAdSlot(pos);
        });
    }

    // Create individual ad slot
    createAdSlot(config) {
        const adDiv = document.createElement('div');
        adDiv.className = `adsense-${config.type} adsense-ad`;
        adDiv.id = `ad-${config.position}`;
        
        adDiv.innerHTML = `
            <div class="ad-label">Advertisement</div>
            <ins class="adsbygoogle"
                 style="display:block"
                 data-ad-client="${this.adsenseId}"
                 data-ad-slot="${config.slot}"
                 data-ad-format="auto"
                 data-full-width-responsive="true"></ins>
        `;

        this.adSlots.push({
            element: adDiv,
            config: config
        });
    }

    // Inject ads into page
    injectAds() {
        this.adSlots.forEach(adSlot => {
            this.placeAdInPage(adSlot);
        });
    }

    // Place ad in specific page position
    placeAdInPage(adSlot) {
        const { element, config } = adSlot;
        
        switch(config.position) {
            case 'top':
                document.body.insertBefore(element, document.body.firstChild);
                break;
            case 'sidebar_top':
                const sidebar = document.querySelector('.sidebar');
                if (sidebar) sidebar.insertBefore(element, sidebar.firstChild);
                break;
            case 'sidebar_bottom':
                const sidebarBottom = document.querySelector('.sidebar');
                if (sidebarBottom) sidebarBottom.appendChild(element);
                break;
            case 'content_top':
                const mainContent = document.querySelector('.main-content');
                if (mainContent) mainContent.insertBefore(element, mainContent.firstChild);
                break;
            case 'content_middle':
                const contentMiddle = document.querySelector('.miners-table');
                if (contentMiddle) contentMiddle.parentNode.insertBefore(element, contentMiddle);
                break;
            case 'bottom':
                const footer = document.querySelector('footer');
                if (footer) document.body.insertBefore(element, footer);
                break;
        }
    }

    // Push ads to AdSense
    pushAds() {
        if (window.adsbygoogle) {
            (adsbygoogle = window.adsbygoogle || []).push({});
        }
    }

    // Refresh specific ad
    refreshAd(adId) {
        const adElement = document.getElementById(adId);
        if (adElement && window.adsbygoogle) {
            adsbygoogle.push({});
        }
    }

    // Track ad performance
    trackAdEvent(eventType, adSlot) {
        // Integrate with Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', eventType, {
                'event_category': 'AdSense',
                'event_label': adSlot,
                'value': 1
            });
        }
    }
}

// Initialize AdSense when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    const adManager = new AdSenseManager();
    adManager.init();
    
    // Refresh ads every 30 minutes
    setInterval(() => {
        adManager.pushAds();
    }, 30 * 60 * 1000);
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AdSenseManager;
}
