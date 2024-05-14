import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cardlist',
  templateUrl: './cardlist.component.html',
  styleUrls: ['./cardlist.component.scss'],
})
export class CardlistComponent implements OnInit {
  @Input() assetName: string;
  @Input() assetType: string;
  @Input() location: string;

  constructor(private router: Router) { }
  ngOnInit() {}


  navigateTo(usecase: string) {
    this.router.navigateByUrl(`/assets/${usecase}`);
  }
}
