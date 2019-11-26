import { Component, OnInit, Injectable, Input } from '@angular/core';
import { SessionService } from '../services/session.service';
import { AuthenticationService } from '../login/authentication/authentication.service';
import { HttpClient } from '@angular/common/http';
import { Video } from '../shared/video.model';
import { topic } from '../shared/topic.enum';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})

@Injectable({ providedIn: 'root' })
export class VideosComponent implements OnInit {


  public videos: Video[];
  public javavideos: Video[];
  public angularvideos: Video[];
  public springvideos: Video[];

 
  @Input() totaljava: number;
  @Input() totalangular: number;
  @Input() totalspring: number;

  constructor(private session: SessionService, private http: HttpClient, private authService: AuthenticationService) { }

  ngOnInit() {
    this.allVideos();

  }

  allVideos(): Video[] {

    this.http.get<Video[]>('http://localhost:8085/videos/getAll').subscribe(data => {


      this.videos = data;
      console.log(this.videos);
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
        console.log(video.topic);


        this.angularvideos.push(video);
        this.totalangular = this.totalangular + (Number)(video.duration);
        console.log(this.angularvideos);
        console.log(this.totalangular);
      }
      if (video.topic == topic.Java) {
        console.log(video.topic);


        this.javavideos.push(video);
        this.totaljava = this.totaljava + (Number)(video.duration);
        console.log(this.javavideos);
        console.log(this.totaljava);
      }
      if (video.topic == topic.Spring) {
        console.log(video.topic);


        this.springvideos.push(video);
        this.totalspring = this.totalspring + (Number)(video.duration);
        console.log(this.springvideos);
        console.log(this.totalspring);
      }
    }

  }

}
