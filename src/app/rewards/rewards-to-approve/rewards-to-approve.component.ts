import { Component, OnInit } from '@angular/core';
import { Reward } from 'src/app/shared/reward.model';
import { HttpClient } from '@angular/common/http';
import { PlayerService } from 'src/app/services/player.service';
import { Player } from 'src/app/shared/player.model';
import { IDToUsername } from 'src/app/shared/IDMatchedToUsername.model';
import { SessionService } from 'src/app/services/session.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rewards-to-approve',
  templateUrl: './rewards-to-approve.component.html',
  styleUrls: ['./rewards-to-approve.component.css']
})

export class RewardsToApproveComponent implements OnInit {

  public rewardsToApprove: Reward[] = [];
  public rewardsApproved: Reward[] = [];

  public rewardsDisapproved: Reward[] = [];


  public players: Player[] = [];
  public idAndNameOfPlayers: IDToUsername[] = [];

  constructor(private http: HttpClient, private playerService: PlayerService,private router: Router, private route: ActivatedRoute,  private session: SessionService) {}

  ngOnInit() {
    this.players = this.playerService.getListOfPlayers();
    console.log(this.players);
    this.getRewards();
  }

  getRewards() {
    this.http.get<Reward[]>('http://localhost:8085/rewards/getAllRewardsToApprove', {}).subscribe(data => {
      for (let d of data) {
        const split = d.dateOfReward.split("T");
        console.log(split[0]);
        d.dateOfReward = split[0];
        this.rewardsToApprove = data;
      }

      for (let i = 0; i < this.rewardsToApprove.length; i++) {
        for (let p of this.players) {
           if (this.rewardsToApprove[i].idplayerGiverFK == p.idplayer) {
            this.rewardsToApprove[i].idplayerGiverFK = p.userName;
          } if (this.rewardsToApprove[i].idplayerReceiverFK == p.idplayer) {
            this.rewardsToApprove[i].idplayerReceiverFK = p.userName;
          }
        }
      }
    });
  } 

  check(reward: Reward) {
    const obj = JSON.stringify(reward);
    var exists: boolean; 
      exists = false;
     for (let x of this.rewardsApproved) {
      if (x == reward) {
        exists = true;
      }
    }

    if (exists == false) {
 this.rewardsApproved.push(reward);

    } else {

      this.rewardsApproved.splice(this.rewardsApproved.indexOf(reward), 1);

    }

   
  }

  uncheck(reward: Reward) {
    const obj = JSON.stringify(reward);
    var exists: boolean; 
      exists = false;
     for (let x of this.rewardsDisapproved) {
      if (x == reward) {
        exists = true;
      }
    }

    if (exists == false) {
 this.rewardsDisapproved.push(reward);

    } else {

      this.rewardsDisapproved.splice(this.rewardsDisapproved.indexOf(reward), 1);

    }

   
  }

  save() {
    for (let reward of this.rewardsApproved) {
      const idReward = reward.idreward;
      this.http.post<any>('http://localhost:8085/rewards/Approve?idReward=' + idReward,
        { 
          idReward 
        }).subscribe(data => {
          console.log(data);
        });
    }
    for (let reward of this.rewardsDisapproved) {
      const idReward = reward.idreward;
      this.http.post<any>('http://localhost:8085/rewards/Disapprove?idReward=' + idReward,
        { 
          idReward 
        }).subscribe(data => {
          console.log(data);
        });
    }
    this.getRewards();
    
    if (this.session.getPlayerInSession().userType == "Ancient") {
      this.router.navigate(['/ancient_profile'], { relativeTo: this.route });
    }
    if (this.session.getPlayerInSession().userType == "GuildMaster") {
      this.router.navigate(['/guildmaster_profile'], { relativeTo: this.route });
    }
    if (this.session.getPlayerInSession().userType == "Warrior") {
      this.router.navigate(['/warrior_profile'], { relativeTo: this.route });
    }
  }

}