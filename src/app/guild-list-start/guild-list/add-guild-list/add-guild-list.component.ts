import { Component, OnInit } from '@angular/core';
import { GuildListService } from 'src/app/services/guild-list.service';
import { FormGroup, FormControl, Validators, NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Player } from 'src/app/shared/player.model';
import { PlayerService } from 'src/app/services/player.service';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-guild-list',
  templateUrl: './add-guild-list.component.html',
  styleUrls: ['./add-guild-list.component.css']
})
export class AddGuildListComponent implements OnInit {
  warriorsSelected:Player[]=[];
  guildmasterSelected: Player;
  guildMasters: Player[];
  warriors: Player[];

  constructor(private http: HttpClient,private guildService: GuildListService, private router: Router, private route: ActivatedRoute, private playerService: PlayerService) { 
    
  }

  ngOnInit() { 
    this.guildMasters=this.playerService.getGuildMasters();
    this.warriors=this.playerService.getWarriors();
  }


  addPlayer(){
    this.router.navigate(['../add_user'], {relativeTo: this.route});
  } 

  submit(){
    this.router.navigate(['/ancient_profile'], {relativeTo: this.route});
  }
  
  onGuildMasterSelection(guildmaster: Player){
    this.guildmasterSelected=guildmaster;
  }
  onWarriorSelection(warrior: Player){
    this.warriorsSelected.push(warrior);
  }

  createGuild(form: NgForm){
    const name=form.value.newGuildName;
    const startDate=new Date()
    const endDate=new Date().setMonth(startDate.getMonth()+6)
    this.http.post('http://localhost:8085/guild/Create?guildName='+name+'&startDate='+startDate+'&endDate='+endDate+'&guildFlag=../../assets/AppImages/DefaultFlag.png&status=Active',{}).subscribe();
  }
}