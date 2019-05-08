// built-in
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';

// components
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
//routes
import { appRoutes } from './routes';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserService } from './shared/user.service';
//other
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { UsermainpageComponent } from './usermainpage/usermainpage.component';
import { UserNavComponent } from './user-nav/user-nav.component';
import {CarouselModule} from "ngx-carousel-lib";
//import { NgZorroAntdModule } from 'ng-zorro-antd';
//coach
import { CoachNavComponent } from './coach-nav/coach-nav.component';
import { CoachHomeComponent } from './coach-home/coach-home.component';
import { CoachProfileComponent } from './coach-profile/coach-profile.component';
import { CoachFollowerComponent } from './coach-follower/coach-follower.component';
import { CoachUploadComponent } from './coach-upload/coach-upload.component';
import { UservideoComponent } from './uservideo/uservideo.component';
import { WorkoutvideosComponent } from './workoutvideos/workoutvideos.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { CoachVideoComponent } from './coach-video/coach-video.component';
import { VideoDetailComponent } from './video-detail/video-detail.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { UsereditprofileComponent } from './usereditprofile/usereditprofile.component';
import { UservideodetailsComponent } from './uservideodetails/uservideodetails.component';
import { AllVideosComponent } from './all-videos/all-videos.component';
import { UserfollowingcoachvideosComponent } from './userfollowingcoachvideos/userfollowingcoachvideos.component';
import { UsercommentsComponent } from './usercomments/usercomments.component';
import { CoachfollowervideosComponent } from './coachfollowervideos/coachfollowervideos.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SignUpComponent,
    UserProfileComponent,
    SignInComponent,
    UsermainpageComponent,
    UserNavComponent,
    CoachNavComponent,
    CoachHomeComponent,
    CoachProfileComponent,
    CoachFollowerComponent,
    CoachUploadComponent,
    UservideoComponent,
    WorkoutvideosComponent,
    UserdashboardComponent,
    EditProfileComponent,
    CoachVideoComponent,
    VideoDetailComponent,
    UsereditprofileComponent,
    UservideodetailsComponent,
    AllVideosComponent,
    UserfollowingcoachvideosComponent,
    UsercommentsComponent,
    CoachfollowervideosComponent,
  ],

  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    CarouselModule, 
   // NgZorroAntdModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },AuthGuard,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
