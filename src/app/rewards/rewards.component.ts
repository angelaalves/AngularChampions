import { Component, OnInit, Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Reward } from '../shared/reward.model';
import { formatDate } from '@angular/common';
import { Player } from '../shared/player.model';
import { RewardService } from '../services/reward.service';

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

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private rewardsToApprove: RewardService) {}

  ngOnInit() {
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const idRewardToGive = String(this.idReward);
    const idPlayerGiverFK = "2"; //getIdFromGivingPlayer
    const idPlayerReceiverFK = "3";
    const champiesGiven = "10"; //attributed based on the time spent
    const date = formatDate(new Date(), 'yyyy/MM/dd', 'en');
    const sendTo = form.value.to;
    const reasonTheRewardIsGiven = form.value.reason;
    const approved = 0;
    const timeSpent = form.value.time;

    this.rewardsToApprove.addToArray(new Reward(idRewardToGive, idPlayerGiverFK, idPlayerReceiverFK, champiesGiven, date, approved.toString(), timeSpent));
    console.log(this.rewardsToApprove);
    this.http.post<Reward>('http://localhost:8085/rewards/Create?idReward=' + idRewardToGive + '&idPlayerGiverFK=' + idPlayerGiverFK + "&idPlayerReceiverFK="
      + idPlayerReceiverFK + '&champiesGiven=' + champiesGiven + '&dateOfReward=' + date + '&approved=' + approved + "&timeSpent=" + timeSpent,
      {
        idRewardToGive,
        idPlayerGiverFK,
        idPlayerReceiverFK,
        champiesGiven,
        date,
        approved,
        timeSpent
      }
    ).subscribe();

    this.idReward++;

    this.http.get<Player>('http://localhost:8085/players/Get?idPlayer=' + idPlayerGiverFK + '&idGuildFK= &userName= &email= &password= &gender= &userType= &xp= &champiesToGive= &myChampies= &status= ', {}).subscribe(data => {
      console.log(data[0]);
      this.playerGiver = data[0];
      console.log(this.playerGiver = data[0]);
      console.log("champies to give " + this.playerGiver.champiesToGive + " email " + this.playerGiver.email + " gender " + this.playerGiver.gender +
        " id guild " + this.playerGiver.idguildFK + " id player " + this.playerGiver.idplayer + " image path " + [] + " my champies " + this.playerGiver.myChampies
        + " password " + this.playerGiver.password + " status " + this.playerGiver.status + " username " + this.playerGiver.userName
        + " user type " + this.playerGiver.userType + " xp " + this.playerGiver.xp);

      this.http.get<Player>('http://localhost:8085/players/Get?idPlayer=' + idPlayerReceiverFK + '&idGuildFK= &userName= &email= &password= &gender= &userType= &xp= &champiesToGive= &myChampies= &status= ', {}).subscribe(data => {
        console.log(data[0]);
        this.playerReceiver = data[0];
        console.log(this.playerReceiver = data[0]);
        console.log("champies to give " + this.playerReceiver.champiesToGive + " email " + this.playerReceiver.email + " gender " + this.playerReceiver.gender +
          " id guild " + this.playerReceiver.idguildFK + " id player " + this.playerReceiver.idplayer + " image path " + [] + " my champies " 
          + this.playerReceiver.myChampies + " password " + this.playerReceiver.password + " status " + this.playerReceiver.status + " username " 
          + this.playerReceiver.userName + " user type " + this.playerReceiver.userType + " xp " + this.playerReceiver.xp);

        const idplayerGiver = this.playerGiver.idplayer;
        const idguildGiver = this.playerGiver.idguildFK;
        const usernameGiver = this.playerGiver.userName;
        const emailGiver = this.playerGiver.email;
        const passwordGiver = this.playerGiver.password;
        const genderGiver = this.playerGiver.gender;
        const usertypeGiver = this.playerGiver.userType;
        const xpGiver= this.playerGiver.xp;
        let champiesToGiveGiver = 0;
        if(timeSpent=="Short"){
          champiesToGiveGiver = Number(this.playerGiver.champiesToGive) - 1;
        }else if(timeSpent=="Medium"){
          champiesToGiveGiver = Number(this.playerGiver.champiesToGive) - 2;
        }else if(timeSpent=="Long"){
          champiesToGiveGiver = Number(this.playerGiver.champiesToGive) - 3;
        }
        const myChampiesGiver = this.playerGiver.myChampies;
        const statusGiver = this.playerGiver.status;

        this.http.post<Player>('http://localhost:8085/players/Update?idPlayer=' + idplayerGiver + '&idGuildFK=' + idguildGiver + '&userName=' + usernameGiver
          + '&email=' + emailGiver + '&password=' + passwordGiver + '&gender=' + genderGiver + '&userType=' + usertypeGiver + '&xp=' + xpGiver +
          '&champiesToGive=' + champiesToGiveGiver + '&myChampies=' + myChampiesGiver + '&status=' + statusGiver,
          {
            idplayerGiver,
            idguildGiver,
            usernameGiver,
            emailGiver,
            passwordGiver,
            genderGiver,
            usertypeGiver,
            xpGiver,
            champiesToGiveGiver,
            myChampiesGiver,
            statusGiver
          }
        ).subscribe();

        const idplayerReceiver = this.playerReceiver.idplayer;
        const idguildReceiver = this.playerReceiver.idguildFK;
        const usernameReceiver = this.playerReceiver.userName;
        const emailReceiver = this.playerReceiver.email;
        const passwordReceiver = this.playerReceiver.password;
        const genderReceiver = this.playerReceiver.gender;
        const usertypeReceiver = this.playerReceiver.userType;
        let xpReceiver = 0;
        if(timeSpent=="Short"){
          xpReceiver = Number(this.playerReceiver.xp) + 5;
        }else if(timeSpent=="Medium"){
          xpReceiver = Number(this.playerReceiver.xp) + 10;
        }else if(timeSpent=="Long"){
          xpReceiver = Number(this.playerReceiver.xp) + 15;
        }
        let champiesToGiveReceiver = 0;
        if(timeSpent=="Short"){
          champiesToGiveReceiver = Number(this.playerReceiver.champiesToGive) + 1;
        }else if(timeSpent=="Medium"){
          champiesToGiveReceiver = Number(this.playerReceiver.champiesToGive) + 2;
        }else if(timeSpent=="Long"){
          champiesToGiveReceiver = Number(this.playerReceiver.champiesToGive) + 3;
        }
        const myChampiesReceiver = this.playerReceiver.myChampies;
        const statusReceiver = this.playerReceiver.status;

        this.http.post<Player>('http://localhost:8085/players/Update?idPlayer=' + idplayerReceiver + '&idGuildFK=' + idguildReceiver + '&userName=' + usernameReceiver
          + '&email=' + emailReceiver + '&password=' + passwordReceiver + '&gender=' + genderReceiver + '&userType=' + usertypeReceiver + '&xp=' + xpReceiver +
          '&champiesToGive=' + champiesToGiveReceiver + '&myChampies=' + myChampiesReceiver + '&status=' + statusReceiver,
          {
            idplayerReceiver,
            idguildReceiver,
            usernameReceiver,
            emailReceiver,
            passwordReceiver,
            genderReceiver,
            usertypeReceiver,
            xpReceiver,
            champiesToGiveReceiver,
            myChampiesReceiver,
            statusReceiver
          }
        ).subscribe();

        form.reset();

        this.router.navigate(['/ancient_profile'], { relativeTo: this.route });
      });
    }
  )};
}