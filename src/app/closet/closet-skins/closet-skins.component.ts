import { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Player } from 'src/app/shared/player.model';
import { Skin } from 'src/app/shared/skin.model';
import { SkinSelectedService } from './skinSelected.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-closet-skins',
  templateUrl: './closet-skins.component.html',
  styleUrls: ['./closet-skins.component.css']
})

export class ClosetSkinsComponent {
  @Input() skincolors: Skin[];
  @Input() bottoms: Skin[];
  @Input() hair: Skin[];
  @Input() tops: Skin[];
  @Input() shoes: Skin[];
  @Input() others: Skin[];
  player: Player;

  constructor(private router: Router, private route: ActivatedRoute, private skinSelectedService: SkinSelectedService, private sessionService: SessionService) { }

  addSkin(){
    this.router.navigate(['/add_skin'], {relativeTo: this.route});
  }  
}