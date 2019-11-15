import { Component, OnInit, Injectable } from '@angular/core';
import { Player } from '../shared/player.model';
import { userType } from '../shared/userType.enum';
import { gender } from '../shared/playerGender.enum';
import { status } from 'src/app/shared/status.enum';
import { AuthenticationService } from '../login/authentication/authentication.service';
import { HttpClient } from '@angular/common/http';
import { LoginComponent } from 'src/app/login/login.component';
import { UserLoggedComponent } from 'src/app/user-logged/user-logged.component';


interface AuthResponseData {
  kind: string,
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string;
}

@Component({
  selector: 'app-closet',
  templateUrl: './closet.component.html',
  styleUrls: ['./closet.component.css']
})

@Injectable({ providedIn: 'root' })
export class ClosetComponent implements OnInit {
  player: Player;

  constructor(private userloged: UserLoggedComponent,private http: HttpClient, private authService: AuthenticationService) {
    
  }

  ngOnInit() {
  this.player=this.userloged.getPlayer();
  }
}