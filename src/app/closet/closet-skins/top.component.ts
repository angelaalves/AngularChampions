import { Component, ViewChild } from '@angular/core';

@Component({
    selector: 'app-top-skins',
    templateUrl: './closet-skins.component.html',
    styleUrls: ['./closet-skins.component.css'],
    template:`
    <div class="scrollmenu" id=style-8>
      <img  src="../../../assets/Top/TopPolarBlack.png" style="width:20%"/>
      <img  src="../../../assets/Top/TopPolarWhite.png" style="width:20%">
    
      <img  src="../../../assets/Top/TopSweat.png" style="width:20%">
      <img  src="../../../assets/Top/TopSweatBlue.png" style="width:20%">
      <img  src="../../../assets/Top/TopUgly.png" style="width:20%">
      <img  src="../../../assets/Top/TopWhite.png" style="width:20%">
       <img  src="../../../assets/Top/TopBlue.png" style="width:20%">
      <img  src="../../../assets/Top/TopPink.png" style="width:20%">
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
  
export class TopSkins{
}