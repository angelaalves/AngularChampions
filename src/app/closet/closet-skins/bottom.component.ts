import { Component, ViewChild } from '@angular/core';
import { DragScrollComponent } from 'ngx-drag-scroll';

@Component({
    selector: 'app-bottom-skins',
    templateUrl: './closet-skins.component.html',
    styleUrls: ['./closet-skins.component.css'],
    template:`
    <div class="scrollmenu" id=style-8>
    <img src="../../../assets/Bottom/BottomTrouserBlack.png" style="width:15%"/>
    <img src="../../../assets/Bottom/BottomTrouserBlue.png" style="width:15%"/>
    <img src="../../../assets/Bottom/BottomTrouseWhite.png" style="width:15%"/>
    <img src="../../../assets/Bottom/BottomSkirtBlack.png" style="width:15%"/>
    <img src="../../../assets/Bottom/BottomSkirtBlue.png" style="width:15%"/>
    <img src="../../../assets/Bottom/BottomSkirtWhite.png" style="width:15%"/>
      <img src="../../../assets/Bottom/BottomJumpsuitBlue.png" style="width:15%"/>
      <img src="../../../assets/Bottom/BottomJumpsuitWhite.png" style="width:15%"/>
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

export class BottomSkins{
}