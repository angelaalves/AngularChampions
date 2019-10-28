import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  onProfile(){
    this.router.navigate(['warrior_profile'], {relativeTo: this.route});
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
    this.router.navigate(['login'], {relativeTo: this.route});
  }
}