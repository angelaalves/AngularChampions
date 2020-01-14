import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-guild-master-details-xp',
  templateUrl: './guild-master-details-xp.component.html',
  styleUrls: ['./guild-master-details-xp.component.css']
})

export class GuildMasterDetailsXpComponent implements OnInit {
  @Input() XP: number;
  barXP: number;

  ngOnInit() {
    this.percentageXP();
  }

  percentageXP() {
    this.barXP = this.XP / 10;
  }
}