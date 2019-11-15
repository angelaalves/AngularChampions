import { Component, OnInit, Input, Injectable } from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})


@Injectable({ providedIn: 'root' })
export class ImageComponent implements OnInit {
  @Input() name: string;
  @Input() hairImagePath:string
  @Input() skinImagePath:string
  @Input() shirtImagePath:string
  @Input() pantsImagePath:string
  constructor() { }

  ngOnInit() {
    
  }

}