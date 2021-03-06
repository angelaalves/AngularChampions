import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-guild-master-details-buttons',
  templateUrl: './guild-master-details-buttons.component.html',
  styleUrls: ['./guild-master-details-buttons.component.css']
})
export class GuildMasterDetailsButtonsComponent {

  constructor(private router: Router, private route: ActivatedRoute) { }

  redirectToRewards(){
    this.router.navigate(['/rewards'], {relativeTo: this.route});
  }

  redirectToRewardsToApprove(){
    this.router.navigate(['/rewards_to_approve'], {relativeTo: this.route});
  }
 
  redirectToCloset(){
    this.router.navigate(['/closet'], {relativeTo: this.route});
  }

  redirectToVideos(){
    this.router.navigate(['/videos'], {relativeTo: this.route});
  }

  redirectToGuilds(){
    this.router.navigate(['/guilds_list'], {relativeTo: this.route});
  }
}