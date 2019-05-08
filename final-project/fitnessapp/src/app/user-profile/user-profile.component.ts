import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from "@angular/router";
import{ FileUploader } from "ng2-file-upload";
import { User } from "../shared/user.model"

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})



export class UserProfileComponent implements OnInit {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  phoneRegex = /^(\+?(\d{1}|\d{2}|\d{3})[- ]?)?\d{3}[- ]?\d{3}[- ]?\d{4}$/;
  userDetails;
  selectedFile: string;

  fullname:String;
  phone:string;
  address1:string;
  address2:string;
  city:string;
  state:string;
  zip:string;
// 存储user update之后的信息
  user: User;
 
 

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
   
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

  // updateProfile(){
  //   // console.log(this.userDetails);
  //   this.userService.updateUser(this.userDetails._id,this.userDetails).subscribe(null, (err) => {
  //     console.log(err);
  //   }
  // );
  // }

  // onFileChanged(event) {
  //   const file = event.target.files[0];
  //   var reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = function(){
  //   const url = this.result;
  //   console.log(url);
  //   }
  // }

  // onUpload() {

  // }

  onLogout(){
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }

  edit(){
    this.router.navigate(['/useredit']);
  }
}
