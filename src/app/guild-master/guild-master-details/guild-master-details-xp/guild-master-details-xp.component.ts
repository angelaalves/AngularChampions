import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-guild-master-details-xp',
  templateUrl: './guild-master-details-xp.component.html',
  styleUrls: ['./guild-master-details-xp.component.css']
})


export class GuildMasterDetailsXpComponent implements OnInit {
  @Input() XP:number;
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
   this.percentageXP();
    
  }

  percentageXP(){
    this.XP=this.XP/10000
 
 
  }
}