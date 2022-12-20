const router = require('express').Router();
const Admin = require('../controllers/AdminController');
const user = require('../middleware/user');
const AuthAdmin = require('../middleware/AuthAdmin');


// User
router.post("/useradmin", AuthAdmin, Admin.setUserAdmin);
router.post("/deleteadmin", AuthAdmin, Admin.deleteAdmin);
router.get("/alluserAdmin",AuthAdmin, Admin.allUserAdmin);
router.post("/changeAdmin",AuthAdmin, Admin.changeAdmin);
// Food 
router.post('/createfood', AuthAdmin, Admin.createFood);
router.put('/editfood/:id', AuthAdmin, Admin.editFood);
router.delete('/deletefood/:id', AuthAdmin, Admin.deleteFood);
// Piza
router.post('/createchildfood/:id', AuthAdmin, Admin.createChildFood);
router.put('/editchildfood/:id', AuthAdmin, Admin.editChildFood);
router.delete('/deletechildfood/:id', AuthAdmin, Admin.deleteChildFood);
// notification
router.post('/createnotification', AuthAdmin, Admin.createNotification);
// available
router.post('/unavailable/:id', AuthAdmin, Admin.unAvailable);
router.get('/listavailable', Admin.listAvailable);
// getAllAddress
router.get('/getAllAddress', user, Admin.getAllAddress);
router.delete('/deleteaddress/:id', user, Admin.deleteAddress);
router.delete('/deleteAllAddress', AuthAdmin, Admin.deleteAllAddress);

router.get("/getproposal",AuthAdmin, Admin.getProposal);
router.delete("/deleteMultiProposal",AuthAdmin, Admin.deleteMultiProposal);

module.exports = router





