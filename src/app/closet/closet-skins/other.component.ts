import { Component, ViewChild } from '@angular/core';
import { DragScrollComponent } from 'ngx-drag-scroll';

@Component({
    selector: 'app-other-skins',
    templateUrl: './closet-skins.component.html',
    styleUrls: ['./closet-skins.component.css'],
    template:`
    <drag-scroll #nav style="margin-top: 8%; text-align: center">
      <img drag-scroll-item src="../../../assets/Others/FairyWings.png" style="width:15%"/>
      <img drag-scroll-item src="../../../assets/Others/Koala.png" style="width:15%"/>
    </drag-scroll>
    `,
    styles: [`
      drag-scroll {
        height: 50px
        width: 50px
      }
      `]
  })

export class OtherSkins{
    @ViewChild('nav', {read: DragScrollComponent, static:false}) ds: DragScrollComponent;
}