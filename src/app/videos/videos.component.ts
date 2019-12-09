import { Component, OnInit, Injectable, Input } from '@angular/core';
import { SessionService } from '../services/session.service';
import { AuthenticationService } from '../login/authentication/authentication.service';
import { HttpClient } from '@angular/common/http';
import { Video } from '../shared/video.model';
import { topic } from '../shared/topic.enum';
import { FormGroup, NgForm, FormArray, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { watchedVideos } from '../shared/watchedVideos.model';
import { identifierModuleUrl } from '@angular/compiler';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})

@Injectable({ providedIn: 'root' })
export class VideosComponent implements OnInit {
  videoForm: FormGroup;


  public videos: Video[];
  public javavideos: Video[];
  public angularvideos: Video[];
  public springvideos: Video[];
  public watchedVideosByPlayer: watchedVideos[];
  public idOfVideosWatchedByPlayer: String[];
  public videosWatchedByPlayer: Video[];
  public idOfVideosToCheck: String[];
  public idOfVideosToUncheck: String[];

  @Input() totaljava: number;
  @Input() totalangular: number;
  @Input() totalspring: number;

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
  
      console.log("videosWatchedByPlayer: "+ v);
      if (v == video) {
        console.log("Has video = true: "+v);
        return true;
      } else {
        console.log("Has video = false: "+v);
        return false;
      }
    }
  }
  allVideos(): Video[] {

    this.http.get<Video[]>('http://localhost:8085/videos/getAll').subscribe(data => {
      this.videos = data;
      this.videosbytopic();
    });
    return this.videos;
  }

  videosbytopic() {
    this.angularvideos = [];
    this.javavideos = [];
    this.springvideos = [];
    this.totaljava = 0;
    this.totalangular = 0;
    this.totalspring = 0;
    for (let video of this.videos) {

      if (video.topic == topic.Angular) {
        this.angularvideos.push(video);
        this.totalangular = this.totalangular + (Number)(video.duration);

      }
      if (video.topic == topic.Java) {
        this.javavideos.push(video);
        this.totaljava = this.totaljava + (Number)(video.duration);

      }
      if (video.topic == topic.Spring) {
        this.springvideos.push(video);
        this.totalspring = this.totalspring + (Number)(video.duration);
      }
    }

  }
  getWatchedVideos() {
    this.videosWatchedByPlayer = [];
    this.watchedVideosByPlayer = [];
    this.idOfVideosWatchedByPlayer = [];
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
    for (let idVideo of this.idOfVideosToCheck) {
      const id = idVideo;
      console.log("No save CHECK eu quero o id do video: "+id);
      const idplayer = this.session.playerSession.idplayer;
      console.log("No save CHEK eu quero o idplayer: "+idplayer);
      this.http.post<any>('http://localhost:8085/watchedVideos/Create?idVideoFK=' + id + '&userName=' + idplayer,
        {
          id,
          idplayer
        }).subscribe(data => {
        });
    }

    for (let idVideoU of this.idOfVideosToUncheck) {
      const id = idVideoU;
      console.log("No save CHECK eu quero o id do video: "+idVideoU);
      const idplayer = this.session.playerSession.idplayer;
      console.log("No save CHEK eu quero o idplayer: "+idplayer);
      this.http.post<any>('http://localhost:8085/watchedVideos/Delete?idVideoFK=' + id + '&userName=' + idplayer,
        {
          id,
          idplayer
        }).subscribe(data => {
        });
    }

  }

  check(video: String) {
    this.idOfVideosToCheck=[];
    const obj = JSON.stringify(video);
     console.log("Check "+obj);
    this.idOfVideosToCheck.push(video);
   
  }
  uncheck(video: String) {
    this.idOfVideosToUncheck=[];
    const obj = JSON.stringify(video);
     console.log(" Uncheck "+obj);
    this.idOfVideosToUncheck.push(video);
   
  }

}
