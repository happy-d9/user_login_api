var user=require('../model/indexmodel');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const storage = require('node-persist');
storage.init( /* options ... */ );

exports.insert=async (req,res)=>
{
   try {
    var b_pass = await bcrypt.hash(req.body.password,10);

    req.body.password = b_pass
    var data=await user.create(req.body);

    res.status(200).json({
        data
    })
   } catch (error) {
    res.status(404).json({
        status: error
    })
   }
}
exports.get_data = async (req,res) => {

  try {
    var data = await user.find();

    res.status(200).json({
        data
    })
  } catch (error) {
    res.status(404).json({
        status: error
    })
  }
}
exports.login = async (req,res) => {

   try {
    var data = await user.find({"email":req.body.email});

    var user_id = await storage.getItem('id');

    var d = new Date();
        var h =  d.getHours(); // => 9
        var m = d.getMinutes(); // =>  30
        var s =  d.getSeconds(); // => 51
    var login_time   = h+':'+m+':'+s;
    

    if(user_id==undefined)
    {
        if(data.length==1)  
        {
            bcrypt.compare(req.body.password,data[0].password,async function(err,result){
                if(result==true)
                {
                    await storage.setItem('user_id',data[0].id);
                    await storage.setItem('login_time',login_time);

                    res.status(200).json({
                        status:"login success",
                        data
                    })
                }
                else
                {
                    res.status(200).json({
                        status:"login failure"
                    })
                }
            })
        }
        else
        {
            res.status(200).json({
                status:"login email and password failure"
            })
        }
    }
    else
    {
        res.status(200).json({
            status:"another user is alredy login"
        })
    }

   } catch (error) {
    res.status(404).json({
        status: error
    })
   }
}


exports.logout = async (req,res) => {



    var login_time = await storage.getItem('login_time');
   
    var time_start = new Date();
    var time_end = new Date();

    var d = new Date();
    var h =  d.getHours(); // => 9
    var m = d.getMinutes(); // =>  30
    var s =  d.getSeconds(); // => 51

        var logout_time   = h+':'+m+':'+s;

        console.log(logout_time);
console.log(login_time);

var value_start =login_time.split(':');
var value_end = logout_time.split(':');

var st = time_start.setHours(value_start[0], value_start[1], value_start[2], 0)
var et =time_end.setHours(value_end[0], value_end[1], value_end[2], 0)

var Login_duration = ( (et - st) / 60000 );
Login_duration = parseFloat(Login_duration).toFixed(2);

await storage.clear();

res.status(200).json({
    status:"Logout Success",
    Login_duration:Login_duration
})

}