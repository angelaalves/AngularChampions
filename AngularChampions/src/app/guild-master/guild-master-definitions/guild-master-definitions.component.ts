import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-guild-master-definitions',
  templateUrl: './guild-master-definitions.component.html',
  styleUrls: ['./guild-master-definitions.component.css']
})
export class GuildMasterDefinitionsComponent implements OnInit {

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
  }

  redirectChangePassword(){
    this.router.navigate(['/change_password'], {relativeTo: this.route});
  }
}