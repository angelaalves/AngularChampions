import { Injectable, OnInit, EventEmitter } from '@angular/core';
import { Player } from '../shared/player.model';
import { LoginComponent } from '../login/login.component';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SessionService implements OnInit{
    playerSession: Player;
    login: LoginComponent;
    isAuthenticated=new Subject<boolean>();
    
    ngOnInit() {
    }
    openSession(player:Player){
        this.playerSession=player; 
    }

    closeSession() {
        this.playerSession = null;
    }

    getPlayerInSession(): Player {
        return this.playerSession;
    }
}