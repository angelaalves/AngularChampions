import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-warrior-details-xp',
  templateUrl: './warrior-details-xp.component.html',
  styleUrls: ['./warrior-details-xp.component.css']
})
export class WarriorDetailsXPComponent implements OnInit {
  @Input() XP:number;
  constructor() { }

  ngOnInit() {
  }

}