import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CoachProfileComponent } from './coach-profile/coach-profile.component';
import { AuthGuard } from './auth/auth.guard';
import { UsermainpageComponent } from './usermainpage/usermainpage.component';
import { CoachHomeComponent } from './coach-home/coach-home.component';
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
export const appRoutes: Routes = [

    // for register and login
    {
        path: 'signup', component: UserComponent,
        children: [{ path: '', component: SignUpComponent }]
    },
    {
        path: 'login', component: UserComponent,
        children: [{ path: '', component: SignInComponent }]
    },
   
    // for user
    {
        path: 'userprofile', component: UserProfileComponent,canActivate:[AuthGuard]
    },
    {
        path: 'userhome', component: UsermainpageComponent,canActivate:[AuthGuard],
    },
    {
        path: 'uservideo', component: UservideoComponent,canActivate:[AuthGuard],
    },
    {
        path: 'workoutvideos', component: WorkoutvideosComponent,canActivate:[AuthGuard],
        children: [{ path: 'uservideo', component: UservideoComponent }]
    },
    {
        path: 'userdashboard', component: UserdashboardComponent,canActivate:[AuthGuard],
    },
    {
        path: 'useredit', component:  UsereditprofileComponent,canActivate:[AuthGuard],
    },
    {
        path: 'uservideodetails/:id', component: UservideodetailsComponent,canActivate:[AuthGuard],
    },
    {
        path: 'userfollowing/:id', component: UserfollowingcoachvideosComponent,canActivate:[AuthGuard],
    },
    {
        path: 'usercomments', component:  UsercommentsComponent,canActivate:[AuthGuard],
    },

   

    {
        path: '', redirectTo: 'login', pathMatch: 'full'
    },

    // for coach
    {
        path: 'coachHome', component: CoachHomeComponent,canActivate:[AuthGuard]
    },
    {
        path: 'coachProfile', component: CoachProfileComponent,canActivate:[AuthGuard]
    },
    {
        path: 'editProfile', component:  EditProfileComponent,canActivate:[AuthGuard]
    },

    {
        path: 'coachFollower', component: CoachFollowerComponent,canActivate:[AuthGuard]
    },
    {
        path: 'coachUpload', component: CoachUploadComponent,canActivate:[AuthGuard]
    },
    {
        path: 'coachVideo', component: CoachVideoComponent,canActivate:[AuthGuard]
    },
    {
        path: 'coachVideoDetail/:id', component: VideoDetailComponent,canActivate:[AuthGuard]
    },
    {
        path: 'allVideos', component: AllVideosComponent,canActivate:[AuthGuard],
        // children: [{ path: 'coachVideo', component: CoachVideoComponent }]
    },
    {
        path: 'coachFollower/:id', component: CoachfollowervideosComponent,canActivate:[AuthGuard],
    },


    
    

];