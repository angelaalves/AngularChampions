import { Player } from '../shared/player.model';
import { userType } from '../shared/userType.enum';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
 
@Injectable()
export class PlayerService{
  
    players: Player[];
 
    constructor(private http:HttpClient){}
 
    getPlayers(){
        return this.http.get<Player[]>('http://localhost:8085/players/getAll', {}).subscribe(data => {
            console.log(data);
            this.players=data;
        })
    }

    getWarriors(){
        var warriors: Player[]=[];
        for(let i=0;i<this.players.length;i++){
            if(this.players[i].userType==userType.Warrior){
                warriors.push(this.players[i]);
            }
        }
        return warriors;
    }
    getGuildMaster(){
        var guildmasters: Player[]=[];
        for(let i=0;i<this.players.length;i++){
            if(this.players[i].userType==userType.GuildMaster){
                guildmasters.push(this.players[i]);
            }
        }
        return guildmasters;
    }
    getAncient(){
        var ancients: Player[]=[];
        for(let i=0;i<this.players.length;i++){
            if(this.players[i].userType==userType.Ancient){
                ancients.push(this.players[i]);
            }
        }
        return ancients;
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