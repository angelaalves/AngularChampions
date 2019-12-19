import { Component, OnInit, Input } from '@angular/core';
import { Player } from 'src/app/shared/player.model';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-guild-master-image',
  templateUrl: './guild-master-image.component.html',
  styleUrls: ['./guild-master-image.component.css']
})
export class GuildMasterImageComponent{
  @Input() name:string
  @Input() hairImagePath:string
  @Input() skinImagePath:string
  @Input() shirtImagePath:string
  @Input() pantsImagePath:string
  @Input() guildmaster: Player;
}