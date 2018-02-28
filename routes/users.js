var express = require('express');
var router = express.Router();
var multer = require('multer');//上传图片中间件
var fs = require('fs');
var User = require('../models/user');
var uploadImg = multer({
    dest: './public/images'
});//定义图片上传的临时目录

/* GET users listing. */
router.get('/', function(req, res, next) {
  var user = null;
  if(req.session.user){
    User.get(req.session.user.name,function(err,dataUser){
        user = dataUser;
    })
  }
  res.render('users',{title:'个人中心',user:req.session.user});
});
router.post('/introduce',function (req,res,next) {
   var txt = req.body.introduction;
   var user = req.session.user;
   user.introduction = txt;
   var newUser = new User(user);
   newUser.save(function(err){
       if(err){
           req.flash('error', err);
       }else{
           req.session.user = user;
           req.flash('success', '更新成功');
       }
       res.send({
           status: 200,
           msg: "更新成功"
       });
   })
});

router.post('/imgUpLoad',uploadImg.single('image'),function(req,res,next){
    console.log(req.file);
    fs.rename(req.file.path, "./public/images/" + req.file.originalname, function(err) {
        if (err) {
            throw err;
        }
        console.log('上传成功!');
    });
    var src = req.headers.origin+"/images/"+req.file.originalname;
    var user = req.session.user;
    user.loft = src;
    console.log(user);
    var newUser = new User(user);
    newUser.save(function(err){

    });
    res.send({
        status: 200,
        msg: "上传成功",
        data:{url:src}
    });
});

module.exports = router;
