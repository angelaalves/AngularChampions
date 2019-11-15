import { Component, OnInit, Input, Injectable } from '@angular/core';

@Component({
  selector: 'app-warrior-details',
  templateUrl: './warrior-details.component.html',
  styleUrls: ['./warrior-details.component.css']
})



@Injectable({ providedIn: 'root' })
export class WarriorDetailsComponent implements OnInit {
  @Input() XP:number;
  @Input() coinsGive:number;
  @Input() coinsReceive:number;
  constructor() { }

  ngOnInit() {
  }

}