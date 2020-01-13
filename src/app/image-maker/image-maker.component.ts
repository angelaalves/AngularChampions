import { Component, OnInit, Input } from '@angular/core';
import { Player } from '../shared/player.model';
import { GuildListService } from '../services/guild-list.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-image-maker',
  templateUrl: './image-maker.component.html',
  styleUrls: ['./image-maker.component.css']
})

export class ImageMakerComponent {
  @Input() hairImagePath: string
  @Input() skinImagePath: string
  @Input() shirtImagePath: string
  @Input() pantsImagePath: string
  @Input() shoesImagePath: string
  @Input() othersImagePath: string
  @Input() size = 300;
}