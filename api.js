var mongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/runoob";
var api = {
    infoList:function (req,res) {
        res.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
        mongoClient.connect(url, function (err, db) {
            if (err) throw err;
            console.log('数据库已创建');
            var dbo = db.db("runoob");
            dbo.collection("site"). find({}).toArray(function(err, result) { // 返回集合中所有数据
                if (err) throw err;
                //console.log(result);
                res.end( JSON.stringify(result) );
                db.close();
            });
        });
    }
};

module.exports = api;
