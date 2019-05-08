import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { Video } from '../shared/video.model';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-user-nav',
  templateUrl: './user-nav.component.html',
  styleUrls: ['./user-nav.component.scss']
})
export class UserNavComponent implements OnInit {
  
  constructor(private router:Router,private userService: UserService) { }
  userDetails;
  videos;
  userid;
  commentlist;
  mycomments;
  coachreply;

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




  //logout
  onLogout(){
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }


    // //get all videos 
    // showAllVideos = () => {
    //   this.userService.getAllVideos().subscribe(videos => {
    //     this.videos = videos;
        
        
        
        
    //    // console.log("video10=  "+JSON.stringify(this.videos[0]))
      
       
    //   });
    // }

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
         // console.log(comments.comments);
            this.commentlist=comments.comments;
           // console.log(this.commentlist);
            for(let comments of this.commentlist){
              
              if(comments.commentor == this.userid){
                    this.mycomments = comments;
                   // console.log(this.mycomments);
                    
                   for(let reply of this.mycomments){
                     if(reply.reply != ""){
                       this.coachreply = reply;
                      // console.log( this.coachreply);
                     }
                   }
              }
            }
           
         }

          
        });
    });
  
}








}
