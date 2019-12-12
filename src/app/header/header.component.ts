import { Component, OnInit, Injectable, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

@Injectable({providedIn: 'root'})
export class HeaderComponent implements OnInit {
  Authenticated=false;
  constructor(private router: Router, private route: ActivatedRoute, private session: SessionService) { }
  
  ngOnInit() {
    this.session.isAuthenticated.subscribe(didAuthenticate=>{
      this.Authenticated=didAuthenticate;
    })
    if(localStorage.getItem('playerlogged')){
      this.session.isAuthenticated.next(true);
    }
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
    this.Authenticated=false;
    this.router.navigate(['login'], {relativeTo: this.route});
  }

}