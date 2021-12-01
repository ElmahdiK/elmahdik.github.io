/**
 * @author Elmahdi KORFED <elmahdi.korfed@gmail.com>
 */

const cacheName = 'app-shell-cache-v1';
const precacheFiles = [
    '.',
    './content/about/cv/Elmahdi_KORFED_CV_en.pdf',
    './content/about/cv/Elmahdi_KORFED_CV_fr.pdf',
    './content/about/img/education/unice.webp',
    './content/about/img/enterprise/inria.webp',
    './content/about/img/enterprise/nsp.webp',
    './content/about/img/social/github.webp',
    './content/about/img/social/linkedin.webp',
    './content/about/img/social/messenger.webp',
    './content/about/img/download.webp',
    './content/about/css.css',
    './content/about/image.webp',
    './content/about/index.htm',
    './content/about/js.js',
    './content/home/img/ek_signature.webp',
    './content/home/css.css',
    './content/home/image.webp',
    './content/home/index.htm',
    './content/home/js.js',
    './content/portfolio/img/autoecole2000.webp',
    './content/portfolio/img/calendarui.webp',
    './content/portfolio/img/dbz2048_more_1.webp',
    './content/portfolio/img/dbz2048.webp',
    './content/portfolio/img/greetingCards.webp',
    './content/portfolio/img/hideberg.webp',
    './content/portfolio/img/kald.webp',
    './content/portfolio/img/memorycard.webp',
    './content/portfolio/img/morpion.webp',
    './content/portfolio/img/p4.webp',
    './content/portfolio/img/pedalboard.webp',
    './content/portfolio/img/rps.webp',
    './content/portfolio/img/shummy.webp',
    './content/portfolio/img/wasabi.webp',
    './content/portfolio/css.css',
    './content/portfolio/image.webp',
    './content/portfolio/index.htm',
    './content/portfolio/js.js',
    './css/font/pt-sans/jizaRExUiTo99u79D0-ExcOPIDUg-g.woff2',
    './css/css-mobile.min.css',
    './css/css.min.css',
    './img/logo/icon_16.ico',
    './img/logo/icon_128.ico',
    './img/logo/icon_144.ico',
    './img/logo/icon_192.ico',
    './img/logo/icon_192.png',
    './img/logo/icon_512.ico',
    './img/logo/icon_512.png',
    './img/logo/logo.png',
    './img/loading.webp',
    './img/notfound.webp',
    './js/js.min.js',
    './lang/data_en.json',
    './lang/data_fr.json',
    './lang/en.webp',
    './lang/fr.webp',
    './.htaccess',
    './index.html',
    './manifest.json',
    './README.md',
    './sitemap.xml',
    './sw.js'
]



// build cache; add initial resources
self.addEventListener('install', async e => {
    //console.log(`cacheName: ${cacheName}`,precacheFiles);
    const cache = await caches.open(cacheName);
    await cache.addAll(precacheFiles);
    return self.skipWaiting();
})


// update cache
self.addEventListener('activate',e=>{
    self.clients.claim();
})

// On se branche sur chaque requête émise
// retrieve from cache, network, or database
self.addEventListener('fetch',async e=>{
    const req=e.request;
    const url=new URL(req.url);
    
    if (url.origin==location.origin){
        e.respondWith(cacheFirst(req));
    }else{
        e.respondWith(networkAndCache(req));
    }
})

async function cacheFirst(req){
    const cache = await caches.open(cacheName);
    const cached = await cache.match(req);
    return cached || fetch(req);
}

async function networkAndCache(req){
    const cache=await caches.open(cacheName);
    try{
        const fresh = await fetch(req);
        await cache.put(req,fresh.clone());
        return fresh;
    }catch(e){
        const cached = await cache.match(req);
        return cached;
    }
}


/*
//This is the service worker with the Cache-first network

var CACHE = 'pwabuilder-precache';


//Install stage sets up the cache-array to configure pre-cache content
self.addEventListener('install', function (evt) {
    console.log('[PWA Builder] The service worker is being installed.');
    evt.waitUntil(precache().then(function () {
        console.log('[PWA Builder] Skip waiting on install');
        return self.skipWaiting();
    }));
});


//allow sw to control of current page
self.addEventListener('activate', function (event) {
    console.log('[PWA Builder] Claiming clients for current page');
    return self.clients.claim();
});

self.addEventListener('fetch', function (evt) {
    console.log('[PWA Builder] The service worker is serving the asset.' + evt.request.url);
    evt.respondWith(fromCache(evt.request).catch(fromServer(evt.request)));
    evt.waitUntil(update(evt.request));
});


function precache() {
    return caches.open(CACHE).then(function (cache) {
        return cache.addAll(precacheFiles);
    });
}

function fromCache(request) {
    //we pull files from the cache first thing so we can show them fast
    return caches.open(CACHE).then(function (cache) {
        return cache.match(request).then(function (matching) {
            return matching || Promise.reject('no-match');
        });
    });
}

function update(request) {
    //this is where we call the server to get the newest version of the 
    //file to use the next time we show view
    return caches.open(CACHE).then(function (cache) {
        return fetch(request).then(function (response) {
            return cache.put(request, response);
        });
    });
}

function fromServer(request) {
    //this is the fallback if it is not in the cache to go to the server and get it
    return fetch(request).then(function (response) { return response });
}
*/