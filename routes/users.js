var express = require('express');
const{user, user_find,user_find_one,user_delete,user_update}  = require('../controller/usercontroller');
var router = express.Router();

var auth=require('../middleware/auth');
/* GET users listing. */
router.post('/add_user',user);
router.get('/select_single_user/:id',user_find_one);
router.post('/update_user/:id',user_update);
router.get('/delete_user/:id',user_delete);
router.get('/',user_find);


module.exports = router;
