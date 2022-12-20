const router = require('express').Router();
const {FoodController: Food} = require('../controllers/FoodController');
const user = require('../middleware/user');
const Auth = require('../middleware/Auth');



router.put('/editcomment/:id',Auth, Food.editcomment);
router.delete('/deletecomment/:id',Auth, Food.deletecomment);

// Food 
router.get('/getfoods', Food.getFoods);
router.get('/getsingletitlefoods/:id', Food.getSingleTitleFoods);
router.get('/getfood/:id', Food.getFood);
// Piza
router.get('/getallchildfood/:id', Food.getAllChildFood);
router.get('/getsinglechildfood/:id',user, Food.getSingleChildFood);
router.post('/createcommentchildfood/:id', Auth, Food.createCommentChildFood);
router.get('/getcommentchildfood/:id',user, Food.getCommentChildFood);
router.get('/getcommentsinglefood/:id', Food.getCommentSingleFood);
// Payment 
router.post('/confirmpayment', Auth, Food.confirmPayment);
router.get('/verifypayment', Food.verifyPayment);
// Geocode
router.post('/reverse', Food.reverse);
router.post('/geocode', Food.geocode);
// notification
router.get('/notification', Food.notification);
//imagechat
router.post('/imagechat', Food.imagechat);
// imageprofile
router.post('/sendprofile',Auth, Food.sendImageProfile);
router.get('/getprofile',user, Food.getImageProfile);

module.exports = router