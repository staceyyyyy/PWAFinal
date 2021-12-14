/* eslint-disable no-plusplus */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */

// handle if focus on web
self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    const data = event.notification;
    console.log(
        ' Received foreground message ',
        event,
    );
    const urlToOpen = new URL(`${self.location.origin}/${data.data.path}`, self.location.origin).href;

    const promiseChain = clients.matchAll({
        type: 'window',
        includeUncontrolled: true,
    })
        .then((windowClients) => {
            let matchingClient = null;

            for (let i = 0; i < windowClients.length; i++) {
                const windowClient = windowClients[i];
                if (windowClient.url === urlToOpen) {
                    matchingClient = windowClient;
                    break;
                }
            }

            if (matchingClient) {
                return matchingClient.focus();
            }
            return clients.openWindow(urlToOpen);
        });

    event.waitUntil(promiseChain);
});
