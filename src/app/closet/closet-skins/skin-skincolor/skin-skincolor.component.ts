import { Component, OnInit, Input, Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Skin } from 'src/app/shared/skin.model';
import { SkinSelectedService } from '../skinSelected.service';
import { SkinService } from 'src/app/services/skin.service';
import { SessionService } from 'src/app/services/session.service';

@Component({
  selector: 'app-skin-skincolor',
  templateUrl: './skin-skincolor.component.html',
  styleUrls: ['./skin-skincolor.component.css']
})
@Injectable({providedIn: 'root'})
export class SkinSkincolorComponent implements OnInit {
  @Input() skincolors: Skin[];
  currentSkinToBeBought : Skin;

  constructor(private router: Router, private route: ActivatedRoute, private skinSelectedService: SkinSelectedService, 
    private sessionService: SessionService, private skinService : SkinService) { }

  ngOnInit() {
    this.skinService.currentSkinSelected.subscribe(skin => this.currentSkinToBeBought = skin)
  }

  skinSelected(skinSelected: Skin){
    this.skinSelectedService.addSkin(skinSelected);
    console.log(skinSelected.imagePath);
    this.sessionService.getPlayerInSession().changeImage(skinSelected.imagePath, skinSelected.skinType);
    this.skinService.updateSkin(skinSelected);
    //this.router.navigate(['../buy_skin'], {relativeTo: this.route});
  }
}