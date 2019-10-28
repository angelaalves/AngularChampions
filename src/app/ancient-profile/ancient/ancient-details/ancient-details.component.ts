import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-ancient-details',
  templateUrl: './ancient-details.component.html',
  styleUrls: ['./ancient-details.component.css']
})
export class AncientDetailsComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  redirectCloset(){
    this.router.navigate(['../closet'], {relativeTo: this.route});
  }

  redirectGuilds(){
    this.router.navigate(['../guilds_list'], {relativeTo: this.route});
  }
  redirectEvents(){
    this.router.navigate(['../events'], {relativeTo: this.route});
  }

  redirectWarriors(){
    this.router.navigate(['../list_users'], {relativeTo: this.route});
  }

  redirectAncients(){
    this.router.navigate(['../list_users'], {relativeTo: this.route});
  }

  redirectGuildMasters(){
    this.router.navigate(['../list_users'], {relativeTo: this.route});
  }

  addEvent(){
    this.router.navigate(['./add_events'], {relativeTo: this.route});
  }

  addUser(){
    this.router.navigate(['./add_user'], {relativeTo: this.route});
  }

  addSkin(){
    this.router.navigate(['./add_skin'], {relativeTo: this.route});
  }

  addGuild(){
    this.router.navigate(['./add_guild'], {relativeTo: this.route});
  }
}