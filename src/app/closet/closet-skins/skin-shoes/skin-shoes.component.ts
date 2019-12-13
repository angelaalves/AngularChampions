import { Component, OnInit, Input, Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Skin } from 'src/app/shared/skin.model';
import { SessionService } from 'src/app/services/session.service';
import { SkinService } from 'src/app/services/skin.service';
import { SkinSelectedService } from '../skinSelected.service';
import { Player } from 'src/app/shared/player.model';
import { skinType } from 'src/app/shared/skinType.enum';
import { Closet } from 'src/app/shared/closet.model';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-skin-shoes',
  templateUrl: './skin-shoes.component.html',
  styleUrls: ['./skin-shoes.component.css']
})
@Injectable({providedIn: 'root'})
export class SkinShoesComponent implements OnInit {
  @Input() shoes: Skin[];
  @Input() player: Player;
  //currentSkinToBeBought : Skin;
  playerViewingSkins: String[] = [];
  playerInitialSkins: String[] = [];
  alluserskins: Closet[] = [];
  shoppingCartSkins: Skin[] = [];

  constructor(private router: Router, private route: ActivatedRoute, private skinSelectedService: SkinSelectedService, 
    private session: SessionService, private skinService : SkinService, private http: HttpClient) { }

  ngOnInit() {
    this.player = this.session.getPlayerInSession();

    console.log(this.player);

    //this.skinService.currentSkinSelected.subscribe(skin => this.currentSkinToBeBought = skin)
    this.skinService.shoppingCartSkins.subscribe(shoppingCart => this.shoppingCartSkins = shoppingCart);

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

  skinSelected(skinSelected: Skin){
    this.playerViewingSkins = this.playerInitialSkins;
    this.session.playerSession.changeImage(skinSelected.imagePath, skinSelected.skinType);

    //this.skinService.updateSkin(skinSelected);
    if (this.playerHasBoughtSkin(skinSelected) == false) {
      this.skinService.addToShoppingCart(skinSelected);
    }
    this.session.playerSession.imagePath = this.playerViewingSkins;
    this.skinService.setAnySkinSelected(true);
  }

  
  skinSelectedNull(){
    this.playerViewingSkins = this.playerInitialSkins;
    this.session.playerSession.changeImage("./../../../assets/Bottom/BottomNull.png", skinType.Shoes);

    //this.skinService.updateSkin(new Skin("10000","shoesNull","./../../../assets/Shoes/ShoesNull.png","0","0",skinType.Shoes));
    //this.skinService.addToShoppingCart(new Skin("10000","shoesNull","./../../../assets/Shoes/ShoesNull.png","0","0",skinType.Shoes));

    this.session.playerSession.imagePath = this.playerViewingSkins;
    this.skinService.setAnySkinSelected(true);
  }
}