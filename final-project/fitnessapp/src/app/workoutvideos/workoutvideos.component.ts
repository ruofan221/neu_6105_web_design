import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { Video } from '../shared/video.model';

@Component({
  selector: 'app-workoutvideos',
  templateUrl: './workoutvideos.component.html',
  styleUrls: ['./workoutvideos.component.scss']
})
export class WorkoutvideosComponent implements OnInit {

   videos :  any =[];
   video : Video;
   fullName;
   userDetails;
   userid;
   videoid;
   coachid;
   users;
   onevideo;
   likelist:any=[];



  videopictures = ['./assets/images/workvideo1.jpg',
  './assets/images/workvideo2.jpg',
  './assets/images/i25mg.jpg']
  

  constructor(private userService: UserService, private router: Router) { }
 

  ngOnInit() {
   this.showAllVideos();
  this.userService.getUserProfile().subscribe(
    res => {
      this.userDetails = res['user'];
      this.fullName = this.userDetails.fullName;
      this.userid = this.userDetails._id;
      // console.log("res=  "+JSON.stringify(res));
      // console.log("fullname=  "+this.fullName);
      // console.log("userid=  "+this.userid);

    },
    err => { 
      console.log(err);
    }
  );

// this.getLikerName();

  }

  


 


   //get all videos 
    showAllVideos = () => {
      this.userService.getAllVideos().subscribe(videos => {
        this.videos = videos;
        
        
        
        
       // console.log("video10=  "+JSON.stringify(this.videos[0]))

      // console.log("video10id=  "+JSON.stringify(this.videos[0]._id))
      
       
      });
    }



 
    //add a video to my videos
    favoriteVideo(id) {
      this.userService.favoriteVideo(id).subscribe(video => {
        this.showAllVideos(); // Refresh blogs after favourite
       
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



    // getLikerName(){
    //   //get all videos
    //   this.userService.getAllVideos().subscribe(videos=>{
    //     this.videos = videos;
    //       //get all users
    //       this.userService.getUserList().subscribe(data => {
    //         this.users = data;
    //         //get one user in userlist
    //         for(let user of this.users){
    //         //get one video in videolist
    //         for(let video of this.videos){
    //             //check if userid in video likedBy list
    //             if(video.likedBy.indexOf(user._id)>-1){
    //               this.likelist.push(user);
                  
    //             }

    //           }
    //         }


    //       });
    //   });
    // }



    transform(url:any){
      let replacedurl;
      if (!url) { console.log("unvalid url") }
      else{
        console.log("transform works")
        replacedurl = url.replace('watch?v=','embed/');
        return replacedurl;
      }
    }
    


  


}
