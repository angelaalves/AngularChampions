import { Component, ViewChild } from '@angular/core';
import { DragScrollComponent } from 'ngx-drag-scroll';

@Component({
    selector: 'app-other-skins',
    templateUrl: './closet-skins.component.html',
    styleUrls: ['./closet-skins.component.css'],
    template:`
    <div class="scrollmenu" id=style-8>
      <img src="../../../assets/Others/FairyWings.png" style="width:15%"/>
      <img  src="../../../assets/Others/Koala.png" style="width:15%"/>
    </div>
    `,
    styles: [`
     div.scrollmenu {
    background-color: transparent;
    overflow: auto;
    white-space: nowrap;
  }
  
  div.scrollmenu a {
    display: inline-block;
    color: transparent;
    text-align: center;
    padding: 14px;
    text-decoration: none;
  }
  
  div.scrollmenu a:hover {
    background-color:transparent;
  }
      #slidescroll{
        background-color: transparent;
      }
        #style-8::-webkit-scrollbar-track
        {
          border: 1px solid black;
          background-color:transparent;
        }
        
        #style-8::-webkit-scrollbar
        {
          width: 10px;
          background-color: transparent;
        }
        
        #style-8::-webkit-scrollbar-thumb
        {
          background-color: #000000;	
        }
      `]
  })

export class OtherSkins{
    @ViewChild('nav', {read: DragScrollComponent, static:false}) ds: DragScrollComponent;
}