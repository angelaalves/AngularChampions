import { Component, OnInit, Injectable, Input } from '@angular/core';
import { SessionService } from '../services/session.service';
import { AuthenticationService } from '../login/authentication/authentication.service';
import { HttpClient } from '@angular/common/http';
import { Video } from '../shared/video.model';
import { topic } from '../shared/topic.enum';
import { FormGroup, NgForm, FormArray, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { watchedVideos } from '../shared/watchedVideos.model';

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
    console.log(session.playerSession.idplayer);
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

      }
      if (video.topic == "Java") {
        this.Java.push(video);
        this.totaljava = this.totaljava + (Number)(video.duration);

      }
      if (video.topic == "Spring") {
        this.Spring.push(video);
        this.totalspring = this.totalspring + (Number)(video.duration);
      }
      else (video.topic)
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
      console.log(this.watchedVideosByPlayer);
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
      console.log("Entrei no if 1");

      for (let idVideo of this.idOfVideosChecked) {

        const id = idVideo;
        const idplayer = this.session.playerSession.idplayer;

        this.http.post<any>('http://localhost:8085/watchedVideos/Create?idVideoFK=' + id + '&idPlayerFK=' + idplayer,
          {
            id,
            idplayer
          }).subscribe(data => {
            console.log(data);
          });
      }
    }
    if (this.idOfVideosUnchecked != undefined) {
      for (let idVideo of this.idOfVideosUnchecked) {
        const id = idVideo;
        const idplayer = this.session.playerSession.idplayer;

        this.http.post<any>('http://localhost:8085/watchedVideos/Delete?idVideoFK=' + id + '&idPlayerFK=' + idplayer,
          {
            id,
            idplayer
          }).subscribe(data => {
            console.log(data);
          });
      }
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



  checked(video: String) {
    var exists: boolean;
    exists = false;
    const obj = JSON.stringify(video);
    console.log("Check " + obj);
    for (let x of this.idOfVideosChecked) {
      if (x == video) {
        exists = true;
      }
    }

    if (exists == false) {
      console.log("não existe vou adicionar"+video);
      this.idOfVideosChecked.push(video);
      console.log(this.idOfVideosUnchecked);
    } else {
      console.log("já existe vou remover "+video);
      this.idOfVideosChecked.slice(this.idOfVideosChecked.indexOf(video), 1);
       console.log(this.idOfVideosUnchecked);
    }
  }



  unchecked(video: String) {
    var exists: boolean;
    exists = false;
    const obj = JSON.stringify(video);
    console.log("Uncheck " + obj);
    for (let x of this.idOfVideosUnchecked) {
      if (x == video) {
        exists = true;

      }
    }
    if (exists == false) {
      console.log("não existe vou adicionar"+video);
      this.idOfVideosUnchecked.push(video);
      console.log(this.idOfVideosUnchecked);
    } else {
      console.log("já existe vou remover "+video);
    
      this.idOfVideosUnchecked.slice(this.idOfVideosUnchecked.indexOf(video), 1);
        console.log(this.idOfVideosUnchecked);
    }

  }




  /** 
    howmany(id: String) {
      var i: number;
      for (let j of this.idOfVideosChecked) {
        if (j == id) {
          i++;
        }
      }
      return i;
   
    }
   
   
    pair(int: number) {
      if (int % 2 == 0) {
        return true;
      } else {
        return false;
      }
    }
 
  removepairs() {
    var auxiliar: String[];
    auxiliar = [];
    auxiliar.push(this.idOfVideosChecked[0]);
    for (let v of this.idOfVideosChecked) {
      for (let a of auxiliar) {
        auxiliar.push(v);
        var i = this.howmany(v);
        if (this.pair(i) != true) {

        }
      }
    }
  } */


}
