import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Player } from 'src/app/shared/player.model';
import { PlayerService } from 'src/app/services/player.service';
import { playerType } from 'src/app/shared/playerType.enum';
import { gender } from 'src/app/shared/playerGender.enum';

@Component({
  selector: 'app-ancient',
  templateUrl: './ancient.component.html',
  styleUrls: ['./ancient.component.css']
})
export class AncientComponent implements OnInit {
  ancient: Player;
  id: number;

  constructor(private router: Router, private route: ActivatedRoute, private playerService: PlayerService) { }

  ngOnInit() {
    this.ancient= new Player('ancient', '456@456.com', '234567', ["../assets/Hair/HairMediumBlonde.png", 
    "../assets/SkinColor/AngLastairbender.png",
    "../assets/Top/TopPolarWhite.png",
    "../assets/Bottom/BottomTrouseWhite.png"], playerType.Ancient, gender.Female )
  }

}