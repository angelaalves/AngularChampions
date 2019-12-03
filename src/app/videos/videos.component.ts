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


  public videoswatched: Video[];


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
    this.http.get<watchedVideos[]>('http://localhost:8085/watchedVideos/Get?idPlayerFK=' + this.session.playerSession.idplayer).subscribe(data => {
      this.watchedvideos = data;

      console.log("getwatchedvideos");
      console.log(this.watchedvideos);

      for (let wv of this.watchedvideos) {
        this.http.get<Video[]>('http://localhost:8085/videos/Get?idVideo=' + wv.idVideoFK).subscribe(res => {
          this.videoswatched.push(res[0]);
          console.log("videoswatched");
          console.log(this.videoswatched);
        });
      }

    });

  }
  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }
  }

  private initForm() {

    this.videoForm = new FormGroup({

    });
  }


  addUser(addUserForm: FormGroup) {
    (<FormArray>this.videoForm.get('event')).push(
      new FormGroup({
        'name': new FormControl(null, [Validators.required]),
        'gender': new FormControl(null, [Validators.required]),
        'playertype': new FormControl(null, [Validators.required]),
        'email': new FormControl(null, [Validators.required, Validators.minLength(10)]),
        'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
      })
    );
  }




  Save() {
    this.myFunction();
  }

  myFunction() {
    var checkBox = <HTMLInputElement>document.getElementById("index");
    if (checkBox.checked == true) {

      //Adiciona na lista de watched
      console.log("Watched");

    } else {

      //Retira da lista de watched
      console.log("not Watched");
    }
  }

}
