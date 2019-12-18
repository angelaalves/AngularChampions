import { Component, OnInit, Input, Injectable } from '@angular/core';

@Component({
  selector: 'app-warrior-details-coins',
  templateUrl: './warrior-details-coins.component.html',
  styleUrls: ['./warrior-details-coins.component.css']
})


@Injectable({ providedIn: 'root' })
export class WarriorDetailsCoinsComponent implements OnInit {
  @Input() coinsGive: number;
  @Input() coinsReceive: number;
  constructor() { }

  ngOnInit() {
  }

}