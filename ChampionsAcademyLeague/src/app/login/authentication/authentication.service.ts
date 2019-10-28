import { Component, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { User } from './user.model';
import { catchError, tap } from 'rxjs/operators';
import { Subject, throwError } from 'rxjs';
import { Player } from 'src/app/shared/player.model';
import { playerType } from 'src/app/shared/playerType.enum';
import { gender } from 'src/app/shared/playerGender.enum';

interface AuthResponseData{
    kind: string,
    idToken: string,
    email: string, 
    refreshToken: string,
    expiresIn: string,
    localId: string;      
}

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  user = new Subject<Player>();

  constructor(private http: HttpClient ) { }

  signup(email: string, password:string){
    return this.http.post<AuthResponseData>('localhost:8085',
      {
        email: email,
        password: password
      }
    ).pipe(catchError(this.handleError),
    tap(resData => {
        this.handleAuthentication(resData.email, resData.localId)
    }));
  }

  private handleError(errorRes: HttpErrorResponse){
    let errorMessage = 'an unknown error occurred';
    if(!errorRes.error || !errorRes.error.error){
      return throwError(errorMessage);
    }
    switch(errorRes.error.error.message){
      case 'EMAIL_EXISTS':
        errorMessage='this email already exists';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exist';
        break;
      case 'INVALID_PASSWORD':
        errorMessage='This password is not correct';
        break;  
    }
    return throwError(errorMessage);
  }

  private handleAuthentication(email:string,userId:string){
    const expirationDate = new Date(new Date().getTime());
    //const player = new Player(name,email, userId, playerType.GuildMaster );
    //this.user.next(player);
  }
}