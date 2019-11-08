import { Component, OnInit, Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from './authentication/authentication.service';
import { map, catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Player } from '../shared/player.model';
import { PlayerService } from '../services/player.service';

interface AuthResponseData {
  kind: string,
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

@Injectable({ providedIn: 'root' })
export class LoginComponent implements OnInit {
  private currentUserSubject: BehaviorSubject<Player>;
  public currentUser: Observable<Player>;

  ngOnInit() {
  }

  constructor(private http: HttpClient, private authService: AuthenticationService, private playerService: PlayerService) {
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
    console.log(email);
    const password = form.value.password;
    console.log(password);
    this.http.post<{name: string}>('http://localhost:8085/players/Login?email='+email+'&password='+password, { email: email, password: password }).subscribe(
      resData=>{
<<<<<<< Updated upstream
<<<<<<< Updated upstream
        console.log(resData);
=======
        
        this.playerService.addPlayer()
>>>>>>> Stashed changes
=======
        
<<<<<<< Updated upstream
        this.playerService.addPlayer()
>>>>>>> Stashed changes
=======
>>>>>>> Stashed changes
        this.playerService.addPlayer()
>>>>>>> Stashed changes
      }
    );
    form.reset();
  }


  signup(email: string, password: string) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:8085/players/getAll', true);
    return this.http.post<AuthResponseData>('http://localhost:8085/players/getAll',
      {
        email: email,
        password: password
      }
    ).pipe(catchError(this.handleError),
      tap(resData => {
        this.handleAuthentication(resData.email, resData.localId)
      })
    ).subscribe();
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