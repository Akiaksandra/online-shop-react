const staticCacheName = 's-app-v3';
const dynamicCacheName = 'd-app-v3';

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      cache.addAll([
        '/',
        './static/js/main.chunk.js',
        './static/js/vendors~main.chunk.js',
        './static/js/bundle.js',
        './static/css/main.chunk.css',
        './favicon.ico',

        '/static/css/main.d74658ae.chunk.css',
        '/static/js/2.92e12558.chunk.js',
        '/static/js/main.c45b2fb6.chunk.js',
        '/manifest.json',
        'logo192.png',

      ])
  })
  )
})


self.addEventListener("fetch", (event) => {
  
    if (!navigator.onLine) {
        if (event.request.url === "http://localhost:3000/static/js/main.chunk.js") {
            event.waitUntil(
                this.registration.showNotification("Internet", {
                    body: "internet not working",
                })
            )
        }
      }  
      
      const {request} = event

      const url = new URL(request.url)
      if (url.origin === location.origin) {
        event.respondWith(cacheFirst(request))
      } else {
        event.respondWith(networkFirst(request))
      }     
        
}) 

async function cacheFirst(request) {
  const cached = await caches.match(request)
  return cached ?? await fetch(request)
}

async function networkFirst(request) {
  const cache = await caches.open(dynamicCacheName)
  try {
    const response = await fetch(request)
    await cache.put(request, response.clone())
    return response
  } catch (e) {
    const cached = await cache.match(request);
    return cached ?? await caches.match('/')
  }
}