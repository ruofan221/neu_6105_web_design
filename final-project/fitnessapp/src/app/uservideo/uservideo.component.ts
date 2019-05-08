import { Component, OnInit } from '@angular/core';
import { Video } from '../shared/video.model';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-uservideo',
  templateUrl: './uservideo.component.html',
  styleUrls: ['./uservideo.component.scss']
})
export class UservideoComponent implements OnInit {
  videos :  any =[];
  video : Video;
  favoriteVideo: any =[];
  fullName;
  userDetails;
  userid;
  videoid;
  coachid;
  isClicked:boolean;
  isFavorite;
  loadingVideos;
  

  videopictures = ['./assets/images/bigimage.jpg',
  './assets/images/health.jpg',
  './assets/images/i25mg.jpg']

  constructor(private userService: UserService, private router: Router) { 
   
  }

  ngOnInit() {

    this.isFavorite=true;
    this.getAllVideos();

    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
        this.fullName = this.userDetails.fullName;
        this.userid = this.userDetails._id;
        // console.log("resvideo=  "+JSON.stringify(this.userDetails.videos ));
        // console.log("fullname=  "+this.fullName);
        // console.log("userid=  "+this.userid);
        this.getAllfaVideos();
      },
      err => { 
        console.log(err);
      }
    );
    
  // this.getFavoriteVideos();
  //  console.log(this.favoriteVideo)
  }


//get all videos 
getAllVideos = () => {
  this.userService.getAllVideos().subscribe(videos => {
    this.videos = videos; 
  });
}

//get favorite videos
getAllfaVideos = () => {
  this.userService.getAllVideos().subscribe(videos => {
    this.videos = videos;
    for(let video of this.videos){
      if(this.userDetails.videos.indexOf(video._id)>-1){
          this.favoriteVideo.push(video); 
      }
    }
  });
}


//add a video to my videos
addfavoriteVideo(id) {
  this.userService.favoriteVideo(id).subscribe(video => {
    this.getAllVideos(); // Refresh blogs after favourite
    // this.getFavoriteVideos();
  });
}

//remove a video to my videos
canclefavoriteVideo(id) {
  this.userService.cancelfavoriteVideo(id).subscribe(video => {
    this.getAllVideos(); // Refresh blogs after favourite
  });
  const index = this.favoriteVideo.indexOf(id); // Get position of id in array
 // this.favoriteVideo.reverse();
  this.favoriteVideo.splice(index, 1);
  //this.isFavorite=false;
}

 //like a video
 likeVideo(id){
  this.userService.likeVideo(id).subscribe(video => {
    this.getAllVideos(); // Refresh blogs after like 
  });
}

//dislike a video
dislikeVideo(id){
  this.userService.cancellikeVideo(id).subscribe(data => {
    this.getAllVideos();// Refresh videos after dislike
  });
}

// Reload blogs on current page
reloadVideos() {
  this.loadingVideos = true; // Used to lock button
  location.reload();
  setTimeout(() => {
    this.loadingVideos = false; // Release button lock after four seconds
  }, 4000);
}

// disable favorite btn
collapse(id) {
  const index = this.favoriteVideo.indexOf(id); // Get position of id in array
  this.favoriteVideo.splice(index, 1); // Remove id from array
}




  

}
