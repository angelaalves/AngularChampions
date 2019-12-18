import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-preview-skin',
  templateUrl: './preview-skin.component.html',
  styleUrls: ['./preview-skin.component.css']
})
export class PreviewSkinComponent implements OnInit {
 


  fileData: File = null; 
   private f=new BehaviorSubject<File>(this.fileData);
  file=this.f.asObservable();
  previewUrl:any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;
  constructor(private http: HttpClient) { }
    ngOnInit(): void {
  }
  
  fileProgress(fileInput: any) {
        this.fileData = <File>fileInput.target.files[0];
     var mimeType = this.fileData.type;
      if (mimeType.match(/image\/*/) == null) {
        return;
      }
   
      var reader = new FileReader();      
      reader.readAsDataURL(this.fileData); 
      reader.onload = (_event) => { 
        this.previewUrl = reader.result; 
      }
  }
   

   
  onSubmit() {
      const formData = new FormData();
        formData.append('file', this.fileData);
        console.log ("Final");
        console.log(this.fileData);
        
       
  }
}
