import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from "@angular/router";
import {User} from "../shared/user.model";

@Component({
  selector: 'app-coach-profile',
  templateUrl: './coach-profile.component.html',
  styleUrls: ['./coach-profile.component.scss']
})
export class CoachProfileComponent implements OnInit {

  coach:User;
  coachDetails:User;
  profile;
  container;
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.userService.getCoachProfile().subscribe(
      res  =>{
        this.coachDetails=res['user'];
      },
      err =>{
        console.log(err);
      }
    );
    // console.log(this.coachDetails);
  };

 
  edit(){
    this.router.navigate(['/editProfile']);
  }

}
