import { Component, OnInit, Injectable } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ListUsersComponent } from 'src/app/list-users/list-users.component';
import { userType } from 'src/app/shared/userType.enum';
import { TableFilterPipe } from 'src/app/list-users/user-list.pipe';
import { Player } from 'src/app/shared/player.model';

@Component({
  selector: 'app-ancient-details',
  templateUrl: './ancient-details.component.html',
  styleUrls: ['./ancient-details.component.css']
})


@Injectable({providedIn:"root"})
export class AncientDetailsComponent implements OnInit {

  players: Player[] = [];
  constructor(private pipe: TableFilterPipe, private router: Router, private route: ActivatedRoute, private list: ListUsersComponent) { 
    this.players=list.players;


}
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

  redirectListPlayers(){
   // this.pipe.transform(this.players, userType.Warrior);
    //this.list.setType(userType.Warrior);
    //console.log( this.list.type);
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