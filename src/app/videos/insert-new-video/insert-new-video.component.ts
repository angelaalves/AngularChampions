import { Component, OnInit, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-insert-new-video',
  templateUrl: './insert-new-video.component.html',
  styleUrls: ['./insert-new-video.component.css']
})

@Injectable({ providedIn: 'root' })
export class InsertNewVideoComponent implements OnInit {
  insertNewVideoForm: FormGroup;

  constructor(private http: HttpClient,private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

}
