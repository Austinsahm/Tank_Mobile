import {
  Component,
  OnInit,
  Input,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent implements OnInit {
  @Input() title: string;
  @Input() cardImg: string;
  colors = ['#BEE8EB', '#EEF8B4', '#CDEDB4', '#EEF8B4', '#CDEDB4'];

  constructor(private router: Router) {}

  ngOnInit() {}

  getColor(): string {
    return this.colors[Math.floor(Math.random() * this.colors.length)];
  }

  returnAlt(title: string): string {
    return '';
    // return `${title} image`;
  }
  navigateTo(usecase: string) {
    this.router.navigateByUrl(`/devices/${usecase.split(' ')[1].toLowerCase()}`);
  }
}
