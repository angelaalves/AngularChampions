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

  public watchedvideos: watchedVideos[];
  public idwatchedvideos: String[];

  public videoswatched: Video[];


  public videostocheck: Video[];
  public videostouncheck: Video[];

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

  /*check(watchedVideo: watchedVideos,evt: Event){
    var target = evt.target;
    if(target.checked){
      this.watchedvideos.push(watchedVideo);
    console.log(this.watchedvideos);
    }else if(!target.checked){
      this.watchedvideos.slice
    }
    
  }*/
  hasvideo(video: Video) {
    for (let v of this.videoswatched) {
      if (v === video) {
        return true;
      } else {
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
  /// Watched videos e não na vidfeos
  getWatchedVideos() {
    this.watchedvideos = [];
    this.videoswatched = [];
    this.idwatchedvideos = [];
    this.http.get<watchedVideos[]>('http://localhost:8085/watchedVideos/Get?idPlayerFK=' + this.session.playerSession.idplayer).subscribe(data => {
      this.watchedvideos = data;
      
      for (let aux of this.watchedvideos) {
        console.log("Watched videos   "+aux.idvideoFK);
        this.idwatchedvideos.push(aux.idvideoFK);
      }
      for (let wv of this.watchedvideos) {
        this.http.get<Video[]>('http://localhost:8085/videos/Get?idVideo=' + wv.idvideoFK).subscribe(res => {
          this.videoswatched.push(res[0]);
        });
      }

    });

  }

  Save() {
    for (let video of this.videostocheck) {
      const id = video.idvideo;
      const idplayer = this.session.playerSession.idplayer;
      this.http.post<any>('http://localhost:8085/watchedVideos/Create?idVideoFK=' + id + '&userName=' + idplayer,
        {
          id,
          idplayer
        }).subscribe(data => {
        });
    }

    for (let videoU of this.videostouncheck) {
      const id = videoU.idvideo;
      const idplayer = this.session.playerSession.idplayer;
      this.http.post<any>('http://localhost:8085/watchedVideos/Delete?idVideoFK=' + id + '&userName=' + idplayer,
        {
          id,
          idplayer
        }).subscribe(data => {
        });
    }

  }

  check(video: Video) {
    const obj = JSON.stringify(video);
    console.log("inicio do check " + video + " + obj " + obj);
    this.videostocheck.push(video);
    console.log("fim do check "+this.videostocheck.push(video));
  }
  uncheck(video: Video) {
    this.videostouncheck.push(video);
  }

}
