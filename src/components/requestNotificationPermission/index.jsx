import { useEffect } from 'react';

const urlBase64ToUint8Array = (base64String) => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
};

const arrayBufferToBase64 = (buffer) => {
  const bytes = new Uint8Array(buffer);
  return btoa(String.fromCharCode(...bytes));
};


const RequestNotificationPermission = () => {
  useEffect(() => {
    const requestPermission = async () => {
      if ('Notification' in window && 'serviceWorker' in navigator) {
        try {
          const permission = await Notification.requestPermission();
          if (permission === 'granted') {
            const registration = await navigator.serviceWorker.ready;

            let subscription = await registration.pushManager.getSubscription();

            if (!subscription) {
              const vapidPublicKey = 'BOK_yBQA6UkxWU9wIRPqMpQuZicP1nhSnHInv_cy_-3C4lTPO11v69OoQtSEWbPRVYuRg8MnJSOORFQxQ7qkivY';
              const applicationServerKey = urlBase64ToUint8Array(vapidPublicKey);

              subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey,
              });
            }

            localStorage.setItem('endpoint', subscription?.endpoint);
            localStorage.setItem('p256dh', arrayBufferToBase64(subscription.getKey('p256dh')));
            localStorage.setItem('auth', arrayBufferToBase64(subscription.getKey('auth')));


          } else {
            console.warn('Notification permission denied or dismissed.');
          }
        } catch (error) {
          console.error('Error requesting notification permission:', error);
        }
      } else {
        console.error('Notifications or Service Worker not supported in this browser.');
      }
    };

    requestPermission();
  }, []);

  return null;
};

export default RequestNotificationPermission;
