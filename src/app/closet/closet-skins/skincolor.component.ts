import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-skinColor-skins',
    templateUrl: './closet-skins.component.html',
    styleUrls: ['./closet-skins.component.css'],
    template:`
    <div class="scrollmenu" id=style-8>
      <img src="../../../assets/SkinColor/AngLastairbender.png" style="width:15%" (click)="skinSelected()"/>
      <img src="../../../assets/SkinColor/FemaleBlack.png" style="width:15%"(click)="skinSelected()"/>
      <img src="../../../assets/SkinColor/FemaleBlue.png" style="width:15%" (click)="skinSelected()"/>
      <img src="../../../assets/SkinColor/FemaleChinese.png" style="width:15%" (click)="skinSelected()"/>
      <img src="../../../assets/SkinColor/FemaleGreen.png" style="width:15%" (click)="skinSelected()"/>
      <img src="../../../assets/SkinColor/FemaleMorena.png" style="width:15%" (click)="skinSelected()"/>
      <img src="../../../assets/SkinColor/FemaleMulata.png" style="width:15%" (click)="skinSelected()"/>
      <img src="../../../assets/SkinColor/FemaleRed.png" style="width:15%" (click)="skinSelected()"/>
      <img src="../../../assets/SkinColor/FemalWhie.png" style="width:15%" (click)="skinSelected()"/>
      <img src="../../../assets/SkinColor/MaleBlack.png" style="width:15%" (click)="skinSelected()"/>
      <img src="../../../assets/SkinColor/MaleBlue.png" style="width:15%" (click)="skinSelected()"/>
      <img src="../../../assets/SkinColor/MaleChinese.png" style="width:15%" (click)="skinSelected()"/>
      <img src="../../../assets/SkinColor/MaleGreen.png" style="width:15%" (click)="skinSelected()"/>
      <img src="../../../assets/SkinColor/MaleMolato.png" style="width:15%" (click)="skinSelected()"/>
      <img src="../../../assets/SkinColor/MaleMoreno.png" style="width:15%" (click)="skinSelected()"/>
      <img src="../../../assets/SkinColor/MaleRed.png" style="width:15%" (click)="skinSelected()"/>
      <img src="../../../assets/SkinColor/MaleWhite.png" style="width:15%" (click)="skinSelected()"/>
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
  
export class SkinColorSkins{
  
    constructor(private router: Router, private route: ActivatedRoute){}

    skinSelected(){
      this.router.navigate(['/add_skin'], {relativeTo: this.route});
    }
}