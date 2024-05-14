import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { TankAssetService } from 'src/app/service/tank-asset.service';
type Shape = 'Rectangle' | 'Circle' | 'Cylinder' | 'ConeTop' | 'ConeBottom';

@Component({
  selector: 'app-tank',
  templateUrl: './tank.component.html',
  styleUrls: ['./tank.component.scss'],
})
export class TankComponent implements OnInit {
  @ViewChild('cylinderLevel', { static: false }) cylinder: ElementRef;
  @ViewChild('rectangleLevel', { static: false }) rectangle: ElementRef;
  @ViewChild('circleLevel', { static: false }) circle: ElementRef;
  @ViewChild('coneBottomLevelTop', { static: false })
  coneBottomLevelTop: ElementRef;
  @ViewChild('coneBottomLevelBottom', { static: false })
  coneBottomLevelBottom: ElementRef;
  @ViewChild('coneBottomLevel', { static: false })
  coneBottomLevel: ElementRef;
  @ViewChild('coneTopLevel', { static: false })
  coneTopLevel: ElementRef;
  @ViewChild('coneTopLevelBottom', { static: false })
  coneTopLevelBottom: ElementRef;
  @ViewChild('coneTopLevelTop', { static: false })
  coneTopLevelTop: ElementRef;

  @Input() level: number = 500;
  @Input() maxSize: number = 1000;
  @Input() deviceIndex: number;
  @Input() title: string;
  @Input() shape: Shape = 'Circle';
  @Input() tankId: string;
  @Input() color: string = '#ffca45';

  scales: number[] = [];
  topBorder: string;
  topContent: string;
  containerBottom: string;

  constructor(
    private renderer: Renderer2,
    private changeDetectorRef: ChangeDetectorRef,
    private tankAssetService: TankAssetService
  ) {}

  ngOnInit() {
    this.tankAssetService.showUpdatedLevel(this.tankId).subscribe((data) => {
      //check tank that have new data
      // if (data?.assetId !== undefined)
      //   if (this.tankId === data.deviceId) {
      //     this.level = +data.realTankLevel.split('=')[1];
      //   }
    });
    this.colorShade();
    this.showLevel();
    this.caliberate();
  }

  showLevel() {
    this.changeDetectorRef.detectChanges();
    const shapeRatio = 300 / this.maxSize;
    const shapeHeight = this.maxSize * shapeRatio;
    const contentLevel = this.level * shapeRatio;

    if (this.shape === 'Cylinder') {
      this.renderer.setProperty(
        this.cylinder.nativeElement,
        'style',
        `background-color: ${this.color}; height: ${contentLevel + 8}px;`
      );
    } else if (this.shape === 'Rectangle')
      this.renderer.setProperty(
        this.rectangle.nativeElement,
        'style',
        `background-color: ${this.color}; height: ${
          contentLevel + 5
        }px; border: 2px solid ${this.color}`
      );
    else if (this.shape === 'Circle') {
      const shapeRatio = 200 / this.maxSize;
      const shapeHeight = this.maxSize * shapeRatio;
      const contentLevel = this.level * shapeRatio;

      this.renderer.setProperty(
        this.circle.nativeElement,
        'style',
        `background-color: ${this.color}; height: ${contentLevel + 5}px;`
      );
    } else if (this.shape === 'ConeTop') {
      if (contentLevel > 200) {
        this.renderer.setProperty(
          this.coneTopLevel.nativeElement,
          'style',
          `height:210px`
        );
        this.renderer.setProperty(
          this.coneTopLevelTop.nativeElement,
          'style',
          `background-color: ${this.color}; height: ${contentLevel - 200}px;`
        );
        this.renderer.setProperty(
          this.coneTopLevelBottom.nativeElement,
          'style',
          `background-color: ${this.color}; height: 200px;`
        );
      } else {
        this.renderer.setProperty(
          this.coneTopLevelBottom.nativeElement,
          'style',
          `background-color: ${this.color}; height: ${contentLevel + 3}px;`
        );
        this.renderer.setProperty(
          this.coneTopLevel.nativeElement,
          'style',
          `height:${contentLevel + 4}px`
        );
      }
    } else if (this.shape === 'ConeBottom') {
      if (contentLevel > 100) {
        this.renderer.setProperty(
          this.coneBottomLevel.nativeElement,
          'style',
          `height:${contentLevel + 4}px`
        );
        this.renderer.setProperty(
          this.coneBottomLevelTop.nativeElement,
          'style',
          `background-color: ${this.color}; height: ${contentLevel - 95}px;`
        );
        this.renderer.setProperty(
          this.coneBottomLevelBottom.nativeElement,
          'style',
          `background-color: ${this.color}; height: 100px;`
        );
      } else {
        this.renderer.setProperty(
          this.coneBottomLevelBottom.nativeElement,
          'style',
          `background-color: ${this.color}; height: ${contentLevel}px;`
        );
      }
    }
  }

  caliberate() {
    for (let i = 0; i <= this.maxSize; i += this.maxSize / 4) {
      this.scales.unshift(i);
    }
  }

  hexToRGB(hex: string) {
    // Remove the '#' character from the beginning of the hex code.
    const hexCode = hex.substring(1);

    // Split the hex code into three parts, representing the red, green, and blue values.
    var rgb = hexCode.split('');

    // Convert each part to an integer.
    var r = parseInt(rgb[0] + rgb[1], 16);
    var g = parseInt(rgb[2] + rgb[3], 16);
    var b = parseInt(rgb[4] + rgb[5], 16);

    // Return the RGB values as a tuple.
    return [r, g, b];
  }

  colorShade() {
    const gradient = this.hexToRGB(this.color);
    this.containerBottom = `rgb(${gradient[0] - 14},${gradient[1] - 14},${
      gradient[2] - 14
    })`;
    this.topBorder = `2px solid rgb(${gradient[0] + 10},${gradient[1] + 10},${
      gradient[2] + 10
    })`;
    this.topContent = `rgb(${gradient[0] - 22}, ${gradient[1] - 22}, ${
      gradient[2] - 22
    })`;
  }
}
