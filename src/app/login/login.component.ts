import { Component, OnInit, Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from './authentication/authentication.service';
import { map, catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Player } from '../shared/player.model';

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

  constructor(private http: HttpClient, private authService: AuthenticationService) {
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
    this.authService.signup(email, password).subscribe(
      resData => {
        this.http.post<any>('http://localhost:8085/players/Login?email=${email}&password=${password}', { email, password }).pipe(map(user => {
          // login successful if there's a jwt token in the response
          if (user && user.token) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
          }
          return user;
        }));
        console.log(resData);
      }
    );
    form.reset();
  }
}