
import { Component, OnInit, Injectable, Input } from '@angular/core';
import { AuthenticationService } from '../login/authentication/authentication.service';
import { HttpClient } from '@angular/common/http';
import { Video } from '../shared/video.model';
import { topic } from '../shared/topic.enum';
import { FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { watchedVideos } from '../shared/watchedVideos.model';
import { Player } from 'AngularChampions/src/app/shared/player.model';

import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})

@Injectable({ providedIn: 'root' })
export class VideosComponent implements OnInit {
  videoForm: FormGroup;

  public Java: Video[];
  public Angular: Video[];
  public Spring: Video[];

  public watchedVideosByPlayer: watchedVideos[];
  public idOfVideosWatchedByPlayer: String[];
  public videosWatchedByPlayer: Video[];

  public idOfVideosChecked: String[];
  public idOfVideosUnchecked: String[];

  public videos: Video[];

  public topic: topic;
  public totaljava: number;
  public totalangular: number;
  public totalspring: number;
  



  constructor(private router: Router, private route: ActivatedRoute, private session: SessionService, private http: HttpClient, private authService: AuthenticationService) {
    console.log(this.session.playerSession);
  }

  ngOnInit() {
    this.allVideos();
    this.getWatchedVideos()
  }

  hasvideo(video: Video) {
    const obj = JSON.stringify(video);
    for (let v of this.videosWatchedByPlayer) {
      if (v.idvideo == video.idvideo) {
        return true;
      }
    } return false;
  }
  
  allVideos(): Video[] {
    this.http.get<Video[]>('http://localhost:8085/videos/getAll').subscribe(data => {
      this.videos = data;
      this.videosbytopic();
    });
    return this.videos;
  }

  videosbytopic() {
    this.Angular = [];
    this.Java = [];
    this.Spring = [];
    this.totaljava = 0;
    this.totalangular = 0;
    this.totalspring = 0;
    for (let video of this.videos) {
      if (video.topic == "Angular") {
        this.Angular.push(video);
        this.totalangular = this.totalangular + (Number)(video.duration);
      }if (video.topic == "Java") {
        this.Java.push(video);
        this.totaljava = this.totaljava + (Number)(video.duration);
      }if (video.topic == "Spring") {
        this.Spring.push(video);
        this.totalspring = this.totalspring + (Number)(video.duration);
      }else (video.topic)
    }
  }

  getWatchedVideos() {
    this.videosWatchedByPlayer = [];
    this.watchedVideosByPlayer = [];
    this.idOfVideosWatchedByPlayer = [];
    this.idOfVideosChecked = [];
    this.idOfVideosUnchecked = [];

    this.http.get<watchedVideos[]>('http://localhost:8085/watchedVideos/Get?idPlayerFK=' + this.session.playerSession.idplayer).subscribe(data => {
      const obj = JSON.stringify(data);
      this.watchedVideosByPlayer = data;

      for (let aux of this.watchedVideosByPlayer) {
        this.http.get<Video[]>('http://localhost:8085/videos/Get?idVideo=' + aux.idvideoFK).subscribe(res => {
          const obj2 = JSON.stringify(res);
          this.videosWatchedByPlayer.push(res[0]);
        });
      }
    });
  }

  Save() {
    if (this.idOfVideosChecked != undefined) {
      for (let idVideo of this.idOfVideosChecked) {
        const id = idVideo;
        const idplayer = this.session.playerSession.idplayer;

        this.http.post<any>('http://localhost:8085/watchedVideos/Create?idVideoFK=' + id + '&idPlayerFK=' + idplayer,
          {
            id,
            idplayer
          }).subscribe(data => {
          });
          console.log(this.session.playerSession);
        const idPlayer = this.session.playerSession.idplayer;
        console.log(idPlayer);
        const userName = this.session.playerSession.userName;
        console.log(userName);
        const email = this.session.playerSession.email;
        const password = this.session.playerSession.password;
        const gender = this.session.playerSession.gender;
        const userType = this.session.playerSession.userType;
        console.log("1"+this.session.playerSession.xp);

        
        var xp=this.session.playerSession.xp;
        xp = (Number(this.session.playerSession.xp)+30).toString();
        this.session.getPlayerInSession().xp = xp;
        this.XP();
       
        const champiesToGive = this.session.playerSession.champiesToGive;
        const myChampies = this.session.playerSession.myChampies;
        const status = this.session.playerSession.status;
        this.http.post<any>('http://localhost:8085/players/Update?idPlayer=' + idPlayer + '&userName=' + userName + '&email=' + email + '&password=' + password + '&gender=' + gender + '&userType=' + userType + '&xp=' + xp + '&champiesToGive=' + champiesToGive + '&myChampies=' + myChampies + '&status=' + status,
          {
            idPlayer,
            userName,
            email,
            password,
            gender,
            userType,
            xp,
            champiesToGive,
            myChampies,
            status
          }).subscribe(data => {
          });

      }
    }
    console.log("this.session.playerSession.xp" + this.session.playerSession.xp);
    console.log("xp " + xp);
    if (this.idOfVideosUnchecked != undefined) {
      for (let idVideo of this.idOfVideosUnchecked) {
        const id = idVideo;
        const idplayer = this.session.playerSession.idplayer;

        this.http.post<any>('http://localhost:8085/watchedVideos/Delete?idVideoFK=' + id + '&idPlayerFK=' + idplayer,
          {
            id,
            idplayer
          }).subscribe(data => {
          });
        const idPlayer = this.session.playerSession.idplayer;
        const userName = this.session.playerSession.userName;
        const email = this.session.playerSession.email;
        const password = this.session.playerSession.password;
        const gender = this.session.playerSession.gender;
        const userType = this.session.playerSession.userType;
        var xp=this.session.playerSession.xp;
        xp = (Number(this.session.playerSession.xp)-30).toString();
       this.session.getPlayerInSession().xp = xp;
        this.XP();
        const champiesToGive = this.session.playerSession.champiesToGive;
        const myChampies = this.session.playerSession.myChampies;
        const status = this.session.playerSession.status;
        this.http.post<any>('http://localhost:8085/players/Update?idPlayer=' + idPlayer + '&userName=' + userName + '&email=' + email + '&password=' + password + '&gender=' + gender + '&userType=' + userType + '&xp=' + xp + '&champiesToGive=' + champiesToGive + '&myChampies=' + myChampies + '&status=' + status,
          {
            idPlayer,
            userName,
            email,
            password,
            gender,
            userType,
            xp,
            champiesToGive,
            myChampies,
            status
          }).subscribe(data => {
          });
      }


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
  }
  XP() {
    var playerData: Player = JSON.parse(localStorage.getItem('playerlogged'));

    if (!playerData) {
      return;
    } else {
      localStorage.setItem("playerlogged", JSON.stringify(this.session.playerSession));
    }
  }


  checked(video: String) {
    var exists: boolean;
    exists = false;
    const obj = JSON.stringify(video);
    for (let x of this.idOfVideosChecked) {
      if (x == video) {
        exists = true;
      }
    }
    if (exists == false) {
      this.idOfVideosChecked.push(video);
    } else {
      this.idOfVideosChecked.splice(this.idOfVideosChecked.indexOf(video), 1);
    }
  }

  unchecked(video: String) {
    var exists: boolean;
    exists = false;
    const obj = JSON.stringify(video);
    for (let x of this.idOfVideosUnchecked) {
      if (x == video) {
        exists = true;
      }
    }
    if (exists == false) {
      this.idOfVideosUnchecked.push(video);
    } else {
      this.idOfVideosUnchecked.splice(this.idOfVideosUnchecked.indexOf(video), 1);
    }
  }
}