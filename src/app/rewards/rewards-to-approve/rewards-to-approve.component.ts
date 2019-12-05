import { Component, OnInit } from '@angular/core';
import { Reward } from 'src/app/shared/reward.model';
import { HttpClient } from '@angular/common/http';
import { PlayerService } from 'src/app/services/player.service';
import { Player } from 'src/app/shared/player.model';
import { IDToUsername } from 'src/app/shared/IDMatchedToUsername.model';

@Component({
  selector: 'app-rewards-to-approve',
  templateUrl: './rewards-to-approve.component.html',
  styleUrls: ['./rewards-to-approve.component.css']
})

export class RewardsToApproveComponent implements OnInit {

  public rewardsToApprove: Reward[] = [];
  public rewardsApproved: Reward[] = [];

  public players: Player[] = [];
  public idAndNameOfPlayers: IDToUsername[] = [];

  constructor(private http: HttpClient, private playerService: PlayerService) { }

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
        console.log("linha 41");
        for (let p of this.players) {
          console.log("linha 43");
          if (this.rewardsToApprove[i].idplayerGiverFK == p.idplayer) {
            console.log(p.userName);
            this.rewardsToApprove[i].idplayerGiverFK = p.userName;
            console.log(p.userName);
          } if (this.rewardsToApprove[i].idplayerReceiverFK == p.idplayer) {
            this.rewardsToApprove[i].idplayerReceiverFK = p.userName;
            console.log(p.userName);
          }
        }
      }
    });
  } 

  check(reward: Reward) {
    const obj = JSON.stringify(reward);
    console.log(this.rewardsApproved.push(reward));
    this.rewardsApproved.push(reward);
    console.log("Reward approved " + obj);
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
  }
}