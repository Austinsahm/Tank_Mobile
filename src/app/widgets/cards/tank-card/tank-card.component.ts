import { ViewChild } from '@angular/core';
import { Renderer2 } from '@angular/core';
import { ElementRef } from '@angular/core';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FusionDataSource } from 'src/app/model/asset';

@Component({
  selector: 'app-tank-card',
  templateUrl: './tank-card.component.html',
  styleUrls: ['./tank-card.component.scss'],
})
export class TankCardComponent implements OnInit {
  @ViewChild('fusion') chartElementRef: ElementRef;

  @Input() title: string;
  @Input() dataSource: FusionDataSource;
  @Input() deviceIndex: number;
  @Output() frontEndAnimate = new EventEmitter<any>();
  @Output() minimizeTank = new EventEmitter<number>();
  @Output() maximizeTank = new EventEmitter<number>();
  @Output() tankDetails = new EventEmitter<number>();
  win = window as any;

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    this.showChart()
  }

  minimize() {
    this.minimizeTank.emit(this.deviceIndex);
  }

  maximize() {
    this.maximizeTank.emit(this.deviceIndex);
  }

  dataDetails() {
    this.tankDetails.emit(this.deviceIndex);
  }

  animation(evt) {
    this.frontEndAnimate.emit(evt);
  }

  showChart(dataSource?: FusionDataSource) {
    this.renderExternalScript(
      'https://cdn.fusioncharts.com/fusioncharts/latest/fusioncharts.js'
    ).onload = (data) => {
      this.renderExternalScript(
        'https://cdn.fusioncharts.com/fusioncharts/latest/themes/fusioncharts.theme.fusion.js'
      ).onload = () => {};
      const chartEl = this.chartElementRef.nativeElement;

      console.log(chartEl);

      const chartConfig = {
        type: 'cylinder',
        renderAt: chartEl,
        width: '100',
        height: '400',
        dataFormat: 'json',
        dataSource: {
          chart: {
            theme: 'fusion',
            caption: 'Diesel Level in Generator',
            subcaption: 'Bakersfield Central',
            lowerLimit: '0',
            upperLimit: '120',
            lowerLimitDisplay: 'Empty',
            upperLimitDisplay: 'Full',
            numberSuffix: ' ltrs',
            showValue: '1',
            chartBottomMargin: '25',
            ticksOnRight: '0',
          },
          value: '75',
        },
      };

      const c = new this.win.FusionCharts(chartConfig).render();
      console.log(c);
    };
  }

  renderExternalScript(src: string): HTMLScriptElement {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    script.async = true;
    script.defer = true;
    this.renderer.appendChild(document.body, script);
    return script;
  }
}
