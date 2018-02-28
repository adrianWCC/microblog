var mongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

function Post(username,post,time){
    this.user = username;
    this.post = post;
    if(time){
        this.time = time;
    }else{
        this.time = new Date();
    }
}

module.exports = Post;

Post.prototype.save = function save(callback){
    var post = {
        user:this.user,
        title:this.post.title,
        imgList:this.post.imgList,
        loft:this.post.loft,
        date:this.time
    };
    mongoClient.connect(url,function (err,db) {
        if(err) return callback(err);
        var dbase = db.db("runoob");
        dbase.collection("infolists",function(err,collection){
            if(err){
                db.close();
                return callback(err);
            }else{
                collection.ensureIndex('user');
                collection.insertOne(post,{safe:true},function(err,post){
                    db.close();
                    callback(err,post);
                })
            }
        })
    })
};
Post.get = function get(username,callback) {
    mongoClient.connect(url,function (err,db) {
        if(err) return callback(err);
        var dbase = db.db("runoob");
        dbase.collection("infolists",function(err,collection){
            if(err){
                db.close();
                return callback(err);
            }else{
                var query = {};
                if(username) query.user = username;
                collection.find(query).sort({date:-1}).toArray(function (err,docs) {
                    db.close();
                    var posts = [];
                    callback(null, docs);
                })
            }
        })
    })
};