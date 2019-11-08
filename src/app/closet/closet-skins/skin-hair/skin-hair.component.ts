import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-skin-hair',
  templateUrl: './skin-hair.component.html',
  styleUrls: ['./skin-hair.component.css']
})
export class SkinHairComponent implements OnInit {
<<<<<<< Updated upstream
  

=======
>>>>>>> Stashed changes

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  skinSelected(){
    this.router.navigate(['../buy_skin'], {relativeTo: this.route});
  }
}
