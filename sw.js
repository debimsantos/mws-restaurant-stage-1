/**
 * Install Service Worker
 * Resource: https://blog.sessionstack.com/how-javascript-works-service-workers-their-life-cycle-and-use-cases-52b19ad98b58
 */

 const versionName = 'v1';

 const urlsToCache = [
     'index.html',
     'restaurant.html',
     '/css/styles.css',
     '/js/main.js',
     '/js/dbhelper.js',
     '/js/restaurant_info.js',
     '/img/1.jpg',
     '/img/2.jpg',
     '/img/3.jpg',
     '/img/4.jpg',
     '/img/5.jpg',
     '/img/6.jpg',
     '/img/7.jpg',
     '/img/8.jpg',
     '/img/9.jpg',
     '/img/10.jpg',
     '/data/restaurants.json'
 ];

 /**
  * Install Service Worker
  */
self.addEventListener('install', function(e) {
    //console.log('ServiceWorker installed');

    e.waitUntil(
        caches
        .open(versionName)
        .then(function(cache) {
            //console.log('ServiceWorker caching files');
            cache.addAll(urlsToCache);
        })
        .then(skipWaiting)
    );
});

/**
 * Activate Service Worker
 */
self.addEventListener('activate', function(e) {
    //console.log('ServiceWorker activated');
});

/**
 * Fetch
 */
self.addEventListener('fetch', function(e) {
    //console.log('ServiceWorker Fetching');
    e.respondWith(
        caches
        .match(e.request)
        .then(function(response) {
            if (response) {
                //console.log('Fetch response:', response);
                return response;
            }
            //console.log('No cache, will fetch from network');

            return fetch(e.request).then(function(response) {
                //console.log('Response from network:', response);

                return response;
            }).catch(function(error) {
                //console.log('Fetching failed:', error);

                throw error;
            });

        })
    );
});