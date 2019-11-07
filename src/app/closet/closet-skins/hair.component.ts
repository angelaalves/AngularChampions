import { Component, ViewChild } from '@angular/core';
import { DragScrollComponent } from 'ngx-drag-scroll';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hair-skins',
  templateUrl: './closet-skins.component.html',
  styleUrls: ['./closet-skins.component.css'],
  template: `
  <div class="scrollmenu" id=style-8>
   
   <img  src="../../../assets/Hair/HairLongBlack.png" style="width:15%" (click)="skinSelected()"/>
      <img src="../../../assets/Hair/HairLongBlonde.png" style="width:15%" (click)="skinSelected()"/>
      <img  src="../../../assets/Hair/HairLongBlue.png" style="width:15%" (click)="skinSelected()"/>
      <img src="../../../assets/Hair/HairLongBrown.png" style="width:15%" (click)="skinSelected()"/>
      <img src="../../../assets/Hair/HairLongGinger.png" style="width:15%" (click)="skinSelected()"/>
      <img src="../../../assets/Hair/HairLongGrey.png" style="width:15%" (click)="skinSelected()"/>
      <img  src="../../../assets/Hair/HairLongPink.png" style="width:15%" (click)="skinSelected()"/>
      <img  src="../../../assets/Hair/HairLongWhite.png" style="width:15%" (click)="skinSelected()"/>
      <img  src="../../../assets/Hair/HairMediumBlack.png" style="width:15%" (click)="skinSelected()"/>
      <img  src="../../../assets/Hair/HairMediumBlonde.png" style="width:15%" (click)="skinSelected()"/>
      <img src="../../../assets/Hair/HairMediumBlue.png" style="width:15%" (click)="skinSelected()"/>
      <img  src="../../../assets/Hair/HairMediumBrown.png" style="width:15%" (click)="skinSelected()"/>
      <img  src="../../../assets/Hair/HairMediumGinger.png" style="width:15%" (click)="skinSelected()"/>
      <img  src="../../../assets/Hair/HairMediumGrey.png" style="width:15%" (click)="skinSelected()"/>
      <img src="../../../assets/Hair/HairMediumPink.png" style="width:15%" (click)="skinSelected()"/>
      <img  src="../../../assets/Hair/HairMediumWhite.png" style="width:15%" (click)="skinSelected()"/>
      <img  src="../../../assets/Hair/HairShortBlack.png" style="width:15%" (click)="skinSelected()"/>
      <img  src="../../../assets/Hair/HairShortBlonde.png" style="width:15%" (click)="skinSelected()"/>
      <img src="../../../assets/Hair/HairShortBlue.png" style="width:15%" (click)="skinSelected()"/>
      <img  src="../../../assets/Hair/HairShortBrown.png" style="width:15%" (click)="skinSelected()"/>
      <img src="../../../assets/Hair/HairShortGinger.png" style="width:15%" (click)="skinSelected()"/>
      <img src="../../../assets/Hair/HairShortGrey.png" style="width:15%" (click)="skinSelected()"/>
      <img src="../../../assets/Hair/HairShortPink.png" style="width:15%" (click)="skinSelected()"/>
      <img  src="../../../assets/Hair/HairShortWhite.png" style="width:15%" (click)="skinSelected()"/>
    
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

export class HairSkins {

  constructor(private router: Router, private route: ActivatedRoute) { }

  skinSelected() {
    this.router.navigate(['/add_skin'], { relativeTo: this.route });
  }

}