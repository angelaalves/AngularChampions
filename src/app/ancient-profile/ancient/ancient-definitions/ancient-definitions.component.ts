import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
@Component({
  selector: 'app-ancient-definitions',
  templateUrl: './ancient-definitions.component.html',
  styleUrls: ['./ancient-definitions.component.css']
})
export class AncientDefinitionsComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  onChangePassword(){
    this.router.navigate(['../change_password'], {relativeTo: this.route});
  }
}