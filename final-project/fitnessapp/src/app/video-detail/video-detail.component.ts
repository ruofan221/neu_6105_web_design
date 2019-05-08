import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Video } from '../shared/video.model';
import { User } from '../shared/user.model';
import { DomSanitizer } from '@angular/platform-browser';


import { Validators, FormBuilder } from '@angular/forms';
import { transformAll } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'app-video-detail',
  templateUrl: './video-detail.component.html',
  styleUrls: ['./video-detail.component.scss']
})
export class VideoDetailComponent implements OnInit {
  creater:User;
  video:any ={
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
  videoid;
  coachDetails;
  fullName;
  coachid;

  newReply = [];
  enabledReply= [];
  replyForm;
  processing = false;
  coach;
  users;
  commentsarray: any=[];
  comments : any=[];
  postComments: any = [
    // {userName : "",comment: ""}
  ]
  finalComments=[];
  commentid;



  @Input() userService: UserService;
  constructor(userService: UserService, private router: Router,private routeInfo:ActivatedRoute,private formBuilder: FormBuilder,public sanitizer: DomSanitizer) {
    this.userService= userService;
    this.createReplyForm();
   }

  ngOnInit() {
    this.videoid = this.routeInfo.snapshot.params.id;
    this.getThisVideo();
    // this.url=this.video.url;


    this.userService.getCoachProfile().subscribe(
      res => {
        this.coachDetails = res['user'];
        this.fullName = this.coachDetails.fullName;
        this.coachid = this.coachDetails._id;
        // this.url=this.video.url;
        
        console.log("resvideo=  "+JSON.stringify(this.coachDetails.videos ));
        // console.log(this.url);
        console.log("fullname=  "+this.fullName);

   
      },
      err => { 
        console.log(err);
      }
    );
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
  
   // Function to GET current video with id in params
//    getThisVideo(){
//     this.userService.getSingleVideo(this.videoid).subscribe(data => {
      
//       this.video = data; // Save video object for use in HTML

//       this.commentsarray=this.video.video.comments;
      

//       this.video.video.url = this.transform(this.video.video.url);
//       console.log(this.video.video.url);
//     // this.userService.getSingleUser(this.video.video.creater).subscribe(data => {
      
//     //     this.coachDetails = data; 
//     // }
//     // );
//   });

// }


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
//  post a reply to this comment
draftReply(id){

  this.replyForm.reset(); // Reset the reply form each time coach starts a new reply
  this.newReply = []; // Clear array so only one post can be commented on at a time
  this.newReply.push(id); // Add the post that is being commented on to the array
  this.commentid=id;
  console.log(id);
  console.log(this.commentid);
}

// Create form for posting replys
createReplyForm() {
this.replyForm = this.formBuilder.group({
reply: ['', Validators.compose([
  Validators.required,
  Validators.minLength(1),
  Validators.maxLength(50)
])]
})
}


// Enable the Reply form
enableReplyForm() {
this.replyForm.get('reply').enable(); // Enable reply field
}

// Disable the Reply form
disableReplyForm() {
this.replyForm.get('reply').disable(); // Disable reply field
}

// Function to cancel new post transaction
cancelSubmission(id) {
const index = this.newReply.indexOf(id); // Check the index of the video post in the array
this.newReply.splice(index, 1); // Remove the id from the array to cancel post submission
this.replyForm.reset(); // Reset  the form after cancellation
this.enableReplyForm(); // Enable the form after cancellation
this.processing = false; // Enable any buttons that were locked
}

// Function to post a new comment
postReply(id) {
this.disableReplyForm(); // Disable form while saving reply to database
this.processing = true; // Lock buttons while saving reply to database
const reply = this.replyForm.get('reply').value; // Get the reply value to pass to service function
// Function to save the reply to the database
this.userService.postReply(id, this.commentid, reply).subscribe(data => {
this.getThisVideo();// Refresh page to reflect the new reply
const index = this.newReply.indexOf(id); // Get the index of the video id to remove from array
this.newReply.splice(index, 1); // Remove id from the array
this.enableReplyForm(); // Re-enable the form
this.replyForm.reset(); // Reset the reply form
this.processing = false; // Unlock buttons on reply form
console.log(reply);
console.log("reply success");
});
this.comments = [];
this.finalComments = [];
}



}
