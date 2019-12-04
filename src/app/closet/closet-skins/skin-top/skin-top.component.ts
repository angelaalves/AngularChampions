import { Component, OnInit, Input, Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Skin } from 'src/app/shared/skin.model';
import { Player } from 'src/app/shared/player.model';
import { HttpClient } from '@angular/common/http';
import { SessionService } from 'src/app/services/session.service';
import { SkinService } from 'src/app/services/skin.service';
import { SkinSelectedService } from '../skinSelected.service';
import { skinType } from 'src/app/shared/skinType.enum';

@Component({
  selector: 'app-skin-top',
  templateUrl: './skin-top.component.html',
  styleUrls: ['./skin-top.component.css']
})

@Injectable({ providedIn: 'root' })
export class SkinTopComponent implements OnInit {
  @Input() tops: Skin[];
  @Input() player: Player;
  currentUserSkins: Skin[];
  currentSkinToBeBought : Skin;
  playerInitialSkins: string[] = [];
  playerViewingSkins: string[] = [];

  constructor(private session: SessionService, private router: Router, private route: ActivatedRoute, private http: HttpClient, private skinSelectedService: SkinSelectedService, 
    private sessionService: SessionService, private skinService : SkinService) { }

  ngOnInit() {
    /*this.player = this.session.getPlayerInSession();
    console.log(this.player);
    this.skinService.currentSkinSelected.subscribe(skin => this.currentSkinToBeBought = skin)*/
    this.playerInitialSkins = this.sessionService.playerSession.imagePath;
    console.log(this.playerInitialSkins);
    this.playerViewingSkins = this.sessionService.playerSession.imagePath;
    console.log(this.playerViewingSkins);
  }

  /*skinSelected(skinIn: Skin) {

    this.http.get<Skin[]>('http://localhost:8085/closet/activeSkins?idPlayerFK=' + this.player.idplayer, {}).subscribe(data => {
      this.currentUserSkins = data;
      console.log(this.currentUserSkins);
      let counter = -1;
      for (let skin of this.currentUserSkins) {
        counter++;
        if (skin.skinType == skinIn.skinType) {
          this.currentUserSkins.splice(counter, 1, skin);
          console.log(this.currentUserSkins);
        }
      }
    });

    this.router.navigate(['../buy_skin'], { relativeTo: this.route });
  }

  skinSelected(skinSelected: Skin){
    this.skinSelectedService.addSkin(skinSelected);
    console.log(skinSelected.imagePath);
    this.sessionService.getPlayerInSession().changeImage(skinSelected.imagePath, skinSelected.skinType);
    this.skinService.updateSkin(skinSelected);
    //this.router.navigate(['../buy_skin'], {relativeTo: this.route});
  }*/

  skinSelected(skinSelected: Skin) {
    this.playerViewingSkins = this.playerInitialSkins;
    this.skinSelectedService.addSkin(skinSelected);
    console.log(skinSelected.imagePath);

    //duplicado da linha 32
    //this.skinService.currentSkinSelected.subscribe(skin => this.currentSkinToBeBought = skin)
    //this.sessionService.getPlayerInSession().changeImage(skinSelected.imagePath, skinSelected.skinType);
    this.changeImage(skinSelected.imagePath, skinSelected.skinType);
    this.skinService.updateSkin(this.currentSkinToBeBought);
    this.sessionService.playerSession.imagePath = this.playerViewingSkins;

    //this.router.navigate(['../buy_skin'], {relativeTo: this.route});
  }

  changeImage(imgPath: string, type: skinType) {
    let index;
    if (skinType.Hair == type) {
      index = 0;
    } else if (skinType.SkinColor == type) {
      index = 1;
    } else if (skinType.Top == type) {
      index = 2;
    } else if (skinType.Bottom == type) {
      index = 3;
    } else if (skinType.Shoes == type) {
      index = 4;
    } else if (skinType.Others == type) {
      index = 5;
    }
    this.playerViewingSkins.splice(Number(index), 1, imgPath);
  }
}