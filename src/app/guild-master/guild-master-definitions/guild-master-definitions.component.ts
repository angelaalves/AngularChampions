import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-guild-master-definitions',
  templateUrl: './guild-master-definitions.component.html',
  styleUrls: ['./guild-master-definitions.component.css']
})
export class GuildMasterDefinitionsComponent {

  constructor(private router: Router, private route: ActivatedRoute) { }

  redirectChangePassword() {
    this.router.navigate(['/change_password'], { relativeTo: this.route });
  }
}