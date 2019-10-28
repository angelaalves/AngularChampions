import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-warrior-details-coins',
  templateUrl: './warrior-details-coins.component.html',
  styleUrls: ['./warrior-details-coins.component.css']
})
export class WarriorDetailsCoinsComponent implements OnInit {
  @Input() coinsGive: number;
  @Input() coinsReceive: number;
  constructor() { }

  ngOnInit() {
  }

}