import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-coach-nav',
  templateUrl: './coach-nav.component.html',
  styleUrls: ['./coach-nav.component.scss']
})
export class CoachNavComponent implements OnInit {

  constructor(private router:Router,private userService: UserService,) {

   }

  ngOnInit() {
  }

  //logout
  onLogout(){
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }

}
