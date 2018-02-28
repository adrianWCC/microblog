var mongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

function User(user) {
    this.name = user.name;
    this.password = user.password;
    this.introduction = user.introduction;
    this.loft = user.loft;
}

module.exports = User;

User.prototype.save = function save(callback) {
    var user = {
        name:this.name,
        password:this.password,
        introduction:this.introduction || "",
        loft:this.loft || ""
    };
    mongoClient.connect(url,function (err,db) {
        if(err) return callback(err);
        var dbase = db.db("runoob");
        dbase.collection("users",function(err,collection){
            if(err){
                db.close();
                return callback(err);
            }else{
                collection.findOne({name:user.name},function(err,doc){
                    if(doc){
                        collection.update({name:user.name},{$set:{introduction:user.introduction,loft:user.loft}},true,function(err){
                            if(err){
                                console.log(err);
                            }
                            db.close();
                            callback(err,user);
                        });
                    }else{
                        collection.ensureIndex('name',{unique:true});
                        collection.insertOne(user,{safe:true},function(err,user){
                            db.close();
                            callback(err,user);
                        })
                    }
                });
            }
        })
    })
};

User.get = function get(username,callback) {
    mongoClient.connect(url,function(err,db){
        if(err) return callback(err);
        var dbase = db.db("runoob");
        dbase.collection("users",function(err,collection){
            if(err){
                db.close();
                return callback(err);
            }
            collection.findOne({name:username},function(err,doc){
                db.close();
                if(doc){
                    var user = new User(doc);
                    callback(err,user);
                }else{
                    callback(err,null);
                }
            })
        })
    })
};