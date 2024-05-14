import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TankAssetResp } from '../model/asset';
import { DataDetails } from '../model/company';
import { Response, StatusCode } from '../model/http';
import { BaseHttpService } from './base-http.service';

@Injectable({
  providedIn: 'root',
})
export class TankAssetService extends BaseHttpService {
  private tankUrl = `${environment.apiServerEndpoint}/asset/tanks/company-id`;
  private companyId = 'abcltd';
  private devices = new BehaviorSubject<DataDetails[]>([]);
  private _updateTank: { [tankId: string]: Subject<TankAssetResp> } = {};
  private _notifyTank = new BehaviorSubject<TankAssetResp>(<TankAssetResp>{});

  devices$ = this.devices.asObservable();
  notifyTank$ = this._notifyTank.asObservable();

  constructor(private http: HttpClient) {
    super(http);
  }

  loadComapnyTankAssest(): Observable<TankAssetResp[]> {
    return this.check(
      this.http.get<Response<TankAssetResp[]>>(
        `${this.tankUrl}/${this.companyId}`
      ),
      [StatusCode.OK, StatusCode.SUCCESS]
    );
  }

  /**
   * save devices to subject
   * @param devices
   */
  addDevices(devices: DataDetails[]) {
    this.devices.next(devices);
  }

  filterDevice(deviceId: string): DataDetails {
    const device = this.devices.value.filter(
      (device) => device.deviceId === deviceId
    );
    return device[0];
  }

  updateTankLevel(tankId: string, data: TankAssetResp) {
    console.log('data from servfcm:', JSON.stringify(data));
    this._updateTank[tankId] = new Subject();
    // this._updateTank[tankId].next(data);
  }

  showUpdatedLevel(tankId: string) {
    // if (!this._updateTank[tankId]) {
    //   return this._updateTank[tankId].asObservable();
    // }
    return of('');
  }

  notificationClickTank(tank: TankAssetResp) {
    console.log('data from action performed:', JSON.stringify(tank));
    this._notifyTank.next(tank);
  }
}
