self.addEventListener("install", (event) => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(clients.claim());
});

// self.addEventListener("fetch", (event) => {
//   event.respondWith(
//     caches.match(event.request).then((cachedResponse) => {
//       return (
//         cachedResponse ||
//         fetch(event.request).catch(() => {
//           return new Response("You are offline");
//         })
//       );
//     })
//   );
// });
// self.addEventListener("fetch", (event) => {
//   event.respondWith(
//     caches.match(event.request).then((cachedResponse) => {
//       return (
//         cachedResponse ||
//         fetch(event.request).catch(() => caches.match("/src/app/splash/page.js"))
//       );
//     })
//   );
// });

// self.addEventListener('push', (event) => {
//   console.log('Push event received');
//   if (!event.data) {
//     console.warn('Push event has no data');
//     return;
//   }

//   const data = event.data.json();
//   self.registration.showNotification(data.title || 'Default title', {
//     body: data.body || 'Default body',
//     icon: data.icon || '/Viyyan-en-Logo.png',
//   });
// });

self.addEventListener("push", function (event) {
  let options = {
    body: event.data ? event.data.text().split("|")[0] : "No message",
    icon: event.data ? event.data.text().split("|")[1] : "/darkLogo.png",
    badge: "/darkLogo.png",
    image: event?.data?.text()?.split("|")[2],
  };

  event.waitUntil(self.registration.showNotification("فروشگاه ویرانکس", options));
});
