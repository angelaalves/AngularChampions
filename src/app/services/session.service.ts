import { Injectable } from '@angular/core';
import { Player } from '../shared/player.model';
import { LoginComponent } from '../login/login.component';
import { Subject } from 'rxjs';
import { Closet } from '../shared/closet.model';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class SessionService {
    playerSession: Player;
    login: LoginComponent;
    isAuthenticated = new Subject<boolean>();

    openSession(player: Player) {
        this.playerSession = player;
    }

    closeSession() {
        this.playerSession = null;
    }

    getPlayerInSession(): Player {
        return this.playerSession;
    }
}