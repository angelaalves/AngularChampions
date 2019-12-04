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
    this.players = this.playerService.players;
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
      let counter = 0;
 
      for (let p of this.players) {
        for (let i=0; i<this.rewardsToApprove.length; i++) { 
          if (p.idplayer == this.rewardsToApprove[i].idplayerGiverFK) {
            console.log(p.userName);
            this.rewardsToApprove[i].idplayerGiverFK = p.userName;
            console.log(p.userName);
          } if (p.idplayer == this.rewardsToApprove[i].idplayerReceiverFK) {
            this.rewardsToApprove[i].idplayerReceiverFK = p.userName;
            console.log(p.userName);
          }
        }
      }
      //console.log(this.idAndNameOfPlayers);
    });
    for (let r of this.rewardsToApprove) {
      this.searchName(r);
      console.log(this.searchName(r));
    }
  }

  searchName(reward: Reward) {
    for (let x of this.idAndNameOfPlayers) {
      if (reward.idplayerGiverFK == x.idPlayer) {
        console.log(x.username);
        return x.username;
      }
    }
  }

  check(reward: Reward) {
    this.rewardsApproved.push(reward);
    console.log(reward);
  }

  save() {
    //let counter = -1;
    for (let reward of this.rewardsApproved) {
      /*counter++;
      //removes the now approved reward from the rewards to approve array
      if (reward.idReward == reward.idReward) {
        this.rewardsToApprove.slice(counter, 1);
      }*/
      const idReward = reward.idreward;


      //valor passado no pedido http fica undefined
      this.http.post<any>('http://localhost:8085/rewards/Approve?idReward=' + idReward,
        { idReward }).subscribe(data => {
          console.log(data);
        });
    }
  }
}