import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NgForm, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-add-new-video',
  templateUrl: './add-new-video.component.html',
  styleUrls: ['./add-new-video.component.css']
})

@Injectable({ providedIn: 'root' })
export class AddNewVideoComponent implements OnInit {
  addNewVideoForm: FormGroup;

  constructor(private http: HttpClient,private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.initForm();
        }
      )
  }

  onSubmit(form: NgForm){
    if (!form.valid) {
      return;
    }

    const videoName = form.value.videoName;
    const videoTopic = form.value.videoTopic;
    const videoPriority = form.value.videoPriority;

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:8085/videos/Create?videoName=' + videoName + '&duration=' + videoPriority +
    '&topic=' + videoTopic , true);

    this.http.post<any>('http://localhost:8085/videos/Create?videoName=' + videoName + '&duration=' + videoPriority +
    '&topic=' + videoTopic,
      {
        videoName, 
        videoPriority,
        videoTopic
      }
    ).subscribe();

  }

  private initForm() {
    let videoName='';
    let videoPriority='';
    let videoTopic="";

    this.addNewVideoForm = new FormGroup({
      'videoName': new FormControl(videoName, Validators.required),
      'videoPriority': new FormControl(videoPriority, Validators.required),
      'videoTopic': new FormControl(videoTopic, Validators.required)
    });
  }


  addEvent(addNewVideoForm: FormGroup) {
    (<FormArray>this.addNewVideoForm.get('videos')).push(
      new FormGroup({
        'videoName': new FormControl(null, Validators.required),
        'videoPriority': new FormControl(null, Validators.required),
        'videoTopic': new FormControl(null, Validators.required)
      })
    );
  } 



 

}