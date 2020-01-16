import { Component, OnInit, Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { Player } from '../shared/player.model';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from '../services/session.service';
import { HttpHeaders, HttpErrorResponse, HttpClient } from '@angular/common/http';
import { AppConfigurationsComponent } from '../app-configurations/app-configurations.component';

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
  public outfit: string[];
  public loginIncorrect : boolean = false;

  ngOnInit() {
    if (localStorage.getItem('playerlogged')) {
      localStorage.removeItem('playerlogged')
      localStorage.removeItem('token')
      this.session.isAuthenticated.next(false)
    }
  }

  constructor(private router: Router, private route: ActivatedRoute, private session: SessionService, private http: HttpClient, private configuration: AppConfigurationsComponent) {
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

  forgotpassword() {
    this.router.navigate(['/forgot_password'], { relativeTo: this.route });
  }

  onSubmit(form: NgForm) {
    this.loginIncorrect=false;
    if (!form.valid) {
      return;
      
    }
    //Login with email and password
    const email = form.value.email;
    const password = form.value.password;
    this.http.post<any>('http://'+this.configuration.getBackEndIP()+':'+this.configuration.getBackEndPort()+'/login', { email: email, password: password }, { observe: 'response' }).subscribe(
      resData => {
        this.loginIncorrect=false;
        let token = resData.body;
        localStorage.setItem('token', token);
        this.http.post<Player>('http://'+this.configuration.getBackEndIP()+':'+this.configuration.getBackEndPort()+'/players/Get?email=' + email, { email: email }).subscribe(resData => {
          if (resData[0].status == 'Active') {
            this.http.get<string[]>('http://'+this.configuration.getBackEndIP()+':'+this.configuration.getBackEndPort()+'/closet/activeSkins?idPlayerFK=' + resData[0].idplayer).subscribe(data => {
              this.outfit = data;
              //Create player so we can give him an imagepath
              this.player = new Player(resData[0].idplayer, resData[0].userName, resData[0].email, resData[0].password, this.outfit, resData[0].xp,
                resData[0].champiesToGive, resData[0].myChampies, resData[0].userType, resData[0].gender, resData[0].status);
              //Give a player to the player session so we can use it on other components
              localStorage.setItem('playerlogged', JSON.stringify(this.player))
              this.session.openSession(this.player);
              //Select the profile using the usertype
              if (this.session.getPlayerInSession().userType == "Ancient") {
                this.session.isAncient.next(true);
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
          } else {
            console.log("Player no longer active")
          }
        },
          error => {
            console.log("Failed Authentication")
          }
        );
       
        form.reset();
      }, error=>{
        this.loginWarning();
      } 
    );    
  }

  loginWarning(){
    if(this.loginIncorrect=true){
      this.router.navigate(['../login_warning_message'], {relativeTo: this.route});
    }
    
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