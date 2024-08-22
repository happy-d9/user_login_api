var express = require('express');
var router = express.Router();

var login=require('../controller/indexcontroller');
var auth=require('../middleware/auth');
/* GET home page. */
router.post('/insert',login.insert);
router.get('/',auth.check_token,login.get_data);
router.post('/login',login.login);
router.get('/logout',login.logout);


module.exports = router;
