import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-coachfollowervideos',
  templateUrl: './coachfollowervideos.component.html',
  styleUrls: ['./coachfollowervideos.component.scss']
})
export class CoachfollowervideosComponent implements OnInit {

  userid;
  userVideos :any =[];
  user;
  videos;

  constructor(private userService: UserService, private router: Router,private routeInfo:ActivatedRoute,private formBuilder: FormBuilder,public sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.userid = this.routeInfo.snapshot.params.id;
    this.getThisUser();
    this.getUserVideos();
    console.log(this.userid);
  }

  getThisUser(){
    this.userService.getSingleUser(this.userid).subscribe(data => {
      this.user = data;
});
  }


  getUserVideos(){

    //get this user
    this.userService.getSingleUser(this.userid).subscribe(data => {
      this.user = data;
    //get all videos
    this.userService.getAllVideos().subscribe(videos => {
      this.videos = videos;
    //find user videos
        for(let video of this.videos){
          if(this.user.user.videos.indexOf(video._id)>-1){
              this.userVideos.push(video);
              console.log(this.userVideos);
          }
        }
      });
    });

  }

  
}
