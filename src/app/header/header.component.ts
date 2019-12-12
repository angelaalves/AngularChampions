import { Component, OnInit, Injectable, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserLoggedComponent } from '../user-logged/user-logged.component';
import { SessionService } from '../services/session.service';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

@Injectable({providedIn: 'root'})
export class HeaderComponent implements OnInit {
  constructor(private router: Router, private route: ActivatedRoute, private session: SessionService) { }
  isAuthenticated=false;
  ngOnInit() {
    this.session.isAuthenticated.subscribe(didAuthenticate=>{
      this.Authenticated=didAuthenticate;
    })
  }

  switchAuthentication(){
    this.isAuthenticated=!this.isAuthenticated;
  }
  onProfile(){
    if (this.session.getPlayerInSession().userType == "Ancient") {
      this.router.navigate(['/ancient_profile'], { relativeTo: this.route });
    }
    if (this.session.getPlayerInSession().userType == "GuildMaster") {
      this.router.navigate(['/guildmaster_profile'], { relativeTo: this.route });
    }
    if (this.session.getPlayerInSession().userType == "Warrior") {
      this.router.navigate(['/warrior_profile'], { relativeTo: this.route });
    }
  }
  onCloset(){
    this.router.navigate(['closet'], {relativeTo: this.route});
  }
  onReward(){
    this.router.navigate(['rewards'], {relativeTo: this.route});
  }
  onVideos(){
    this.router.navigate(['videos'], {relativeTo: this.route});
  }
  onGuild(){
    this.router.navigate(['guild'], {relativeTo: this.route});
  }
  onEvents(){
    this.router.navigate(['events'], {relativeTo: this.route});
  }
  onNotifications(){
    this.router.navigate(['notifications'], {relativeTo: this.route});
  }
  onSignout(){
    localStorage.removeItem('playerlogged')
    localStorage.removeItem('token')
    this.router.navigate(['login'], {relativeTo: this.route});
  }

  handleAuthentication(){
    console.log("fui chamado")
    console.log(this.isAuthenticated)
    this.isAuthenticated=!this.isAuthenticated;
    console.log(this.isAuthenticated)
  }
}