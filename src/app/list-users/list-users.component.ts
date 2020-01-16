import { Component, OnInit } from '@angular/core';
import { Player } from '../shared/player.model';
import { HttpClient } from '@angular/common/http';
import { userType } from '../shared/userType.enum';
import { AppConfigurationsComponent } from '../app-configurations/app-configurations.component';


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


  constructor(private http: HttpClient,private configuration: AppConfigurationsComponent) { }



  ngOnInit() {
    this.http.get<Player[]>('http://'+this.configuration.getBackEndIP()+':'+this.configuration.getBackEndPort()+'/players/getAll', {}).subscribe(data => {
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