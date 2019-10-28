import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-ancient-image',
  templateUrl: './ancient-image.component.html',
  styleUrls: ['./ancient-image.component.css']
})
export class AncientImageComponent implements OnInit {
  @Input() name:string
  @Input() hairImagePath:string
  @Input() skinImagePath:string
  @Input() shirtImagePath:string
  @Input() pantsImagePath:string
  constructor() { }

  ngOnInit() {
  }

}