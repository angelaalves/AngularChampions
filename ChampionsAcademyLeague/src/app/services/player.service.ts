import { Player } from '../shared/player.model';
import { playerType } from '../shared/playerType.enum';
import { Injectable } from '@angular/core';
import { gender } from '../shared/playerGender.enum';

@Injectable()
export class PlayerService{
    imagePath: string[]=["../assets/Hair/HairMediumBlonde.png", 
    "../assets/SkinColor/AngLastairbender.png",
    "../assets/Top/TopPolarWhite.png",
    "../assets/Bottom/BottomTrouseWhite.png"]
    players: Player[]=[
        new Player('One', '123@123.com', '12345', this.imagePath, playerType.Warrior, gender.Male),
        new Player('ancient', '456@456.com', '234567', this.imagePath, playerType.Ancient, gender.Female ),
        new Player('Two', '123@123.com', '12345', this.imagePath, playerType.Warrior, gender.Female)
    ];
    constructor(){}

    getPlayers(){
        return this.players;
    }
    getWarriors(){
        var warriors: Player[]=[];
        for(let i=0;i<this.players.length;i++){
            if(this.players[i].playerType==playerType.Warrior){
                warriors.push(this.players[i]);
            }
        }
        return warriors;
    }
    getGuildMaster(){
        var guildmasters: Player[]=[];
        for(let i=0;i<this.players.length;i++){
            if(this.players[i].playerType==playerType.GuildMaster){
                guildmasters.push(this.players[i]);
            }
        }
        return guildmasters;
    }
    getAncient(){
        var guildmasters: Player[]=[];
        for(let i=0;i<this.players.length;i++){
            if(this.players[i].playerType==playerType.GuildMaster){
                guildmasters.push(this.players[i]);
            }
        }
        return guildmasters;
    }

    getPlayer(index: number){
        return this.players[index];
    }

    addPlayer(player: Player){
        this.players.push(player);
    }

    getPlayerType(index: number){
        return this.players[index].playerType;
    }
}