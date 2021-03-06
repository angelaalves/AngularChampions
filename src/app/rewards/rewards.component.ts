import { Component, OnInit, Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm, ControlContainer } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Player } from '../shared/player.model';
import { SessionService } from '../services/session.service';
import { PlayerService } from '../services/player.service';
import { Subject } from 'rxjs';
import { AppConfigurationsComponent } from '../app-configurations/app-configurations.component';

@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.component.html',
  styleUrls: ['./rewards.component.css']
})

@Injectable({ providedIn: 'root' })
export class RewardsComponent implements OnInit {
  valueSelected = new Subject<string>();
  selected = '0';
  idReward: number = 1;
  playerGiver: Player;
  playerReceiver: Player;
  giver: String;
  warriors: Player[] = [];
  warriorSelected: boolean = false;
  receiver: string;
  champies: string;

  champiesgiven: String = "";
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient, private sessionService: SessionService, private playerService: PlayerService, private configuration: AppConfigurationsComponent) { }

  ngOnInit() {
    this.valueSelected.subscribe(value => {
      this.selected = value;
    })
    this.giver = this.sessionService.getPlayerInSession().userName;
    if (this.warriors.length <= 0) {
      this.warriors = this.playerService.getWarriors();
    }
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
    this.http.post('http://'+this.configuration.getBackEndIP()+':'+this.configuration.getBackEndPort()+'/rewards/Reward?playerGiver=' + playerGiver + '&playerReceiver=' + playerReceiver + '&time=' + timeSpent + '&justification=' + reason, { playerGiver, playerReceiver, timeSpent, reason }).subscribe(resData => {
      this.http.post<Player>('http://'+this.configuration.getBackEndIP()+':'+this.configuration.getBackEndPort()+'/players/Get?userName=' + playerGiver, {}).subscribe(resData => {

        //Create player so we can give him an imagepath
        var player = new Player(resData[0].idplayer, resData[0].userName, resData[0].email, resData[0].password, this.sessionService.getPlayerInSession().imagePath, resData[0].xp,
          resData[0].champiesToGive, resData[0].myChampies, resData[0].userType, resData[0].gender, resData[0].status);
        //Give a player to the player session so we can use it on other components
        localStorage.setItem('playerlogged', JSON.stringify(player))
        this.sessionService.openSession(player);
        if (this.sessionService.getPlayerInSession().userType == "Ancient") {
          this.router.navigate(['/ancient_profile'], { relativeTo: this.route });
        }
        if (this.sessionService.getPlayerInSession().userType == "GuildMaster") {
          this.router.navigate(['/guildmaster_profile'], { relativeTo: this.route });
        }
        if (this.sessionService.getPlayerInSession().userType == "Warrior") {
          this.router.navigate(['/warrior_profile'], { relativeTo: this.route });
        }
      });
      console.log("success")
    }, error => {
      console.log("something went wrong")
    })
  }

  setChampiesgiven(champies: String) {
    console.log(champies);
  }
  timeSelected(time: string) {
    if (time == "Short") {
      this.valueSelected.next('1');
    } else if (time == "Medium") {
      this.valueSelected.next('2');
    } else if (time == "Long") {
      this.valueSelected.next('3')
    }
  }
}