exports.pm = require('./pm');
exports.user = require('./user');
exports.Home = function(req, res){
  req.db.Pm.find({},function(err,pms) {
  	if(err) res.json(200,{msg:"no pm found"});
  	else
  	{
  	   req.db.User.find({},function   ( err,users) {
         if(err) res.json(200,{msg:"no pm found"});
         else
                res.render('index',{Pms:pms,Users:users});      
       });
  	
  	}
  });
};
exports.Page404 =function (req,res) {
	res.render('error/404');
};

 
