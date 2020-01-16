import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-warrior-details-xp',
  templateUrl: './warrior-details-xp.component.html',
  styleUrls: ['./warrior-details-xp.component.css']
})


export class WarriorDetailsXPComponent implements OnInit {
  @Input() XP:number;
  barXP:number;
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.percentageXP();
  }
  percentageXP(){
    this.barXP=this.XP/10;
 
 
  }
}
