import { Component, OnInit } from '@angular/core';
import { Player } from '../shared/player.model';
import { PlayerService } from '../services/player.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from '../services/session.service';
import { userType } from '../shared/userType.enum';


@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {

  public list: Player[] = [];
  public players: Player[] = [];
  public ancients: Player[] = [];
  public warriors: Player[] = [];
  public guildmasters: Player[] = [];
  public type: userType;


  constructor(private playerService: PlayerService, private http: HttpClient, private router: Router, private session: SessionService) { }



  ngOnInit() {
    // this.chooseList()

    this.http.get<Player[]>('http://localhost:8188/players/getAll', {}).subscribe(data => {
      this.players = data;
      for (let player of this.players) {
        if (player.userType == "Ancient") {
          this.ancients.push(player);
        }
        if (player.userType == "GuildMaster") {
          this.guildmasters.push(player);
        }
        if (player.userType == "Warrior") {
          this.warriors.push(player);
        }
        else (player.userType)
      }
    })




  }


}