import { Component, ViewChild } from '@angular/core';

@Component({
    selector: 'app-top-skins',
    templateUrl: './closet-skins.component.html',
    styleUrls: ['./closet-skins.component.css'],
    template:`
    <drag-scroll #nav style="margin-top: 8%; text-align: center">
      <img drag-scroll-item src="../../../assets/Top/TopPolarBlack.png" style="width:30%"/>
      <img drag-scroll-item src="../../../assets/Top/TopPolarWhite.png" style="width:30%">
      </drag-scroll>
      `,
      styles: [`
        drag-scroll {
          height: 50px
          width: 50px
        }
        `]
    })
  
export class TopSkins{
}