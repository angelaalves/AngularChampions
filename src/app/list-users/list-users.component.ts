import { Component, OnInit } from '@angular/core';
import { Player } from '../shared/player.model';
import { PlayerService } from '../services/player.service';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from '../services/session.service';
import { Location } from "@angular/common";
import { userType } from '../shared/userType.enum';
import { status } from '../shared/status.enum';


@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent implements OnInit {
 



   public list: Player[] = [];
   public players: Player[] = [];
   public ancients: Player[] = [];
   public  warriors: Player[] = [];
   public guildmasters: Player[] = [];
   public type: userType;


  constructor(private playerService: PlayerService, private http: HttpClient, private router: Router, private session: SessionService) { }



  ngOnInit() {
// this.chooseList()

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

/*setType(userType){
  this.type = userType;
}
  chooseList() {   
    this.players = this.playerService.players;

    this.ancients = this.playerService.ancients;
    this.warriors = this.playerService.warriors;
    this.guildmasters = this.playerService.guildmasters;

    console.log(this.players);
    console.log( this.ancients);
    console.log(this.warriors);
    console.log(this.guildmasters);
    console.log(this.type);

    if (this.type == "Ancient") {
      this.list = this.ancients;
        console.log( this.list);

    }
    if (this.type == "GuildMaster") {
      this.list = this.guildmasters;  
      console.log( this.list);
    }
    if (this.type == "Warrior") {
      this.list = this.warriors; 
       console.log( this.list);
    }
  // else (this.type)
// this.list = this.players;  

  }*/

}


