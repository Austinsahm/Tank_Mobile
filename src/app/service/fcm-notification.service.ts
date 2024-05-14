import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from './session.service';
import { Capacitor } from '@capacitor/core';
import { map, of } from 'rxjs';
import {
  ActionPerformed,
  PushNotificationSchema,
  PushNotifications,
  Token,
} from '@capacitor/push-notifications';
import { TankAssetService } from './tank-asset.service';

@Injectable({
  providedIn: 'root',
})
export class FcmNotificationService {
  constructor(
    private router: Router,
    private session: SessionService,
    private tankAssetService: TankAssetService
  ) {}

  initPush() {
    if (Capacitor.isNativePlatform()) {
      return this.registerPush();
    }
    return of('');
  }

  private registerPush() {
    return this.session.getFcmToken().pipe(
      map((token) => {        
        if (!token) {
          //if no token is in db

          // Request permission to use push notifications
          // iOS will prompt user and return if they granted permission or not
          // Android will just grant without prompting
          PushNotifications.requestPermissions().then((result) => {
            if (result.receive === 'granted') {
              // Register with Apple / Google to receive push via APNS/FCM
              PushNotifications.register();
            } else {
              // Show some error
            }
          });

          // On success, we should be able to receive notifications
          PushNotifications.addListener('registration', (token: Token) => {
            this.session.setFcmToken(token.value);
            return token.value;
          });

          // Some issue with our setup and push will not work
          PushNotifications.addListener('registrationError', (error: any) => {
            // alert('Error on registration: ' + JSON.stringify(error));
            console.log('error:', error);
          });

          this.notification();
        } else {
          //token is available
          this.notification();
          return token;
        }
      })
    );
  }

  TODO
  private notification() {    
    PushNotifications.addListener(
      'pushNotificationReceived',
      (notification: PushNotificationSchema) => {
        // this.tankAssetService.updateTankLevel(notification.data)
        console.log(
          'received title: ',
          notification.title,
          'data: ',
          JSON.stringify(notification.data),
          'body: ',
          notification.body
        );
      }
    );

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
       (notification: ActionPerformed) => {
        const data = notification.notification.data;
        this.tankAssetService.notificationClickTank(data)
        console.log('Push action performed: ' + JSON.stringify(notification));
        console.log('data', data);
        this.router.navigate([`/tank`, ]);

        if (data.detailsId) {
          this.router.navigate([`/tank`, ]);
        }
      }
    );
  }
}
