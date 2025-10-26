// adsense.js - Complete AdSense Integration for Best Miner Profit
class AdSenseManager {
    constructor() {
        this.adsenseId = 'ca-pub-4103650365925612';
        this.adsenseAppId = 'ca-app-pub-4103650365925612~8216006757';
        this.adsLoaded = false;
        this.adSlots = [];
    }

    init() {
        this.loadAdSenseScript();
        this.setupAutoAds();
        this.createAdContainers();
        this.injectAds();
    }

    loadAdSenseScript() {
        if (this.adsLoaded) return;

        const script = document.createElement('script');
        script.async = true;
        script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${this.adsenseId}`;
        script.crossOrigin = 'anonymous';
        script.onload = () => {
            this.adsLoaded = true;
            console.log('AdSense loaded for Best Miner Profit');
            this.pushAds();
        };
        document.head.appendChild(script);
    }

    setupAutoAds() {
        window.adsbygoogle = window.adsbygoogle || [];
        adsbygoogle.push({
            google_ad_client: this.adsenseId,
            enable_page_level_ads: true,
            overlays: { bottom: true }
        });
    }

    createAdContainers() {
        const positions = [
            { id: 'header-ad', type: 'banner', location: 'header' },
            { id: 'sidebar-ad-1', type: 'rectangle', location: 'sidebar' },
            { id: 'sidebar-ad-2', type: 'rectangle', location: 'sidebar' },
            { id: 'content-ad-1', type: 'banner', location: 'content' },
            { id: 'footer-ad', type: 'banner', location: 'footer' }
        ];

        positions.forEach(pos => {
            this.createAdElement(pos);
        });
    }

    createAdElement(config) {
        const adDiv = document.createElement('div');
        adDiv.className = `ad-container ad-${config.type}`;
        adDiv.id = config.id;
        
        adDiv.innerHTML = `
            <div class="ad-label">Advertisement</div>
            <ins class="adsbygoogle"
                 style="display:block"
                 data-ad-client="${this.adsenseId}"
                 data-ad-slot="${config.id}"
                 data-ad-format="${config.type === 'banner' ? 'auto' : 'rectangle'}"
                 data-full-width-responsive="true"></ins>
        `;

        this.adSlots.push(adDiv);
    }

    injectAds() {
        this.adSlots.forEach(ad => {
            this.placeAd(ad);
        });
    }

    placeAd(adElement) {
        const id = adElement.id;
        switch(id) {
            case 'header-ad':
                const header = document.querySelector('header');
                if (header) header.parentNode.insertBefore(adElement, header);
                break;
            case 'sidebar-ad-1':
                const sidebar = document.querySelector('.sidebar');
                if (sidebar) sidebar.prepend(adElement);
                break;
            case 'sidebar-ad-2':
                const sidebarBottom = document.querySelector('.sidebar');
                if (sidebarBottom) sidebarBottom.appendChild(adElement);
                break;
            case 'content-ad-1':
                const content = document.querySelector('.main-content');
                if (content) content.parentNode.insertBefore(adElement, content);
                break;
            case 'footer-ad':
                const footer = document.querySelector('footer');
                if (footer) footer.parentNode.insertBefore(adElement, footer);
                break;
        }
    }

    pushAds() {
        if (window.adsbygoogle) {
            (adsbygoogle = window.adsbygoogle || []).push({});
        }
    }
}

// Initialize AdSense
document.addEventListener('DOMContentLoaded', function() {
    const adManager = new AdSenseManager();
    adManager.init();
});
