import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from "@angular/router";
import Swiper from 'swiper';

@Component({
  selector: 'app-coach-home',
  templateUrl: './coach-home.component.html',
  styleUrls: ['./coach-home.component.scss']
})
export class CoachHomeComponent implements OnInit {

  testSwiper: Swiper;
  slides = [
    './assets/images/main.jpg',
    './assets/images/i21mg.jpg',
    './assets/images/tech.jpg'
  ];

  ngOnInit(){
    
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
