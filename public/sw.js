const staticCacheName = 's-app-v3';
const dynamicCacheName = 'd-app-v3';

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      cache.addAll([
        '/index.html',
        // '/products',
        // '/orders-history',
        // '/cart',
        './static/js/main.chunk.js',
        // './static/js/vendors~main.chunk.js',
        // './static/js/bundle.js',
        // './static/css/main.chunk.css',
        // 'https://fonts.gstatic.com/s/roboto/v27/KFOlCnqEu92Fr1MmEU9fBBc4.woff2',
        // 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu5mxKOzY.woff2',
        // 'https://fonts.gstatic.com/s/roboto/v27/KFOmCnqEu92Fr1Mu4mxK.woff2',
        // 'https://fonts.gstatic.com/s/roboto/v27/KFOlCnqEu92Fr1MmEU9fABc4EsA.woff2',
        // './favicon.ico',
        // './manifest.json',
        // './logo192.png',
      ])
  })
  )
})

self.addEventListener('activate', async event => {

  const cacheNames = await caches.keys()
  await Promise.all(
    cacheNames
      .filter(name => name !== staticCacheName)
      .filter(name => name !== dynamicCacheName)
      .map(name => caches.delete(name))
  )
})

self.addEventListener("fetch", (event) => {
  console.log('active')
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
    const cached = await cache.match(request)
    return cached ?? await caches.match('/')
  }
}