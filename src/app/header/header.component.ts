import { Component, OnInit, Injectable, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SessionService } from '../services/session.service';
import { SkinService } from '../services/skin.service';
import { Skin } from '../shared/skin.model';
import { userType } from '../shared/userType.enum';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

@Injectable({providedIn: 'root'})
export class HeaderComponent implements OnInit {
  Authenticated=false;
  shoppingCartSkins: Skin[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private session: SessionService, private skinService: SkinService) { }
  
  ngOnInit() {
    this.session.isAuthenticated.subscribe(didAuthenticate=>{
      this.Authenticated=didAuthenticate;
    })
    if(localStorage.getItem('playerlogged')){
      this.session.isAuthenticated.next(true);
    }
    this.skinService.shoppingCartSkins.subscribe(shoppingCart => this.shoppingCartSkins = shoppingCart);
  }

  isItCloset(){
var bol=false;
    if(this.router.url === '/closet'){
      if(this.session.playerSession.userType==userType.Warrior){
          bol=true;
      }    
    }
    return bol;
  }


  removeItem(skin: Skin){
    this.skinService.removeFromShoppingCart(skin);
    //prevents menu from closing when clicked inside
    event.stopPropagation();​
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
    if(this.session.getPlayerInSession().userType==userType.GuildMaster || this.session.getPlayerInSession().userType==userType.Ancient){
      this.router.navigate(['guilds_list'], {relativeTo: this.route});
    }else{
      this.router.navigate(['guild', this.session.getGuildFromPlayer(this.session.getPlayerInSession().idplayer).idguild], {relativeTo: this.route});
    }
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