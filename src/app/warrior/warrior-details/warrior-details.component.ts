import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-warrior-details',
  templateUrl: './warrior-details.component.html',
  styleUrls: ['./warrior-details.component.css']
})
export class WarriorDetailsComponent implements OnInit {
  @Input() XP:number;
  @Input() coinsGive:number;
  @Input() coinsReceive:number;
  constructor() { }

  ngOnInit() {
  }

}