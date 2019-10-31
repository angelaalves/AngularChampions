import { Component, ViewChild } from '@angular/core';

@Component({
    selector: 'app-shoes-skins',
    templateUrl: './closet-skins.component.html',
    styleUrls: ['./closet-skins.component.css'],
    template:`
    <drag-scroll #nav style="margin-top: 8%; text-align: center">
      <img drag-scroll-item src="../../../assets/Shoes/ShoesBlack.png" style="width:15%"/>
      <img drag-scroll-item src="../../../assets/Shoes/ShoesBrown.png" style="width:15%"/>
      <img drag-scroll-item src="../../../assets/Shoes/ShoesWhite.png" style="width:15%">
      </drag-scroll>
      `,
      styles: [`
        drag-scroll {
          height: 50px
          width: 50px
        }
        `]
    })
  
export class ShoesSkins{
}