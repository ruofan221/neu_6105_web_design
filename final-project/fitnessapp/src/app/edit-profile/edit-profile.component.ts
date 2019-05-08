import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from "@angular/router";
import {User} from "../shared/user.model";


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {

  coach:User;
  coachDetails;

 isCorrect:boolean=false;
selectedFile:File =null;
  
  heightPattern = /^[0-9]+([.]{1}[0-9]+){0,1}$|^$/;
  weightPattern = /^[0-9]+([.]{1}[0-9]+){0,1}$|^$/;

  imageUrl:any;
  fileName;
  showpic;

  
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getCoachProfile().subscribe(
      res  =>{
        console.log(res);
        this.coachDetails=res['user'];
      },
      err =>{
        console.log(err);
      }
    );
 
  }

  // upload the image
  onChangeSelectFile(event){
  const file = event.currentTarget.files[0];
  console.log(file)
  this.fileName = file.name;
  console.log(this.fileName)
  this.imageUrl = "./assets/images/" + this.fileName;
  console.log(this.imageUrl)
  this.showpic = true;
  }



 

  update(info: any){

    // const fd=new FormData();
    // fd.append('image',this.selectedFile,this.selectedFile.name);
    

    if(info.height ==undefined){
      info.height=this.coachDetails.height
    }
    if(info.weight ==undefined){
      info.weight=this.coachDetails.weight
    }
    let checkh = this.heightPattern.test(info.height);
    let checkw = this.weightPattern.test(info.weight);

    if(checkh&&checkw){
      console.log("update component");
      this.userService.updateUser(this.coachDetails._id,info).subscribe(
        req =>{
        // req=info;
        // console.log(req);
        // console.log(info);
        },
        err =>{
          console.log(err);
        }
  
      );
      window.alert("save the profile successfully!");
      this.router.navigate(['/coachProfile']);
      this.userService.getCoachProfile().subscribe(
        res  =>{
          console.log(res);
          this.coachDetails=res['user'];
        },
        err =>{
          console.log(err);
        }
      );

    }else{
      this.isCorrect=true;
    }
}

}


