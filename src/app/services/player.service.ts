import { Player } from '../shared/player.model';
import { userType } from '../shared/userType.enum';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 
@Injectable()
export class PlayerService{
  
    players: Player[];
    ancients: Player[] = [];
    warriors: Player[] = [];
    guildmasters: Player[] = [];
 
    constructor(private http:HttpClient){}
 
    getPlayers(){
        return this.http.get<Player[]>('http://localhost:8085/players/getAll', {}).subscribe(data => {
            console.log(data);
            this.players=data; 
            for(let i=0;i<this.players.length;i++){
            if(this.players[i].userType==userType.Warrior){
                this.warriors.push(this.players[i]); 
            }
            if(this.players[i].userType==userType.GuildMaster){
               this.guildmasters.push(this.players[i]);
            }
            if(this.players[i].userType==userType.Ancient){
                this.ancients.push(this.players[i]);
            }
        }
        })
    }


 
    getPlayer(index: number){
        return this.players[index];
    }
 
    addPlayer(player: Player){
        this.players.push(player);
    }
 
    getPlayerType(index: number){
        return this.players[index].userType;
    }
    
}