import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataDetails } from 'src/app/model/company';
import { TankAssetService } from 'src/app/service/tank-asset.service';

@Component({
  selector: 'app-geolocation',
  templateUrl: './geolocation.component.html',
  styleUrls: ['./geolocation.component.scss'],
})
export class GeolocationComponent implements OnInit {
  deviceId: string;
  device: DataDetails;
  constructor(
    private tankAssetService: TankAssetService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.deviceId = this.route.snapshot.parent.paramMap.get('id');
    this.device = this.tankAssetService.filterDevice(this.deviceId);    
  }
}
