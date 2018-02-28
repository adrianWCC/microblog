var express = require('express');
var crypto = require('crypto');
var router = express.Router();
var User = require('../models/user');
router.get('/',function (req,res,next) {
    res.render('login',{title:"注册/登录",error:req.flash("error")})
});
router.post('/reg',function(req,res,next){
    var md5 = crypto.createHash('md5');
    var password = md5.update(req.body.password).digest('base64');
    var newUser = new User({
        name:req.body.username,
        password:password
    });
    User.get(newUser.name,function (err,user) {
        if(err){
            console.log("出现错了");
            req.flash('error', err);
            return res.redirect('/login');
        }else if(user){
            if(user.password===newUser.password){
                req.flash('success', '登录成功');
                req.session.user = user;
                res.redirect('/users');
            }else{
                req.flash('error', '密码错误');
                res.redirect('/login');
            }
        }else{
            newUser.save(function(err){
                if(err){
                    req.flash('error', err);
                    return res.redirect('/login');
                }else{
                    req.session.user = newUser;
                    req.flash('success', '注册成功');
                    res.redirect('/');
                }
            })
        }
    })
});

module.exports = router;