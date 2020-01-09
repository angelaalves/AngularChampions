import { Component, OnInit, Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from './authentication/authentication.service';
import { map, catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Player } from '../shared/player.model';
import { userType } from '../shared/userType.enum';
import { Router, ActivatedRoute } from '@angular/router';
import { PlayerService } from 'src/app/services/player.service';
import { UserLoggedComponent } from '../user-logged/user-logged.component';
import { AncientProfileComponent } from '../ancient-profile/ancient-profile.component';
import { WarriorComponent } from '../warrior/warrior.component';
import { GuildMasterComponent } from '../guild-master/guild-master.component';
import { SessionService } from '../services/session.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

@Injectable({ providedIn: 'root' })
export class LoginComponent implements OnInit {
  private currentUserSubject: BehaviorSubject<Player>;
  public currentUser: Observable<Player>;
  public player: Player;
  public data: AuthenticationService;



  ngOnInit() {
  }

  constructor(private session: SessionService, private http: HttpClient, private authService: AuthenticationService, private router: Router, private route: ActivatedRoute) {
    this.currentUserSubject = new BehaviorSubject<Player>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Player {
    return this.currentUserSubject.value;
  }

  private chooseprofile(player: Player) {
    if (player.userType == userType.Ancient) {
      this.router.navigate(['/ancient_profile'], { relativeTo: this.route });
    }
    if (player.userType == userType.GuildMaster) {
      this.router.navigate(['guildmaster_profile'], { relativeTo: this.route });
    }
    if (player.userType == userType.Warrior) {
      this.router.navigate(['warrior_profile'], { relativeTo: this.route });
    }
  }

  private getImagePath(playerid: String) {

    return ["../assets/Hair/HairMediumBlonde.png",
      "../assets/SkinColor/FemaleBlack.png",
      "../assets/Top/TopPolarWhite.png",
      "../assets/Bottom/BottomTrouseWhite.png", "../assets/Shoes/ShoesGrey.png", "../assets/Others/FairyWings.png"];

  }

  private createuser(obj:Player) {

    const player=new Player (obj.idPlayer,obj.idGuild,obj.UserName, obj.email, obj.password, obj.gender, obj.userType, obj.xp, obj.ChampiesToGive, obj.MyChampies, obj.Status,this.getImagePath(obj.idPlayer));
 
    /*
  const user=new Player(player.idPlayer,player.idGuild,player.UserName,player.email,player.password,player.gender,player.userType,player.xp,player.ChampiesToGive,player.MyChampies,player.Status,player.imagePath);
  console.log("Player ImagePath"+user.imagePath );
  return user;
  */

  return player;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    this.authService.signup(email, password).subscribe(
      resData => {
        this.http.post<Player>('http://localhost:8085/players/Login', { email, password })
        console.log(resData);
        this.createuser(resData);
        this.player = this.createuser(resData);
        console.log("Quero ver aqui: "+this.player);
       // this.session.playerSession = resData;
        this.session.openSession(this.createuser(resData));
        console.log("Login: "+this.session.getPlayerInSession());
        this.chooseprofile(this.session.getPlayerInSession());
      }
    );
    form.reset();
  }



  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'an unknown error occurred';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'this email already exists';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct';
        break;
    }
    return throwError(errorMessage);
  }

  private handleAuthentication(email: string, userId: string) {
    const expirationDate = new Date(new Date().getTime());
    //const player = new Player(name,email, userId, playerType.GuildMaster );
    //this.user.next(player);
  }



}