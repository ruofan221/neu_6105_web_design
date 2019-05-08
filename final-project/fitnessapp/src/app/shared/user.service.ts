import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { User } from './user.model';
import { Video } from './video.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User = {
    fullName: '',
    email: '',
    password: '',
    role:'',
    height:'',
    weight:'',
    imgurl:''
  };

  selectedVideo: Video = {
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

  noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };

  constructor(private http: HttpClient) { }

  //HttpMethods
/**
   * creat new user
   */
  postUser(user: User){
    return this.http.post(environment.apiBaseUrl+'/register',user,this.noAuthHeader);
  }
 /**
   * update user
   * @param {id} any { the userid object}
   * @param {user} User { the update content}
   */
  updateUser(id:any,user: User) {
    
    return this.http.put(environment.apiBaseUrl+'/'+ id ,user)
  }

  login(authCredentials) {
    return this.http.post(environment.apiBaseUrl + '/authenticate', authCredentials,this.noAuthHeader);
  }
  /**
   * get user profile
   */
  getUserList() {
    return this.http.get(environment.apiBaseUrl + '/userList');
  }

/**
   * get user profile
   */
  getUserProfile() {
    return this.http.get(environment.apiBaseUrl + '/userProfile');
  }
  /**
   * get coach profile
   */
  getCoachProfile() {
    return this.http.get(environment.apiBaseUrl + '/coachProfile');
  }


 

  /**
   * get all video
   */
  getAllVideos(){
  return this.http.get(environment.apiBaseUrl + '/video/videos');
  }

  // Function to get the video using the id
  getSingleVideo(id) {
    return this.http.get(environment.apiBaseUrl + '/video/' + id);
  }

  getSingleUser(id){
    return this.http.get(environment.apiBaseUrl + '/user/' + id);
  }
/**
   * post video function
   *
   * @param {video} video { the video object}
   */
  postVideo(video:Video){
    
    return this.http.post(environment.apiBaseUrl+'/coachUpload',video);
  }

  deleteVideo(id){
    return this.http.delete(environment.apiBaseUrl+'/video/'+id);
  }
 /**
   *  favorite function
   *
   * @param {id} videoid {Id of the video object}
   */
  favoriteVideo(videoid:any){
    const id ={id:videoid}
    return this.http.post(environment.apiBaseUrl+'/favoritevideo/'+videoid,id);
  }
  /**
   * cancel favorite function
   *
   * @param {id} videoid {Id of the video object}
   */
  cancelfavoriteVideo(videoid:any){
    const id ={videoid:videoid}
    return this.http.post(environment.apiBaseUrl+'/cancelfavorite/'+videoid,id);
  }

  /**
   * like function
   *
   * @param {id} videoid {Id of the video object}
   */
  likeVideo(videoid) {
    const id ={videoid:videoid}
    return this.http.put(environment.apiBaseUrl + '/video/likeVideo', id);
  }
/**
   * cancel like function
   *
   * @param {id} videoid {Id of the video object}
   */
  cancellikeVideo(videoid) {
    const id ={videoid:videoid}
    return this.http.put(environment.apiBaseUrl + '/video/cancellikeVideo', id);
  }
  /**
   * post comment function
   *
   * @param {id} VideoId {Id of the video object}
   * @param {comment} comment {content of comment callback function}
   */
  postComment(id, comment) {
    // Create blogData to pass to backend
    const videoData = {
      // ！！！别改id 和 comment的名字啊，后端要用到id和comment。
      id: id,
      comment: comment
    }
    return this.http.post(environment.apiBaseUrl + '/comment', videoData);
  }
  /**
   * post reply function
   *
   * @param {videoid} VideoId {Id of the video object}
   * @param {commenterid} commenterid {Id of the user object who posts comment}
   * @param {reply} reply {content of reply callback function}
   */
  postReply(videoid, commentid, reply ){
    // Create blogData to pass to backend
    const replyData = {
      videoid: videoid,
      commentid: commentid,
      reply: reply
    }
    return this.http.post(environment.apiBaseUrl + '/reply', replyData);
  }

  /**
   *  follow function
   *
   * @param {id} coachId {Id of the coach object}
   */
  follow(id){
    const data ={id:id}
    return this.http.put(environment.apiBaseUrl + '/follow/following', data);
  }
  /**
   * cancel following function
   *
   * @param {id} CoachId {Id of the coach object}
   */
  cancelFollowing(id){
    let data = {id: id}
    return this.http.put(environment.apiBaseUrl + '/follow/canclefollowing', data);
  }


  //Helper Methods

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  deleteToken() {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    var token = this.getToken();
    if (token) {
      var userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    }
    else
      return null;
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if (userPayload)
      return userPayload.exp > Date.now() / 1000;
    else
      return false;
  }
}
