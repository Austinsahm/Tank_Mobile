import { ViewChildren } from '@angular/core';
import { QueryList } from '@angular/core';
import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { CheckboxCustomEvent, ModalController } from '@ionic/angular';
import { map, Observable } from 'rxjs';
import { FusionDataSource, Tank, TankAssetResp } from 'src/app/model/asset';
import { environment } from 'src/environments/environment';
import { DataDetails } from '../model/company';
import { TankAssetService } from '../service/tank-asset.service';
import { DetailsModalComponent } from '../widgets/details-modal/details-modal.component';
import {
  ActionPerformed,
  PushNotifications,
  PushNotificationSchema,
} from '@capacitor/push-notifications';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  @ViewChildren('fusion') chartElementRef: QueryList<ElementRef>;
  @Input() title: string;
  dataSource: any;
  @Input() deviceIndex: number;
  @Output() frontEndAnimate = new EventEmitter<any>();
  @Output() minimizeTank = new EventEmitter<number>();
  @Output() maximizeTank = new EventEmitter<number>();
  @Output() tankDetails = new EventEmitter<number>();

  dataSources: any[] = [];
  tanksAsset$: Observable<Tank[]>;
  devices: DataDetails[] = [];
  script: any;

  segment = 'default';

  constructor(
    private tankAssetService: TankAssetService,
    private modalCtrl: ModalController,
    private renderer: Renderer2,
  ) {}

  ngOnInit(): void {
    this.tanksAsset$ = this.tankAssetService.loadComapnyTankAssest().pipe(
      map((data) => {
        const assests = data.map((tank, i) => {
          const value = +tank.realTankLevel.split('=')[1];
          this.devices.push({
            deviceId: tank.deviceId,
            tab3: true,
            tab4: true,
            tab5: true,
            deviceName: tank.deviceName,
            manufDeviceId: tank.manufDeviceId,
            latitude: +tank.lat,
            longitude: +tank.lng,
          });
          return {
            max: tank.height,
            title: tank.deviceName,
            level: value,
            shape: tank.shape.charAt(0).toUpperCase() + tank.shape.slice(1),
            color: tank.color,
            tankId: tank.deviceId,
          };
        });
        return assests;
      })
    );
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: DetailsModalComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    // if (role === 'confirm') {
    //   this.message = `Hello, ${data}!`;
    // }
  }

  refresh(evt) {}

  segmentClick(evt) {
    this.segment = evt.detail.value;
  }

  animation(evt) {
    this.frontEndAnimate.emit(evt);
  }

  renderExternalScript(src: string): HTMLScriptElement {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    // script.async = true;
    script.defer = true;
    this.renderer.appendChild(document.body, script);
    return script;
  }

  fusionChart() {
    const win = window as any;
    this.tankAssetService.loadComapnyTankAssest().pipe(
      map((data) => {
        const tanks = [];
        for (let tank of data) {
          const value = +tank.realTankLevel.split('=')[1];
          if (!Number.isNaN(value)) {
            const chart = {
              theme: 'fusion',
              // caption: tank.deviceName,
              // subcaption: tank.assetName,
              lowerLimit: '0',
              upperLimit: tank.height.toString(),
              lowerLimitDisplay: 'Empty',
              upperLimitDisplay: 'Full',
              numberSuffix: ' mm',
              showValue: '1',
              chartBottomMargin: '25',
              cylFillColor: '#1aaf5d',
              cylFillHoverColor: '#00ff00',
              dataStreamUrl: `${environment.apiServerEndpoint}/asset/tank-level/device-id/${tank.deviceId}`,
              refreshInterval: '60',
              refreshInstantly: '1',
            };

            this.dataSources.push({
              chart: chart,
              value: value.toString(),
            });

            this.devices.push({
              deviceId: tank.deviceId,
              tab3: true,
              tab4: true,
              tab5: true,
              deviceName: tank.assetName,
              manufDeviceId: tank.assetId,
              latitude: +tank.lat,
              longitude: +tank.lng,
            });
            tanks.push(tank);
          }
        }

        if (!win.FusionCharts)
          this.chartElementRef.changes.subscribe((v) => {
            this.renderExternalScript(
              'https://cdn.fusioncharts.com/fusioncharts/latest/fusioncharts.js'
            ).onload = (data) => {
              this.renderExternalScript(
                'https://cdn.fusioncharts.com/fusioncharts/latest/themes/fusioncharts.theme.fusion.js'
              ).onload = () => {};

              this.chartElementRef.toArray().forEach((el, i) => {
                const chartConfig = {
                  type: 'cylinder',
                  renderAt: el.nativeElement,
                  width: '300',
                  height: '400',
                  dataFormat: 'json',
                  dataSource: this.dataSources[i],
                };
                new win.FusionCharts(chartConfig).render();
              });
            };
          });

        this.tankAssetService.addDevices(this.devices);
        return tanks;
      })
    );
  }

}
