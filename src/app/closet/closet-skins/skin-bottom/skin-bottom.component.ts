import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Skin } from 'src/app/shared/skin.model';
import { SkinSelectedService } from '../skinSelected.service';

@Component({
  selector: 'app-skin-bottom',
  templateUrl: './skin-bottom.component.html',
  styleUrls: ['./skin-bottom.component.css']
})
export class SkinBottomComponent {
  @Input() bottoms: Skin[];

  constructor(private router: Router, private route: ActivatedRoute, private skinSelectedService: SkinSelectedService) { }

  skinSelected(skinSelected: Skin){
    this.skinSelectedService.addSkin(skinSelected);
    console.log(skinSelected.imagePath);
    //this.router.navigate(['../buy_skin'], {relativeTo: this.route});
  }
}