import { Component, OnInit, Input, Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Skin } from 'src/app/shared/skin.model';
import { Player } from 'src/app/shared/player.model';
import { HttpClient } from '@angular/common/http';
import { SessionService } from 'src/app/services/session.service';
import { SkinService } from 'src/app/services/skin.service';
import { SkinSelectedService } from '../skinSelected.service';
import { ClosetComponent } from '../../closet.component';
import { skinType } from 'src/app/shared/skinType.enum';
import { Closet } from 'src/app/shared/closet.model';

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
  currentSkinToBeBought: Skin;
  playerInitialSkins: String[] = [];
  playerViewingSkins: String[] = [];
  alluserskins: Closet[] = [];


  constructor(private session: SessionService, private router: Router, private route: ActivatedRoute, private http: HttpClient, private skinSelectedService: SkinSelectedService,
    private skinService: SkinService, private closet: ClosetComponent) { }

  ngOnInit() {
    this.player = this.session.getPlayerInSession();
    console.log(this.player);
    this.skinService.currentSkinSelected.subscribe(skin => this.currentSkinToBeBought = skin)
    this.playerInitialSkins = this.session.playerSession.imagePath;
    console.log("initial skins on init()" + this.playerInitialSkins);
    this.playerViewingSkins = this.session.playerSession.imagePath;
    console.log("viewing skins on init()" + this.playerViewingSkins);
    console.log(this.player);
    this.http.get<Closet[]>('http://localhost:8085/closet/Get?idSkinFK= &idPlayerFk=' + this.session.getPlayerInSession().idplayer + "&status=", {}).subscribe(data => {
      this.alluserskins = data;
      console.log("this.alluserskins ",this.alluserskins);
    });
  }

  skinInUse(skin: Skin){
    if(this.session.playerSession.imagePath.includes(skin.imagePath)){
      return true;
    }
    return false;
  }

  playerHasBoughtSkin(skin: Skin) {
    for (let s of this.alluserskins) {
      if (s.idskinFK==skin.idskin) {
        return true;
      }
    }
    return false;
  }

  imageNull(skin: Skin){
    if(skin.imagePath=="../../assets/AppImages/None.png"){
      return true;
    }
    return false;
  }

  skinSelected(skinSelected: Skin) {
    this.playerViewingSkins = this.playerInitialSkins;
    this.session.playerSession.changeImage(skinSelected.imagePath, skinSelected.skinType);
    this.skinService.updateSkin(skinSelected);
    this.session.playerSession.imagePath = this.playerInitialSkins;
    this.skinService.setAnySkinSelected(true);
  }

  skinSelectedNull() {
    this.playerViewingSkins = this.playerInitialSkins;
    this.session.playerSession.changeImage("../../../../assets/Top/TopNull.png", skinType.Top);
    this.skinService.updateSkin(new Skin("10000", "topNull", "../../../../assetsTop/TopNull.png", "0", "0", skinType.Top));
    this.session.playerSession.imagePath = this.playerViewingSkins;
    this.skinService.setAnySkinSelected(true);
  }
}