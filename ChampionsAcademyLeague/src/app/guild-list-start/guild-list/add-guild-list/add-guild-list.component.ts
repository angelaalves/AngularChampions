import { Component, OnInit } from '@angular/core';
import { GuildListService } from 'src/app/services/guild-list.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-add-guild-list',
  templateUrl: './add-guild-list.component.html',
  styleUrls: ['./add-guild-list.component.css']
})
export class AddGuildListComponent implements OnInit {
  addGuildMasterForm: FormGroup;
  x; y; z;

  constructor(private guildService: GuildListService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
    .subscribe(
      (params: Params) => {
        this.initForm();
      }
    ); 
    this.x = document.getElementById("buttonAddPlayer");
    this.y = document.getElementById("addButton");
    this.z = document.getElementById("createGuildMasterForm");
  }

  private initForm() {
    let name='';
    let email='';
    let password='';

    this.addGuildMasterForm = new FormGroup({
      'name': new FormControl(name, Validators.required),
      'email': new FormControl(email, Validators.required),
      'password': new FormControl(password, Validators.required)
    });
  }

  addGuildMaster(){
    this.guildService.getPlayer();
    
    if (this.x.style.display === "none" && this.y.style.display === "block" && this.z.style.display === "block") {
      this.x.style.display = "block";
      this.y.style.display = "none";
      this.z.style.display = "none";
    } else {
      this.x.style.display = "none";
      this.y.style.display = "block";
      this.z.style.display = "block";
    }
  }

  addPlayer(){
    this.router.navigate(['../add_user'], {relativeTo: this.route});
  } 

  submit(){
    this.router.navigate(['/ancient_profile'], {relativeTo: this.route});
  }
}