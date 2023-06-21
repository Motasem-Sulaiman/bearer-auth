const express = require('express');
const { Users } = require('./models/index');
const bcrypt = require('bcrypt');
const basic = require('./middleware/basic');
const bearer = require('./middleware/bearer');

const router=express.Router()

router.post('/signup',async(req,res,next)=>{

let username=req.body.username
let hashedPassword=await bcrypt.hash(req.body.password,5)
const record=await Users.create({


    username:username,
    password:hashedPassword
})
res.status(201).json(record)
})
router.get('/secretstuff',bearer,(req,res)=>{
res.json({

    'message':'you can access this route',
    'user':req.user
})


})

router.post('/signin',basic,(req,res)=>{

    res.status(200).json(req.user);


})

module.exports=router