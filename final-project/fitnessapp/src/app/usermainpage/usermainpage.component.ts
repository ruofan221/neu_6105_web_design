import {AfterViewInit, Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import Swiper from 'swiper';






@Component({
  selector: 'app-usermainpage',
  templateUrl: './usermainpage.component.html',
  styleUrls: ['./usermainpage.component.scss']
})
export class UsermainpageComponent implements OnInit {
  testSwiper: Swiper;
  slides = [
    './assets/images/homepage4.jpg',
    './assets/images/homepage1.jpg',
    './assets/images/homepage2.jpg',
    './assets/images/homepage3.jpg'
  ];

  player: any;
 


  constructor(private userService: UserService, private router: Router) { }
  
  



  ngOnInit() {
  //this.videoPlay();
  }


//   videoPlay(){
//     var videoObject = {
//         container: '#video',//“#”代表容器的ID，“.”或“”代表容器的class
//         variable: 'player',//该属性必需设置，值等于下面的new chplayer()的对象
//         autoplay: false,//自动播放
//         live: true,
//         poster: './assets/images/i25mg.jpg',//视频封面
//         video:'https://media.w3.org/2010/05/sintel/trailer.mp4'//视频地址
//     };
//     this.player = new ckplayer(videoObject);
// }

  onLogout(){
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }


  
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


 




}
