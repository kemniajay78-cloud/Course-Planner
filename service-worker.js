const CACHE_NAME =
"flying-planner-v2";

const urlsToCache = [

    "./",
    "./index.html",
    "./manifest.json",
    "./favicon.ico",

    "./icons/icon-192.png",
    "./icons/icon-512.png",
    "./icons/apple-touch-icon.png"
];

/* INSTALL */

self.addEventListener(
    "install",
    event=>{

    event.waitUntil(

        caches.open(CACHE_NAME)
        .then(cache=>{

            return cache.addAll(
                urlsToCache
            );

        })

    );

});

/* FETCH */

self.addEventListener(
    "fetch",
    event=>{

    event.respondWith(

        caches.match(event.request)
        .then(response=>{

            return response ||
            fetch(event.request);

        })

    );

});

/* ACTIVATE */

self.addEventListener(
    "activate",
    event=>{

    event.waitUntil(

        caches.keys().then(keys=>{

            return Promise.all(

                keys.map(key=>{

                    if(
                        key !== CACHE_NAME
                    ){

                        return caches.delete(
                            key
                        );
                    }

                })

            );

        })

    );

});