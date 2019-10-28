import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-warrior-definitions',
  templateUrl: './warrior-definitions.component.html',
  styleUrls: ['./warrior-definitions.component.css']
})
export class WarriorDefinitionsComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  onChangePassword(){
    this.router.navigate(['/change_password'], {relativeTo: this.route})
  }

}