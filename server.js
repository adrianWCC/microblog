var mongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/runoob";

//createCollection() 创建集合
/*
var dbase = db.db("runoob");
dbase.createCollection('site', function (err, res) {
    if (err) throw err;
    console.log("创建集合!");
    db.close();
});
*/


//insert()
mongoClient.connect(url,function(err,db){
    if(err) throw err;
    var dbo = db.db("runoob");
    var myobj = {
        user:"Nico",
        loft:"http://img3.duitang.com/uploads/item/201602/25/20160225215449_wiMQN.jpeg",
        title:"今天吃鸡了!!",
        imgList:[
            "http://img3.duitang.com/uploads/item/201602/25/20160225215449_wiMQN.jpeg",
            "http://img3.duitang.com/uploads/item/201602/25/20160225215449_wiMQN.jpeg",
            "http://img3.duitang.com/uploads/item/201602/25/20160225215449_wiMQN.jpeg",
            "http://img3.duitang.com/uploads/item/201602/25/20160225215449_wiMQN.jpeg"
        ],
        date:new Date()
    };
    dbo.collection("todo").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("文档插入成功");
        db.close();
    });
});
 module.exports = mongoClient;
//insertMany()
/*
var myobj =  [
    { name: '菜鸟工具', url: 'https://c.runoob.com', type: 'cn'},
    { name: 'Google', url: 'https://www.google.com', type: 'en'},
    { name: 'Facebook', url: 'https://www.google.com', type: 'en'}
];
dbo.collection("site").insertMany(myobj, function(err, res) {
    if (err) throw err;
    console.log("插入的文档数量为: " + res.insertedCount);
    db.close();
});*/

//find():
/*var dbo = db.db("runoob");
dbo.collection("site"). find({}).toArray(function(err, result) { // 返回集合中所有数据
    if (err) throw err;
    console.log(result);
    db.close();
});*/

//updata(): updateOne && updateMany()
/*
var whereStr = {"name":'菜鸟教程'};  // 查询条件
var updateStr = {$set: { "url" : "https://www.runoob.com" }};
dbo.collection("site").updateOne(whereStr, updateStr, function(err, res) {
    if (err) throw err;
    console.log("文档更新成功");
    db.close();
});*/

//delete()  deleteOne&&deleteMany
/*var whereStr = {"name":'菜鸟教程'};  // 查询条件
dbo.collection("site").deleteOne(whereStr, function(err, obj) {
    if (err) throw err;
    console.log("文档删除成功");
    db.close();
});*/

// drop() 删除集合

/*dbo.collection("test").drop(function(err, delOK) {  // 执行成功 delOK 返回 true，否则返回 false
    if (err) throw err;
    if (delOK) console.log("集合已删除");
    db.close();
});*/
