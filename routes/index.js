exports.pm = require('./pm');
exports.user = require('./user');
exports.Home = function(req, res){
  req.db.Pm.find({},function(err,docs) {
  	if(err) res.json(200,{msg:"no pm found"});
  	else
  	{
  	 /* docs.forEach(function(doc)
  		{
           req.db.User.count(function (err,count) {
             console.log('VoteCount for : ' + doc._id + " no:"+doc.Votes);
           });
           
  		});
      */
  		res.render('index',{Pms:docs});
  	}
  });
};
exports.Page404 =function (req,res) {
	res.render('error/404');
};

 
