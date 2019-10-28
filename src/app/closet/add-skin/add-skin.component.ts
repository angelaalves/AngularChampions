import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-add-skin',
  templateUrl: './add-skin.component.html',
  styleUrls: ['./add-skin.component.css']
})
export class AddSkinComponent implements OnInit {
  addSkinForm: FormGroup;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.initForm();
        }
      )
  }

submit(addUserForm: FormGroup){
    console.log(this.addSkinForm);
    this.router.navigate(['/ancient_profile'], {relativeTo: this.route});
  }

  private initForm() {
    let file='';
    let skinName='';
    let mininumXP='';
    let numberOfChampies='';
    let skinType='';

    this.addSkinForm = new FormGroup({
      'file': new FormControl(file, Validators.required),
      'skinName': new FormControl(skinName, Validators.required),
      'mininumXP': new FormControl(mininumXP, Validators.required),
      'numberOfChampies': new FormControl(numberOfChampies, Validators.required),
      'skinType': new FormControl(skinType, Validators.required)
    });
  }

  addSkin(addSkinForm: FormGroup) {
    (<FormArray>this.addSkinForm.get('event')).push(
      new FormGroup({
        'file': new FormControl(null, Validators.required),
        'skinName': new FormControl(null, Validators.required),
        'mininumXP': new FormControl(null, Validators.required),
        'numberOfChampies': new FormControl(null, Validators.required),
        'skinType': new FormControl(null, Validators.required)
      })
    );
  }
}