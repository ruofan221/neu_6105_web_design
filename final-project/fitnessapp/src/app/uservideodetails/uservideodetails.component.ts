import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Video } from '../shared/video.model';
import { User } from '../shared/user.model';
import { Validators, FormBuilder } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-uservideodetails',
  templateUrl: './uservideodetails.component.html',
  styleUrls: ['./uservideodetails.component.scss']
})
export class UservideodetailsComponent implements OnInit {
  videos : any=[];
  video:any ;
  videoid;
  creater;
  userid;
  fullName;
  userDetails;
  messageClass;
  message;
  newComment = [];
  enabledComments = [];
  commentForm;
  processing = false;
  coach;
  users;
  commentsarray: any=[];
  comments : any=[];
  postComments: any = [
    // {userName : "",comment: ""}
  ]
  finalComments=[];
  url:String="https://www.youtube.com/watch?v=eqJjmmR5Xj0";
  likelist :any =[];


  

  @Input() userService: UserService;
  



  constructor(userService: UserService, private router: Router,private routeInfo:ActivatedRoute,private formBuilder: FormBuilder,public sanitizer: DomSanitizer) {
    this.userService= userService;
    this.createCommentForm(); // Create form for posting comments on a video post
   }

  ngOnInit() {
   // this.getAllUser();

    //get the video id
    this.videoid = this.routeInfo.snapshot.params.id;
    this.getThisVideo();
    
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

   
   this.getLikerName();
   

   

  }



  getSingleUser(){
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

  }

      // Function to GET current video with id in params
      getThisVideo(){
        this.userService.getSingleVideo(this.videoid).subscribe(data => {
          this.video = data; // Save video object for use in HTML
          this.creater = this.video.video.creater;
          this.video.video.url = this.transform(this.video.video.url);
         //get one coach info( to show the creater name)
        this.userService.getSingleUser(this.video.video.creater).subscribe(data => {    
            this.coach = data; 
        });
        //get a list of video comments
          this.commentsarray = this.video.video.comments;
          //get all user
          this.userService.getUserList().subscribe(data => {
            this.users = data; 
           
            //get one user
            for(let c of this.users ){       
              //get one comment
              for(let comment of this.commentsarray){            
                //find the user who post comment and add them to a list
                    if(c._id == comment.commentor){  
                     // this.commentsarray.splice(0,this.commentsarray.length,c.fullName)   
                     // console.log( this.commentsarray)               
                      this.comments.push(c);
                      this.finalComments.push(comment);
                    }
              }             
            }
           // get a list of user who post comment 
           //this.finalComments =this.comments; 
          // this.finalComments.reverse();
        });
      });
      }

        getUserName(){



        }




      getLikerName(){
         //get all user
        this.userService.getUserList().subscribe(data => {
          this.users = data; 
          

          //get single video
          this.userService.getSingleVideo(this.videoid).subscribe(data => {
            this.video = data;
            this.video.video.url=this.transform(this.video.video.url);
              //get one user
                for ( let user of this.users){
                    
                  //check if user in likedBylist
                    if(this.video.video.likedBy.indexOf(user._id)>-1){
                        this.likelist.push(user);
                    }
            }
          });
        });
      }




  

     

//get all videos 
showAllVideos = () => {
  this.userService.getAllVideos().subscribe(videos => {
    this.videos = videos;
   
  });
}




// Create form for posting comments
createCommentForm() {
  this.commentForm = this.formBuilder.group({
    comment: ['', Validators.compose([
      Validators.required,
      Validators.minLength(1),
      Validators.maxLength(50)
    ])]
  })
}


 // Enable the comment form
 enableCommentForm() {
  this.commentForm.get('comment').enable(); // Enable comment field
}

// Disable the comment form
disableCommentForm() {
  this.commentForm.get('comment').disable(); // Disable comment field
}


// Function to post a new comment on video post
draftComment(id) {
  this.commentForm.reset(); // Reset the comment form each time users starts a new comment
  this.newComment = []; // Clear array so only one post can be commented on at a time
  this.newComment.push(id); // Add the post that is being commented on to the array
}

// Function to cancel new post transaction
cancelSubmission(id) {
  const index = this.newComment.indexOf(id); // Check the index of the video post in the array
  this.newComment.splice(index, 1); // Remove the id from the array to cancel post submission
  this.commentForm.reset(); // Reset  the form after cancellation
  this.enableCommentForm(); // Enable the form after cancellation
  this.processing = false; // Enable any buttons that were locked
}

// Expand the list of comments
expand(id) {
  this.enabledComments.push(id); // Add the current video post id to array
 
}

// Function to post a new comment
postComment(id) {
  this.disableCommentForm(); // Disable form while saving comment to database
  this.processing = true; // Lock buttons while saving comment to database
  const comment = this.commentForm.get('comment').value; // Get the comment value to pass to service function
  // Function to save the comment to the database
  this.userService.postComment(id, comment).subscribe(data => {
    this.getThisVideo();// Refresh page to reflect the new comment
    const index = this.newComment.indexOf(id); // Get the index of the video id to remove from array
    this.newComment.splice(index, 1); // Remove id from the array
    this.enableCommentForm(); // Re-enable the form
    this.commentForm.reset(); // Reset the comment form
    this.processing = false; // Unlock buttons on comment form
    if (this.enabledComments.indexOf(id) < 0) this.expand(id); // Expand comments for user on comment submission
  });
  this.comments = [];
  this.finalComments = [];
}
// Collapse the list of comments
collapse(id) {
  const index = this.enabledComments.indexOf(id); // Get position of id in array
  this.enabledComments.splice(index, 1); // Remove id from array

}


//add a video to my videos
favoriteVideo(id) {
  this.userService.favoriteVideo(id).subscribe(video => {
    this.getThisVideo();// Refresh blogs after favourite
    
  });
  this.comments = [];
   this.finalComments = [];
}

splicelikename(id){
  const index = this.likelist.indexOf(id); // Get position of id in array
  this.likelist.splice(index, 1); // Remove id from array

}

addlikename(id){
  const index = this.likelist.indexOf(id); // Get position of id in array
  this.likelist.push(index); // add id to array

}



//remove a video to my videos
canclefavoriteVideo(id) {
  this.userService.cancelfavoriteVideo(id).subscribe(video => {
    this.getThisVideo(); // Refresh blogs after favourite
    
  });
  this.comments = [];
  this.finalComments = [];

}

//following
following(id){
  this.userService.follow(id).subscribe(user => {
   this.getThisVideo();// Refresh blogs after favourite
   this.getSingleUser();
  });
  this.comments = [];
  this.finalComments = [];
}

//cancle following
unfollowing(id){
  this.userService.cancelFollowing(id).subscribe(user => {
   this.getThisVideo(); // Refresh blogs after favourite
   this.getSingleUser();
  });
  this.comments = [];
  this.finalComments = [];
}


//like a video
likeVideo(id){
  this.userService.likeVideo(id).subscribe(video => {
    this.getThisVideo(); // Refresh blogs after like
    
  });
  this.comments = [];
  this.finalComments = [];
  this.addlikename(id);
  location.reload();
  

}

//dislike a video
dislikeVideo(id){
  this.userService.cancellikeVideo(id).subscribe(data => {
    this.getThisVideo();// Refresh videos after dislike
  });
  this.comments = [];
  this.finalComments = [];
  this.splicelikename(id);
 
}


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
