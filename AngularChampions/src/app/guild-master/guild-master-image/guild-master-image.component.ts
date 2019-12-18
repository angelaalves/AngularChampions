import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-guild-master-image',
  templateUrl: './guild-master-image.component.html',
  styleUrls: ['./guild-master-image.component.css']
})
export class GuildMasterImageComponent implements OnInit {
  @Input() name:string
  @Input() hairImagePath:string
  @Input() skinImagePath:string
  @Input() shirtImagePath:string
  @Input() pantsImagePath:string
  constructor() { }

  ngOnInit() {
  }

}
