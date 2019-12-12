import { Component, OnInit, Input, Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Skin } from 'src/app/shared/skin.model';
import { SkinSelectedService } from '../skinSelected.service';
import { SkinService } from 'src/app/services/skin.service';
import { previewSkinSelected } from '../previewSkinSelected.component';
import { SessionService } from 'src/app/services/session.service';
import { Player } from 'src/app/shared/player.model';
import { skinType } from 'src/app/shared/skinType.enum';

@Component({
  selector: 'app-skin-hair',
  templateUrl: './skin-hair.component.html',
  styleUrls: ['./skin-hair.component.css']
})

@Injectable({providedIn: 'root'})
export class SkinHairComponent implements OnInit {
  @Input() hair: Skin[];
  currentSkinToBeBought : Skin;
  playerViewingSkins: String[] = [];
  playerInitialSkins: String[] = [];
  alluserskins: Closet[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private skinSelectedService: SkinSelectedService, 
    private session: SessionService, private skinService : SkinService, private http: HttpClient) { }

  ngOnInit() {
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

  skinSelected(skinSelected: Skin) {
    this.skinSelectedService.addSkin(skinSelected);
    console.log(skinSelected.imagePath);
    this.sessionService.getPlayerInSession().changeImage(skinSelected.imagePath, skinSelected.skinType);
    this.skinService.updateSkin(skinSelected);
    //this.router.navigate(['../buy_skin'], {relativeTo: this.route});
  }
}