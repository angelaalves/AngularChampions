import { Component, OnInit, Injectable } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators, NgForm, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-skin',
  templateUrl: './add-skin.component.html',
  styleUrls: ['./add-skin.component.css']
})

@Injectable({providedIn:'root'})
export class AddSkinComponent implements OnInit {
  addSkinForm: FormGroup;

  constructor(private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder,private http: HttpClient) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.initForm();
        }
      )
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const idSkin = "1";
    const skinName = form.value.skinName;
    const imagePath = form.value.filePath;
    const minXP = form.value.minXP;
    const champiesCost = form.value.numberOfChampies;
    const skinType = form.value.skinType;

    console.log('addUserForm', form.value);
  
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:8085/skins/Create?idSkin=' + idSkin + '&skinName=' + skinName + '&imagePath=' + imagePath + '&minXP=' + minXP +
      '&champiesCost=' + champiesCost + '&skinType=' + skinType, true);
    this.http.post<any>('http://localhost:8085/skins/Create?idSkin=' + idSkin + '&skinName=' + skinName + '&imagePath=' + imagePath + '&minXP=' + minXP +
      '&champiesCost=' + champiesCost + '&skinType=' + skinType,
      {
        idSkin,
        skinName,
        imagePath,
        minXP,
        champiesCost,
        skinType
      }
    ).subscribe();

    console.log(this.addSkinForm);

    this.router.navigate(['/ancient_profile'], {relativeTo: this.route});


   
  }

  private initForm() {
    let file = '';
    let skinName = '';
    let mininumXP = '';
    let numberOfChampies = '';
    let skinType = '';

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