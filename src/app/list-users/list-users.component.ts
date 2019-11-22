import { Component, OnInit, Input } from '@angular/core';
import { Player } from '../shared/player.model';
import { PlayerService } from '../services/player.service';
import { userType } from '../shared/userType.enum';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from '../services/session.service';


@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
  @Input()
  players: Player[]=[];
  ancients: Player[] = [];
  warriors: Player[] = [];
  guildmasters: Player[] = [];
  

  constructor(private playerService: PlayerService, private http: HttpClient, private router: Router, private route: ActivatedRoute, private session: SessionService) { }


  ngOnInit() {
    this.http.get<Player[]>('http://localhost:8085/players/getAll', {}).subscribe(data => {
      console.log(data);
      this.players = data;
      console.log(this.players);
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

  showWarriors(){
    this.router.navigate(['./warriors'], {relativeTo: this.route});
  }

}