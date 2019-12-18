import { Component, OnInit, Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Player } from '../shared/player.model';
import { RewardService } from '../services/reward.service';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.component.html',
  styleUrls: ['./rewards.component.css']
})

@Injectable({providedIn:'root'})
export class RewardsComponent implements OnInit {
  idReward: number = 1;
  playerGiver: Player;
  playerReceiver: Player;
  giver: String;
  

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private rewardsToApprove: RewardService, private sessionService: SessionService) {}

  ngOnInit() {
    this.giver= this.sessionService.getPlayerInSession().userName;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const playerGiver=this.sessionService.getPlayerInSession();
    const playerReceiver=form.value.to;
    const timeSpent=form.value.time;
    const reason=form.value.reason;
    this.http.post('http://localhost:8085/rewards/Reward',{playerGiver, playerReceiver, timeSpent, reason}).subscribe(resData=>{
      console.log("success")
    }, error=>{
      console.log("something went wrong")
    })

  }
}