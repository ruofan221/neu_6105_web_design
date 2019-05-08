import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-userfollowingcoachvideos',
  templateUrl: './userfollowingcoachvideos.component.html',
  styleUrls: ['./userfollowingcoachvideos.component.scss']
})
export class UserfollowingcoachvideosComponent implements OnInit {
    coachid;
    coach;
    videos;
    coachvideos :any =[];
    videopictures = ['./assets/images/bigimage.jpg',
    './assets/images/health.jpg',
    './assets/images/i25mg.jpg']





  constructor(private userService: UserService, private router: Router,private routeInfo:ActivatedRoute,private formBuilder: FormBuilder,public sanitizer: DomSanitizer) { }

  ngOnInit() {
    //get the coach id
    this.coachid = this.routeInfo.snapshot.params.id;
   
    this.getThisCoach();
    this.getCoachVideos();



  }

  getThisCoach(){
    this.userService.getSingleUser(this.coachid).subscribe(data => {
          this.coach = data;
    });
  }

  getCoachVideos(){

    //get this coach
    this.userService.getSingleUser(this.coachid).subscribe(data => {
      this.coach = data;
    //get all videos
    this.userService.getAllVideos().subscribe(videos => {
      this.videos = videos;
    //find coach videos
        for(let video of this.videos){
          if(this.coach.user.videos.indexOf(video._id)>-1){
              this.coachvideos.push(video);
              console.log(this.coachvideos);
          }
        }
      });
    });
  }

  //add a video to my videos
  favoriteVideo(id) {
    this.userService.favoriteVideo(id).subscribe(video => {
      this.getThisCoach();
    this.getCoachVideos();
     
    });
  }

  







}
