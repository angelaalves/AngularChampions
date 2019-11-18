import { Component, OnInit, Injectable } from '@angular/core';
import { Player } from '../shared/player.model';
import { userType } from '../shared/userType.enum';
import { gender } from '../shared/playerGender.enum';
import { status } from 'src/app/shared/status.enum';
import { AuthenticationService } from '../login/authentication/authentication.service';
import { HttpClient } from '@angular/common/http';
import { LoginComponent } from 'src/app/login/login.component';
import { SessionService } from '../services/session.service';


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

  constructor(private session: SessionService,private http: HttpClient, private authService: AuthenticationService) {
    
  }

  ngOnInit() {
    /*this.ancient= new Player('1', '1','ancient', '456@456.com', '234567', ["../assets/Hair/HairMediumBlonde.png", 
    "../assets/SkinColor/FemaleBlack.png",
    "../assets/Top/TopPolarWhite.png",
    "../assets/Bottom/BottomTrouseWhite.png","../assets/Shoes/ShoesGrey.png","../assets/Others/FairyWings.png"], 
    '100','100','100',playerType.Ancient, gender.Female, status.Active)*/
  }
}