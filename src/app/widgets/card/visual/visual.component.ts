import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-visual',
  templateUrl: './visual.component.html',
  styleUrls: ['./visual.component.scss'],
})

export class VisualComponent implements OnInit {
  tagName: string = "Total Active Device";
  status:  string = "No";

  constructor() { }

  ngOnInit() {}

}
