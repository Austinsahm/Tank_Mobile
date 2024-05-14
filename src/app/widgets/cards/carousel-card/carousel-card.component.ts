import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-carousel-card',
  templateUrl: './carousel-card.component.html',
  styleUrls: ['./carousel-card.component.scss'],
})
export class CarouselCardComponent implements OnInit {

  companyName:string='Abcltd';

  constructor() { }

  ngOnInit() {}

}
