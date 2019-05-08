import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { Video } from '../shared/video.model';


@Component({
  selector: 'app-all-videos',
  templateUrl: './all-videos.component.html',
  styleUrls: ['./all-videos.component.scss']
})
export class AllVideosComponent implements OnInit {
 
  
  videos :  any =[];
  video : Video;
  favoriteVideolist :any=[];
  fullName;
  userDetails;
  userid;
  videoid;
  coachid;




 constructor(private userService: UserService, private router: Router) { }


 ngOnInit() {
  this.showAllVideos();
 this.userService.getCoachProfile().subscribe(
   res => {
     this.userDetails = res['user'];
     this.fullName = this.userDetails.fullName;
     this.userid = this.userDetails._id;
   

   },
   err => { 
     console.log(err);
   }
 );



 }

 //get favorite videos
getFavoriteVideos(){
 for(let video of this.videos){
   if(this.userDetails.videos.indexOf(video._id)>-1){
       this.favoriteVideolist.push(video);
   }
 }
}





  //get all videos 
   showAllVideos = () => {
     this.userService.getAllVideos().subscribe(videos => {
       this.videos = videos;
       
       
       
       console.log("video10=  "+JSON.stringify(this.videos[0]))

      console.log("video10id=  "+JSON.stringify(this.videos[0]._id))
     
      
     });
   }




   //add a video to my videos
   favoriteVideo(id) {
     this.userService.favoriteVideo(id).subscribe(video => {
       this.showAllVideos(); // Refresh blogs after favourite
       this.getFavoriteVideos();
     });
   }

   //remove a video to my videos
   canclefavoriteVideo(id) {
     this.userService.cancelfavoriteVideo(id).subscribe(video => {
       this.showAllVideos(); // Refresh blogs after favourite
       
     });
   }
   

   
   //like a video
   likeVideo(id){
     this.userService.likeVideo(id).subscribe(video => {
       this.showAllVideos(); // Refresh blogs after like
       
     });
   }

   //dislike a video
   dislikeVideo(id){
     this.userService.cancellikeVideo(id).subscribe(data => {
       this.showAllVideos();// Refresh videos after dislike
     });
   }







}