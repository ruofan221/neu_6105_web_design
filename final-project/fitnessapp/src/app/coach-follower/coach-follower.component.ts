import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { Video } from '../shared/video.model';


@Component({
  selector: 'app-coach-follower',
  templateUrl: './coach-follower.component.html',
  styleUrls: ['./coach-follower.component.scss']
})
export class CoachFollowerComponent implements OnInit {

  coachDetails;
  followers:any=[];
  users;




  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getCoachProfile().subscribe(
      res => {
        this.coachDetails = res['user'];
        // this.followers = this.coachDetails.follower;
      },
      err => { 
        console.log(err);
      }
    );

    this.getFollowerName();
  }

  getFollowerName(){
      this.userService.getUserList().subscribe(
        data =>{
          this.users=data;
          this.userService.getCoachProfile().subscribe(
          res =>{
            this.coachDetails = res['user'];
            for(let user of this.users){
              if(this.coachDetails.follower.indexOf(user._id)>-1){
                this.followers.push(user);
              }
            }
          }
          )
        }
      )
  }

}
