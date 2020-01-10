import { Component, OnInit } from '@angular/core';
import { GuildListService } from 'src/app/services/guild-list.service';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Player } from 'src/app/shared/player.model';
import { PlayerService } from 'src/app/services/player.service';
import { HttpClient } from '@angular/common/http';
import { formatDate } from '@angular/common';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-add-guild-list',
  templateUrl: './add-guild-list.component.html',
  styleUrls: ['./add-guild-list.component.css']
})
export class AddGuildListComponent implements OnInit {
  flag: String;
  warriorsSelected: Player[] = [];
  guildmasterSelected: Player;
  guildMasters: Player[];
  warriors: Player[];
  flags: String[] = ["../../../assets/Flags/flag1.png", "../../../../assets/Flags/flag2.png",
    "../../../../assets/Flags/flag3.png", "../../../../assets/Flags/flag4.png",
    "../../../../assets/Flags/flag5.png", "../../../../assets/Flags/flag6.png",
    "../../../../assets/Flags/flag7.png", "../../../../../assets/Flags/flag8.png",
    "../../../../assets/Flags/flag9.png", "../../../../assets/Flags/flag10.png"];




  constructor(private http: HttpClient,private guildService: GuildListService,private session: SessionService, private router: Router, private route: ActivatedRoute, private playerService: PlayerService) { 
  }

  ngOnInit() {
    this.guildMasters = this.playerService.getGuildMasters();
    this.warriors = this.playerService.getWarriors();
    this.flag = "../../../assets/AppImages/DefaultFlag.png";
  }

  addPlayer() {
    this.router.navigate(['../add_user'], { relativeTo: this.route });
  }

  changeFlag(flag: string) {
    this.flag = flag;
  }

  onGuildMasterSelection(guildmaster: Player) {
    this.guildmasterSelected = guildmaster;
  }
  onWarriorSelection(warrior: Player) {
    this.warriorsSelected.push(warrior);
  }
  removePlayer() {
    this.warriorsSelected.splice(this.warriorsSelected.length - 1, 1)
  }

  createGuild(form: NgForm) {
    const name = form.value.newGuildName;
    var playerIds: String[] = [];
    const startDate = new Date();
    const endDate = new Date().setMonth(startDate.getMonth() + 6);
    for (let playerId of this.warriorsSelected) {
      playerIds.push(playerId.idplayer)
    }
    this.http.post('http://localhost:8085/guild/Create?guildName=' + name + '&startDate=' + formatDate(startDate, "yyyy-MM-dd", "en-UK") + '&endDate=' + formatDate(endDate, "yyyy-MM-dd", "en-UK") + '&guildFlag=' + this.flag + '&status=Active', {}).subscribe(response => {
      this.http.get('http://localhost:8085/guildPlayers/createRecent?startDate=' + formatDate(startDate, "yyyy-MM-dd", "en-UK") + '&guildmaster=' + this.guildmasterSelected.idplayer + '&players=' + playerIds.toString()).subscribe(done => {
        this.router.navigate(['..'], { relativeTo: this.route });
      });
    });
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
  }

  chooseFlag(fileInput: File) {
    this.flag = '../../../assets/AppImages/' + fileInput.name
    console.log(this.flag)
  }
}