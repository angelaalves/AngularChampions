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

  constructor(private http: HttpClient, private authService: AuthenticationService, private userlogged: UserLoggedComponent) {
    this.currentUserSubject = new BehaviorSubject<Player>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Player {
    return this.currentUserSubject.value;
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
        this.player= resData;
 console.log(this.player.userType);
 console.log(userType.Ancient +"   " +userType.GuildMaster   +"   " +userType.Warrior);
this.userlogged.player= resData;
console.log(this.userlogged.player);

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