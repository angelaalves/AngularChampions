import { Injectable } from '@angular/core';
import { Player } from '../shared/player.model';

@Injectable({providedIn: 'root'})
export class SessionService{
    playerSession: Player;
   

    openSession(player:Player){
        this.playerSession=player;
        console.log("Session open: "+ this.playerSession);
    }
    
    closeSession(){
        this.playerSession=null;
    }

    getPlayerInSession(){
        return this.playerSession;
        console.log("Session atribute player: "+ this.playerSession);
    }

}