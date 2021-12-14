/* eslint-disable no-console */
/* eslint-disable radix */
/* eslint-disable no-unused-vars */
let deferredPrompt;

function showInstallPromotion() {
    if (window.innerWidth < 768) {
        const date = new Date();
        const hide = localStorage.getItem('hideInstallPopup');
        const expired = localStorage.getItem('expiredHideInstallPopup');
        const el = document.getElementById('popup-mobile__install');
        // hidden popup
        if (el && (hide !== 'true'
        || (hide === 'true' && date.getDate() >= parseInt(expired)))) {
            localStorage.removeItem('hideInstallPopup');
            localStorage.removeItem('expiredHideInstallPopup');
            el.style.display = 'flex';
        }
    } else {
        const elDesktop = document.getElementById('popup-desktop__install');
        if (elDesktop) {
            elDesktop.style.display = 'block';
        }
    }

    // run instalation
    const buttonInstall = window.innerWidth <= 768 ? document.getElementById('btn-install__mobile')
        : document.getElementById('btn-install');
    if (buttonInstall) {
        buttonInstall.addEventListener('click', (e) => {
            deferredPrompt.prompt();
        });
    }
}

function hideInstallPromotion() {
    if (window.innerWidth <= 768) {
        const el = document.getElementById('popup-mobile__install');
        // hidden popup
        if (el) {
            el.style.display = 'none';
        }

        const date = new Date();
        // add a day
        date.setDate(date.getDate() + 1);
        localStorage.removeItem('hideInstallPopup', true);
        localStorage.removeItem('expiredHideInstallPopup', date.getDate());
    } else {
        const elDesktop = document.getElementById('popup-desktop__install');
        if (elDesktop) {
            elDesktop.style.display = 'none';
        }
    }
}

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the mini-infobar from appearing on mobile
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e;
    console.log(e);
    // Update UI notify the user they can install the PWA
    showInstallPromotion();
});

window.addEventListener('appinstalled', (evt) => {
    hideInstallPromotion();
});
