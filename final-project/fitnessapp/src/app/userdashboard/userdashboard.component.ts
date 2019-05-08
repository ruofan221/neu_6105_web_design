import { Component, OnInit } from '@angular/core';
import Swiper from 'swiper';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { User } from '../shared/user.model';
import { stringify } from 'querystring';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.scss']
})




export class UserdashboardComponent implements OnInit {

  user:User;
  userDetails;
  profile;
  container;
  fullname: String;
  testSwiper: Swiper;
  users :any =[];
  coachname :any=[];


  videos;
  userid;
  commentlist;
  
  slides = [
    './assets/images/smallslides1.jpg',
    './assets/images/smallslides2.jpg',
    './assets/images/smallslides3.jpg',
    './assets/images/smallslides4.jpg',

  ];

  heigth;
  h;
  weigth;
  w;
  heigthPattern = /^[0-9]+([.]{1}[0-9]+){0,1}$/;
  weigthPattern = /^[0-9]+([.]{1}[0-9]+){0,1}$/;

  age;
  agePattern = /^-?\d+$/;
  gender="";
  BMR;
  
  isCorrect:boolean;

  constructor(private userService: UserService, private router: Router) { }

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

    this.getFollowingCoachName();
    this.getAllCommentsPost();
   

  }


  


  getFollowingCoachName(){
      //get all user
      this.userService.getUserList().subscribe(data => {
        this.users = data; 
        this.userService.getUserProfile().subscribe(
          res => {
            this.userDetails = res['user'];
          for(let user of this.users){
            if(this.userDetails.following.indexOf(user._id)>-1){
                this.coachname.push(user);
            }
          }
          
          
          
          });
       
      
      });
  }

  // check height/weight/age pattern
  checkpattern(){
      let heightnum = JSON.stringify(this.userDetails.height);
     this.h =  heightnum.replace("\"","").replace("\"","");

     let weightnum = JSON.stringify(this.userDetails.weight);
     this.w =  weightnum.replace("\"","").replace("\"","");


    let checkh = this.heigthPattern.test(this.h);
    let checkw = this.weigthPattern.test(this.w);
    let checkage = this.agePattern.test(this.age);
    
    

    if(checkh&&checkw&&checkage&&this.gender!=""){
      this.calculateBMR();

     
      this.isCorrect = false;
    }else{
      this.isCorrect = true;
     // window.alert("Please enter the correct format!!!");
    }






  }

  //calculate BMR
  //BMR = 655 + (9.6 x 体重kg) + (1.8 x 身高cm) - (4.7 x 年龄)
  //BMR = 66 + (13.7 x 体重kg) + (5 x 身高cm) - (6.8 x 年龄)
   calculateBMR(){


    
    let femaleBMR = 655 + (9.6*this.w) + (1.8*this.h) - (4.7*this.age);
    let maleBMR = 66 + (13.7*this.w) + (5*this.h) - (6.8*this.age);
    if(this.gender=="female"){
      this.BMR = femaleBMR;
     // console.log("female:" + this.BMR)
    }else{
      this.BMR = maleBMR;
     // console.log("male:" + this.BMR)

    }
   }

   //swiper
   ngAfterViewInit() {
    this.testSwiper = new Swiper('.swiper-container', {
      direction: 'horizontal',
      loop: true,
      // 如果需要分页器
      pagination: {
        el: '.swiper-pagination',
      },
      // 如果需要前进后退按钮
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      // 如果需要滚动条
      scrollbar: {
        el: '.swiper-scrollbar',
      },
    });
  }

//get the comment I post
getAllCommentsPost(){
 
  this.userService.getAllVideos().subscribe(videos => {
    this.videos = videos;
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
        this.userid = this.userDetails._id;
        for(let comment of this.videos){
         for(let commentor of comment){
                if(commentor == this.userid ){
                      this.commentlist.push(comment);
                      console.log(this.commentlist);
                }
         }
        }

        
      });
  });

}








}
