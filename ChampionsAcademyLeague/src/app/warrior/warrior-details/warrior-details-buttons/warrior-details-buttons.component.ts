import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-warrior-details-buttons',
  templateUrl: './warrior-details-buttons.component.html',
  styleUrls: ['./warrior-details-buttons.component.css']
})
export class WarriorDetailsButtonsComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  onVideos(){
    this.router.navigate(['../videos'], {relativeTo: this.route});
  }

  onReward(){
    this.router.navigate(['../rewards'], {relativeTo: this.route});
  }

  onCloset(){
    this.router.navigate(['../closet'], {relativeTo: this.route});
  }

}
