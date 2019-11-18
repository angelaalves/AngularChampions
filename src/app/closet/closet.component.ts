import { Component, OnInit, Injectable } from '@angular/core';
import { Player } from '../shared/player.model';
import { HttpClient } from '@angular/common/http';
import { Skin } from '../shared/skin.model';
import { skinType } from '../shared/skinType.enum';
import { AuthenticationService } from '../login/authentication/authentication.service';
import { SessionService } from '../services/session.service';

@Component({
  selector: 'app-closet',
  templateUrl: './closet.component.html',
  styleUrls: ['./closet.component.css']
})

@Injectable({ providedIn: 'root' })
export class ClosetComponent implements OnInit {
  player: Player;
  skincolors: Skin[];
  bottoms: Skin[];
  hair: Skin[];
  tops: Skin[];
  shoes: Skin[];
  others: Skin[];

  constructor(private session: SessionService,private http: HttpClient, private authService: AuthenticationService) {}
    
  getSkins() {
    return this.http.get<Skin>('http://localhost:8085/skins/getAll', {}).subscribe(data => {
      console.log(data);
      if(data.skinType==skinType.Bottom){
        this.bottoms.push(data);
      }else if(data.skinType==skinType.SkinColor){
        this.skincolors.push(data);
      }else if(data.skinType==skinType.Hair){
        this.hair.push(data);
      }else if(data.skinType==skinType.Top){
        this.tops.push(data);
      }else if(data.skinType==skinType.Shoes){
        this.shoes.push(data);
      }else if(data.skinType==skinType.Others){
        this.others.push(data);
      }
    })
  }

  ngOnInit() {
    /*this.ancient= new Player('1', '1','ancient', '456@456.com', '234567', ["../assets/Hair/HairMediumBlonde.png", 
    "../assets/SkinColor/FemaleBlack.png",
    "../assets/Top/TopPolarWhite.png",
    "../assets/Bottom/BottomTrouseWhite.png","../assets/Shoes/ShoesGrey.png","../assets/Others/FairyWings.png"], 
    '100','100','100',playerType.Ancient, gender.Female, status.Active)*/
  }
}