import { Component, OnInit } from '@angular/core';
import { Reward } from 'src/app/shared/reward.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-rewards-to-approve',
  templateUrl: './rewards-to-approve.component.html',
  styleUrls: ['./rewards-to-approve.component.css']
})

export class RewardsToApproveComponent implements OnInit {

  public rewardsToApprove: Reward[] = [];
  public rewardsApproved: Reward[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get<Reward[]>('http://localhost:8085/rewards/getAllRewardsToApprove', {}).subscribe(data => {
      console.log(data);
      this.rewardsToApprove = data;
    });
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
      const idReward = reward.idReward;

      
      //valor passado no pedido http fica undefined
      this.http.post<any>('http://localhost:8085/rewards/Approve?idReward=' + idReward,
        {idReward}).subscribe(data => {
          console.log(data);
        });
    }
  }
}