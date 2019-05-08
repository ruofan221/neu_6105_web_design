import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from "@angular/router";
import {User} from "../shared/user.model";
import {Video} from "../shared/video.model";
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-coach-upload',
  templateUrl: './coach-upload.component.html',
  styleUrls: ['./coach-upload.component.scss']
})
export class CoachUploadComponent implements OnInit {
  

  coachDetails;
  user:User;
  coachid;
  videos;
  myVideo;

  videoDetails: Video = {
    Name: '',
    Description:'',
    like: 0,
    createdate:new Date(),
    user: ['',''],
    creater:'',
    likedBy:['',''],
    comments:['hi','hi'],
    url:'',
    coverurl:''
  };
  fileName;
  coverurl;
  showpic;

urlPattern = /^(https|ftp|file):\/\//;
isCorrect:boolean=false;
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
  update(info:any){

    let check = this.urlPattern.test(info.url);
    console.log(info.url);
 

    if(check){
      console.log("update component");
      this.userService.postVideo(info).subscribe(
        res=>{
          
          console.log("upload success")
        },
      
          err => {
            console.log(err);
        }
      );
      window.alert("Upload the course success");
      this.router.navigate(['/coachVideo']);
      this.userService.getCoachProfile().subscribe(
        res => {
          this.coachDetails = res['user'];
        
          this.coachid = this.coachDetails._id;
          this.userService.getAllVideos().subscribe(videos => {
            this.videos = videos;
          for(let video of this.videos){
            if(this.coachid==video.creater){
                this.myVideo.push(video);  
            }
          }
         
        });
        },
        err => { 
          console.log(err);
        }
      );

    }else{
      this.isCorrect=true;
    }

   
  }

    // upload the image
    onChangeSelectFile(event){
      const file = event.currentTarget.files[0];
      console.log(file)
      this.fileName = file.name;
      console.log(this.fileName)
      this.coverurl = "./assets/images/" + this.fileName;
      console.log(this.coverurl)
      this.showpic = true;
      }

      
 
}
