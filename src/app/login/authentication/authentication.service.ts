import { Component, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';
import { Player } from 'src/app/shared/player.model';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  user = new Subject<Player>();

  constructor(private http: HttpClient) { }

  signup(email: string, password: string) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:8085/players/Login?email='+email+'&password='+password, true); 
    return this.http.post<Player>('http://localhost:8085/players/Login?email='+email+'&password='+password,
      {
        email: email,
        password: password
      }
    ).pipe(catchError(this.handleError),
      tap(resData => {
        this.handleAuthentication(resData.idplayer, resData.idguildFK, resData.userName, resData.email, resData.password, 
           resData.gender, resData.userType, resData.xp, resData.champiesToGive, resData.myChampies, resData.status )
      })   
    );
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

  private handleAuthentication(idPlayer:string, idGuild: string, UserName:string, email:string, password:string,  gender:string, userType: string, xp: string, ChampiesToGive:string, MyChampies: string, Status: string) {
    const expirationDate = new Date(new Date().getTime());
    //const player = new Player(name,email, userId, playerType.GuildMaster );
    //this.user.next(player);
  }
}