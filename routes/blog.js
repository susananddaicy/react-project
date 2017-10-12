

//var articleSchema = require('../model/articleDB.js');  
//var CommentSchema = require('../model/commentDB.js');
//var mongoose = require('mongoose');

//var db2 = mongoose.createConnection('mongodb://127.0.0.1:27017/comment');
//var comment = db2.model('comment', CommentSchema);
//var db1 = mongoose.createConnection('mongodb://127.0.0.1:27017/article'); 
//var article = db1.model('article', articleSchema);
//db1.connection.on('connected', function () {
//   console.log('Mongoose1 connection success');
//});
//db1.connection.on('error', function (err) {
//   console.log('connection1 error');
//});
exports.list = function(req, res){  
  const body = {
    name: '1',
    address: '2'
  };
  res.json(body);
};

// exports.list = function(req, res){  
//   article.find(function (err, article) {
//       console.log(article);
//       res.json(article);  
//   });
// };  