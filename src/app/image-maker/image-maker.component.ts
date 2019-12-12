import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-image-maker',
  templateUrl: './image-maker.component.html',
  styleUrls: ['./image-maker.component.css']
})

export class ImageMakerComponent implements OnInit {
 @Input() hairImagePath:string
 @Input() skinImagePath:string
 @Input() shirtImagePath:string
 @Input() pantsImagePath:string
 @Input() shoesImagePath:string
 @Input() othersImagePath:string
 
  constructor() { }

  ngOnInit() {
    
  }

}