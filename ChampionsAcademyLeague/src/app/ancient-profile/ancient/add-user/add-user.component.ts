import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, NgForm, FormArray } from '@angular/forms'
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Player } from 'src/app/shared/player.model';
import { PlayerService } from 'src/app/services/player.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})

export class AddUserComponent implements OnInit{
  addUserForm: FormGroup;

  constructor(private router: Router, private route: ActivatedRoute, private playerService: PlayerService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.initForm();
      }
    )
  }


  onSubmit(form:NgForm){
    /*if(!form.valid){
      return;
    }*/
    const name = form.value.name;
    const email = form.value.email;
    const password = form.value.password;
    const gender = form.value.gender;
    const playerType = form.value.playerType;
    this.playerService.addPlayer(new Player(name, email, password, [], playerType, gender));
    console.log('addUserForm' , form.value);
    this.router.navigate(['/ancient_profile'], {relativeTo: this.route});
  }

  private initForm() {
    let name='';
    let email='';
    let password='';

    this.addUserForm = new FormGroup({
      'name': new FormControl(name, Validators.required),
      'email': new FormControl(email, [Validators.required, Validators.minLength(10)]),
      'password': new FormControl(password, [Validators.required, Validators.minLength(6)])
    });
  }
  addUser(addUserForm: FormGroup) {
    (<FormArray>this.addUserForm.get('event')).push(
      new FormGroup({
        'name': new FormControl(null, [Validators.required]),
        'email': new FormControl(null,[Validators.required, Validators.minLength(10)]),
        'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
      })
    );
  }
}