const express = require('express');
const router = express.Router();

const ctrlUser = require('../controllers/user_controller');
const jwtHelper = require('../config/jwtHelper');
const ctrVideo = require('../controllers/video_controller');


/****************************** Video Router  **********************************/
// get all of videos
router.get('/video/videos',jwtHelper.verifyJwtToken,ctrVideo.getVideos);
// get specific video
router.get('/video/:videoId',jwtHelper.verifyJwtToken,ctrVideo.getVideo);
//delete video
router.delete('/video/:videoId',jwtHelper.verifyJwtToken,ctrVideo.deleteVideo);
//update video
router.patch('/video/:videoId',jwtHelper.verifyJwtToken,ctrVideo.updateVideo);
//favorite /收藏 action
router.post('/favoritevideo/:videoId',jwtHelper.verifyJwtToken,ctrVideo.favoriteVideo);
//cancel favorite
router.post('/cancelfavorite/:videoId',jwtHelper.verifyJwtToken,ctrVideo.cancelFavorite);
// like video
router.put('/video/likeVideo',jwtHelper.verifyJwtToken,ctrVideo.likeVideo);
// cancel like video
router.put('/video/cancellikeVideo',jwtHelper.verifyJwtToken,ctrVideo.cancellikeVideo);
// comment video
router.post('/comment',jwtHelper.verifyJwtToken,ctrVideo.postComment);
// reply comment of own video
router.post('/reply',jwtHelper.verifyJwtToken,ctrVideo.postReply);
// follow
router.put('/follow/following',jwtHelper.verifyJwtToken,ctrlUser.Follow);
// cancel following
router.put('/follow/canclefollowing',jwtHelper.verifyJwtToken,ctrlUser.cancelFollowing);

/****************************** User Router  **********************************/
// user register
router.post('/register', ctrlUser.register);
// user authenticate
router.post('/authenticate', ctrlUser.authenticate);
// get all user
router.get('/userList', ctrlUser.userList);
// get userProfile to verify
router.get('/userProfile',jwtHelper.verifyJwtToken, ctrlUser.userProfile);
// get coachProfile
router.get('/coachProfile',jwtHelper.verifyJwtToken, ctrlUser.userProfile);
// get a specific userprofile
router.get('/user/:userId',jwtHelper.verifyJwtToken, ctrlUser.getUser)
// update a specific user info
router.put('/:userId',jwtHelper.verifyJwtToken,ctrlUser.updateUser);
// create a video
router.post('/coachUpload',jwtHelper.verifyJwtToken,ctrVideo.postVideo)



module.exports = router;