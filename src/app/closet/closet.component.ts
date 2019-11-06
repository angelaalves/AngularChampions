import { Component, OnInit } from '@angular/core';
import { Player } from '../shared/player.model';
import { playerType } from '../shared/playerType.enum';
import { gender } from '../shared/playerGender.enum';

@Component({
  selector: 'app-closet',
  templateUrl: './closet.component.html',
  styleUrls: ['./closet.component.css']
})
export class ClosetComponent implements OnInit {
  ancient: Player;
  constructor() { }

  ngOnInit() {
    this.ancient= new Player('ancient', '456@456.com', '234567', ["../assets/Hair/HairMediumBlonde.png", 
    "../assets/SkinColor/FemaleBlack.png",
    "../assets/Top/TopPolarWhite.png",
    "../assets/Bottom/BottomTrouseWhite.png","../assets/Shoes/ShoesGrey.png","src/assets/Others/FairyWings.png"], playerType.Ancient, gender.Female )
  }
}