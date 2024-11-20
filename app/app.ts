import { Application } from '@nativescript/core';
import { LocalNotifications } from '@nativescript/local-notifications';

// Initialize notifications
LocalNotifications.requestPermission().then((granted) => {
    if (granted) {
        console.log('Notification permission granted');
    }
});

Application.run({ moduleName: 'app-root' });