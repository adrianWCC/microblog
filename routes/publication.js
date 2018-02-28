var express = require('express');
var router = express.Router();
var multer = require('multer');//上传图片中间件
var fs = require('fs');
var Post = require('../models/post');
var upload = multer({
    dest: './public/images'
});//定义图片上传的临时目录

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('publication', { title: '发布' });
});

router.post('/post',  upload.array('imgList', 5),function(req,res,next){
    if(!req.session.user){
        console.log("请先登录");
        res.redirect('/login');
        return;
    }
    var username = req.session.user.name;
    //"imgList"为表单name为imgList的input;
    var imgList = [];
    for (var i = 0; i < req.files.length; i++) {
        // 图片会放在images目录并且没有后缀，需要自己转存，用到fs模块
        // 对临时文件转存，fs.rename(oldPath, newPath,callback);
        imgList.push(req.headers.origin+"/images/"+req.files[i].originalname);
        fs.rename(req.files[i].path, "./public/images/" + req.files[i].originalname, function(err) {
            if (err) {
                throw err;
            }
        });
    }
    //console.log(JSON.stringify(req.files)+JSON.stringify(req.body));
    var time = new Date();
    var title = req.body.title;
    var message = {
        title:title,
        imgList:imgList,
        loft:req.session.user.loft||"http://localhost:3000/images/logo.png"
    };
    console.log(message);
    var post = new Post(username,message,time);
    post.save(function(){
        res.redirect('/');
    })
});

module.exports = router;
