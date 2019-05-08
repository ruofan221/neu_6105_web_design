import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-usercomments',
  templateUrl: './usercomments.component.html',
  styleUrls: ['./usercomments.component.scss']
})
export class UsercommentsComponent implements OnInit {

  constructor(private router:Router,private userService: UserService) { }
  userDetails;
  videos;
  userid;
  commentlist:any=[];
  mycomments : any=[];
  coachreply;
  videoname:any=[];
  videouser:any=[];
  ngOnInit() {

    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
        // console.log(this.userDetails);
      },
      err => { 
        console.log(err);
      }
    );
      this.getAllCommentsPost();
  }

//get the comment I post
getAllCommentsPost(){
 
  this.userService.getAllVideos().subscribe(videos => {
    this.videos = videos;
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
        this.userid = this.userDetails._id;
       // console.log(this.videos);

       for(let comments of this.videos){
        //console.log(comments);
          this.commentlist=comments.comments;
         // this.videouser.push(comments.user);
          //console.log(this.videouser);
          for(let commentss of this.commentlist){
            
            if(commentss.commentor == this.userid){
                  this.mycomments.push(commentss);
                if(this.videos.includes(commentss)>-1)
                this.videoname.push(comments);
               // console.log(this.videoname);
            }


           
          }
         
       }

        
      });
  });

}



}
