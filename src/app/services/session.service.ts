import { Injectable } from '@angular/core';
import { Player } from '../shared/player.model';

@Injectable({providedIn: 'root'})
export class SessionService{
    playerSession: Player;

    OpenSession(player:Player){
        this.playerSession=player;
    }
    
    CloseSession(){
        this.playerSession=null;
    }

    getPlayerInSession(){
        return this.playerSession;
    }

}