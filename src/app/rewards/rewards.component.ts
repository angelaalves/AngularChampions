import { Component, OnInit, Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm, ControlContainer } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Player } from '../shared/player.model';
import { RewardService } from '../services/reward.service';
import { SessionService } from '../services/session.service';
import { PlayerService } from '../services/player.service';
import { format } from 'url';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.component.html',
  styleUrls: ['./rewards.component.css']
})

@Injectable({ providedIn: 'root' })
export class RewardsComponent implements OnInit {
  valueSelected= new Subject<string>();
  selected = '0';
  idReward: number = 1;
  playerGiver: Player;
  playerReceiver: Player;
  giver: String;
  warriors: Player[] = [];
  warriorSelected: boolean = false;
  receiver: string;
  champies: string;

  champiesgiven:String="";
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private rewardsToApprove: RewardService, private sessionService: SessionService, private playerService: PlayerService) { }

  ngOnInit() {
    this.valueSelected.subscribe(value=>{
      this.selected=value;
    })
    this.giver = this.sessionService.getPlayerInSession().userName;
    if(this.warriors.length<=0){
      this.warriors = this.playerService.getWarriors();
    }
    console.log(this.warriors);
    let index = -1;
    for (let el of this.warriors) {
      this.receiver = el.userName;
      index++;
      if (el.userName == this.giver) {
        this.warriors.splice(index, 1);
      }
    }
  }

  onPlayerSelection(warriorEl: Player) {
    this.warriorSelected = true;
    this.playerReceiver = warriorEl;
  }
  
  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const playerGiver = this.sessionService.getPlayerInSession().userName;
    const playerReceiver = form.value.receiver;
    const timeSpent = form.value.time;
    const reason = form.value.reason;
    this.http.post('http://localhost:8085/rewards/Reward?playerGiver=' + playerGiver + '&playerReceiver=' + playerReceiver + '&time=' + timeSpent + '&justification=' + reason, { playerGiver, playerReceiver, timeSpent, reason }).subscribe(resData => {
      console.log("success")
    }, error => {
      console.log("something went wrong")
    })
    if (this.sessionService.getPlayerInSession().userType == "Ancient") {
      this.router.navigate(['/ancient_profile'], { relativeTo: this.route });
    }
    if (this.sessionService.getPlayerInSession().userType == "GuildMaster") {
      this.router.navigate(['/guildmaster_profile'], { relativeTo: this.route });
    }
    if (this.sessionService.getPlayerInSession().userType == "Warrior") {
      this.router.navigate(['/warrior_profile'], { relativeTo: this.route });
    }
  }

setChampiesgiven(champies:String){
 console.log(champies);
}
changeValueSelected(i:string){
  console.log(i)
  console.log(this.selected)
  this.valueSelected.next(i);
}

}