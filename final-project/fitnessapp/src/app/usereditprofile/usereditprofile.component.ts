import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../shared/user.model';
import { UserService } from '../shared/user.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-usereditprofile',
  templateUrl: './usereditprofile.component.html',
  styleUrls: ['./usereditprofile.component.scss']
})
export class UsereditprofileComponent implements OnInit {
  user:User;
  userDetails;
  profile;
  container;
  fullname: String;
  imageUrl:any;
  fileName;
  showpic;
 

  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  UserInfo: any;
  constructor(private userService: UserService, private router: Router,private sanitizer: DomSanitizer) { }

  ngOnInit() {

    this.showpic = false;
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
         console.log(this.userDetails);
      },
      err => { 
        console.log(err);
      }
    );

    
  

  }

//update form
  update(info: any){
    console.log("update component");
    
    // console.log(info)
    // console.log(this.coach)
    this.userService.updateUser(this.userDetails._id,info).subscribe(
      req =>{
      // req=info;
     //  console.log(req);
    console.log("111"+ JSON.stringify(info));
      },
      err =>{
        console.log(err);
      }

    );
    this.router.navigate(['/userprofile']);
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
         console.log(this.userDetails);
      },
      err => { 
        console.log(err);
      }
    );
    
}

onChangeSelectFile(event){
  const file = event.currentTarget.files[0];
  console.log(file)
  this.fileName = file.name;
  console.log(this.fileName)
  this.imageUrl = "./assets/images/" + this.fileName;
  console.log(this.imageUrl)
  this.showpic = true;
 // this.UserInfo[field] = file;
      // 必须 bypassSecurityTrustUrl 转换一下 url ，要不能angular会报，说url不安全错误。
      // this.imageUrl = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(file)); 
      // console.log(this.imageUrl.changingThisBreaksApplicationSecurity)
     
  }

 


}
