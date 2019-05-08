const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const People = require('../models/people');
const contactController = require('../controllers/contact-controller')

router.get('/',contactController.gets)
router.post('/',contactController.post);
router.get('/:Id',contactController.get);


// // retrieving data
// router.get('/',(req,res, next) =>{
//     People.find(function(err, address){
//         res.status(200).json(address);
//     })
// }) ;


// //add address
// router.post('/',(req,res, next) =>{
//     // logic to add contact
//     let newAddress = new People({
//         _id: new mongoose.Types.ObjectId(),
//         name: req.body.name,
//         address: req.body.address,
//         phone: req.body.phone,
//         email: req.body.email,
//         city:  req.body.city,
//     });
//      newAddress.save((err, address) => {
//          if(err){
//              res.json({
//                  message: 'fail to add contact'
//              });
//          }else {
//              res.json({message: 'Contact added successfully'})
//          }
//      });
// }) ;

// router.get('/:Id',(req,res, next) =>{
//     var id = req.params.Id;
//     People.findById(id)
//     .exec()
//     .then(doc => {
//         console.log("From database",doc);
//         if(doc) {
//             res.status(200).json({
//                 people: doc,
//                 request: {
//                     type:'GET',
//                     description: 'GET_ALL_PEOPLE',
//                     url:'http://localhost:3000/people'
//                 }
//             });
//         } else {
//             res.status(404).json({message: 'No valid people'});
//         }
        
//     })
//     .catch(err => {
//         console.log(err)
//         res.status(500).json({error: err});
//     });

// });

// router.patch('/:Id',(req,res, next) =>{
//     let id = req.params.Id;
//     let updateOps = {};
//     for(let ops of req.body){
//         updateOps[ops.propName] = ops.value;
//     }
//     People.update({_id: id}, {$set:updateOps})
//     .exec()
//     .then(result => {
        
//         res.status(200).json({
//             message: 'People Updated',
//             request: {
//                 type:"GET",
//                 url:'http://localhost:3000/people' + id
//             }
//         });
//     })
//     .catch(err => {
//             console.log(err)
//             res.status(500).json({error: err});
//         }
//     );
// });

// //delete address
// router.delete('/:Id',(req,res, next) =>{
//     let id = req.params.Id;
//     People.remove({_id: id},function(err, result){
//         if(err){
//             res.json({
//                 message: err
//             })
//         }else{
//             res.status(200).json(result);
//         };
//     });
// });

module.exports = router;
