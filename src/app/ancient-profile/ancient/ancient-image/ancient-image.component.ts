import { Component, OnInit, Input } from '@angular/core';
import { Player } from 'src/app/shared/player.model';
import { playerType } from 'src/app/shared/playerType.enum';
import { gender } from 'src/app/shared/playerGender.enum';
import { Router, ActivatedRoute } from '@angular/router';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-ancient-image',
  templateUrl: './ancient-image.component.html',
  styleUrls: ['./ancient-image.component.css']
})
export class AncientImageComponent implements OnInit {
  @Input() name: string
  @Input() hairImagePath: string
  @Input() skinImagePath: string
  @Input() shirtImagePath: string
  @Input() pantsImagePath: string
  @Input() shoesImagePath: string
  @Input() othersImagePath: string
  @Input() size: number

  ancient: Player;
  id: number;

  constructor(private router: Router, private route: ActivatedRoute, private playerService: PlayerService) { }

  ngOnInit() {

    this.ancient = new Player('ancient', '456@456.com', '234567', ["../assets/Hair/HairMediumBlonde.png",
      "../assets/SkinColor/AngLastairbender.png",
      "../assets/Top/TopPolarWhite.png",
      "../assets/Bottom/BottomTrouseWhite.png",
      "../assets/Shoes/ShoesGrey.png",
      "../assets/Others/FairyWings.png"],
      playerType.Ancient, gender.Female)
  }

}