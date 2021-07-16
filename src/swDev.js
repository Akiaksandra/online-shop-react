const webpush = require('web-push');

export default async function swDev()
{
  function determineAppServerKey() {
    const vapidPublicKey = "BHMFiIOxOgzVXKq5POvI6BhfJ53bf1-jzNhDrt8Dbyp6feZod_AcPsWT4yL2l5psrZngzEjUVLT6wYV8QiNEEAA"; //webpush.generateVAPIDKeys().publicKey;
    console.log(vapidPublicKey)
      return urlBase64ToUint8Array(vapidPublicKey);
  }

  function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
  
    let swUrl= `${process.env.PUBLIC_URL}/sw.js`
    await navigator.serviceWorker.register(swUrl).then(async (response)=>{

        await response.pushManager.getSubscription();
        response.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: determineAppServerKey()
      });

    }) 
}
