import { Component, Input, Injectable, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Skin } from 'src/app/shared/skin.model';
import { SkinSelectedService } from '../skinSelected.service';
import { SessionService } from 'src/app/services/session.service';
import { SkinService } from 'src/app/services/skin.service';

@Component({
  selector: 'app-skin-bottom',
  templateUrl: './skin-bottom.component.html',
  styleUrls: ['./skin-bottom.component.css']
})

@Injectable({ providedIn: 'root' })
export class SkinBottomComponent implements OnInit{
  @Input() bottoms: Skin[];
  currentSkinToBeBought : Skin;

  constructor(private router: Router, private route: ActivatedRoute, private skinSelectedService: SkinSelectedService, 
    private sessionService: SessionService, private skinService : SkinService) { }

  ngOnInit(){
    //this.bottoms=this.previewSkin.skinSelected();
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