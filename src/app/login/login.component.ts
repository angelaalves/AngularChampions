import { Component, OnInit, Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthenticationService } from './authentication/authentication.service';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Player } from '../shared/player.model';
import { Router, ActivatedRoute } from '@angular/router';
import { PlayerService } from 'src/app/services/player.service';
import { SessionService } from '../services/session.service';
import { HttpHeaders, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { HeaderComponent } from '../header/header.component';

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
  public outfit: string[];

  ngOnInit() {

  }

  constructor(private router: Router, private route: ActivatedRoute, private session: SessionService, private http: HttpClient, private authService: AuthenticationService, private playerService: PlayerService, private header: HeaderComponent) {
  }

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'aplication/json'
    }),
    observe: 'response'
  };

  public get currentUserValue(): Player {
    return this.currentUserSubject.value;
  }

  private getImagePathlog(playerid: String) {
    this.http.get<string[]>('http://localhost:8085/closet/activeSkins?idPlayerFK=' + playerid).subscribe(data => {
      this.outfit = data;
    });
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
    //Login with email and password
    const email = form.value.email;
    const password = form.value.password;
    this.http.post<any>('http://localhost:8085/login', { email: email, password: password }, { observe: 'response' }).subscribe(
      resData => {
        let token = resData.body;
        localStorage.setItem('token', token);
        this.http.post<Player>('http://localhost:8085/players/Get?email=' + email, { email: email }).subscribe(resData => {
          if (resData[0].status == 'Active') {
            this.http.get<string[]>('http://localhost:8085/closet/activeSkins?idPlayerFK=' + resData[0].idplayer).subscribe(data => {
              this.outfit = data;
              //Create player so we can givew him an imagepath
              this.player = new Player(resData[0].idplayer,  resData[0].userName, resData[0].email, resData[0].password, this.outfit, resData[0].xp,
                resData[0].champiesToGive, resData[0].myChampies, resData[0].userType, resData[0].gender, resData[0].status);
              //Give a player to the player session so we can use it on other components
              localStorage.setItem('playerlogged', JSON.stringify(this.player))
              this.session.openSession(this.player);
              //Select the profile using the usertype
              if (this.session.getPlayerInSession().userType == "Ancient") {
                this.router.navigate(['/ancient_profile'], { relativeTo: this.route });
              }
              if (this.session.getPlayerInSession().userType == "GuildMaster") {
                this.router.navigate(['/guildmaster_profile'], { relativeTo: this.route });
              }
              if (this.session.getPlayerInSession().userType == "Warrior") {
                this.router.navigate(['/warrior_profile'], { relativeTo: this.route });
              }
              this.session.isAuthenticated.next(true);
            })
          } else{
            console.log("Player no longer active")
          }
        },
          error => {
            console.log("Failed Authentication")
          }
        );
        form.reset();
      }
    )
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
}