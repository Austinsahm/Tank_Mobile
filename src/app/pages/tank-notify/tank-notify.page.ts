import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PushNotifications } from '@capacitor/push-notifications';
import { Observable, map, switchMap } from 'rxjs';
import { Tank } from 'src/app/model/asset';
import { TankAssetService } from 'src/app/service/tank-asset.service';

@Component({
  selector: 'app-tank-notify',
  templateUrl: './tank-notify.page.html',
  styleUrls: ['./tank-notify.page.scss'],
})
export class TankNotifyPage implements OnInit {
  tank$: Observable<Tank>;

  constructor(private tankAssetService: TankAssetService) {}

  ngOnInit() {
    return this.tankAssetService.notifyTank$.pipe(
      map((tank) => {
        const value = +tank.realTankLevel.split('=')[1];
        return {
          max: tank.height,
          title: tank.deviceName,
          level: value,
          shape: tank.shape.charAt(0).toUpperCase() + tank.shape.slice(1),
          color: tank.color,
          tankId: tank.deviceId,
        };
      })
    );
  }

  resetBadgeCount() {
    PushNotifications.removeAllDeliveredNotifications();
  }
}
