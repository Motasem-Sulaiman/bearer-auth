const base64 = require('base-64');
const {authBearer}=require('../models/users-model');




function bearer (req,res,next){

if(req.headers.authorization){
const bearerHeadersToken=req.headers.authorization.split(" ")[1]
authBearer(bearerHeadersToken).then((data)=>{

req.user=data;

next()
}).catch(()=>{


    next('invalid tokenn')
})


}



}

module.exports=bearer;