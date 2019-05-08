import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { Video } from '../shared/video.model';

@Component({
  selector: 'app-coach-video',
  templateUrl: './coach-video.component.html',
  styleUrls: ['./coach-video.component.scss']
})
export class CoachVideoComponent implements OnInit {

  videos :  any =[];
   video : Video;
  // isClicked:boolean;
 myVideo: any =[];
  fullName;
 coachDetails;
  userid;
  videoid;
  coachid;


  videopictures = ['./assets/images/bigimage.jpg',
  './assets/images/health.jpg',
  './assets/images/i25mg.jpg']
  
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {

    // this.getAllVideos();
 
    this.userService.getCoachProfile().subscribe(
      res => {
        this.coachDetails = res['user'];
        this.fullName = this.coachDetails.fullName;
        this.coachid = this.coachDetails._id;
        
        console.log("resvideo=  "+JSON.stringify(this.coachDetails.videos ));
        console.log("fullname=  "+this.fullName);
        this.getMyVideos();
      },
      err => { 
        console.log(err);
      }
    );
  
    // this.getMyVideos();

 
  }

  getAllVideos(){
    this.userService.getAllVideos().subscribe(videos => {
      this.videos=videos;
    });
  }

getMyVideos(){
  this.userService.getAllVideos().subscribe(videos => {
    this.videos = videos;
  for(let video of this.videos){
    if(this.coachid==video.creater){
        this.myVideo.push(video);  
    }
  }
 
});
}

deleteVideo(id){
  console.log("click");
  console.log(id);
  this.userService.deleteVideo(id).subscribe(video => {
    console.log("delete success");
     //this.getMyVideos(); // Refresh blogs after favourite
    console.log("delete success");
  });
  window.alert("delete success");
  // this.router.navigate(['/coachVideo']);
  location.reload();
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
  
}

}
