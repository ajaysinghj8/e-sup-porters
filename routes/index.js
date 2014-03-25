exports.pm = require('./pm');
exports.user = require('./user');
exports.Home = function(req, res){
  req.db.Pm.find({},function(err,pms) {
  	if(err) res.json(200,{msg:"no pm found"});
  	else
  	{
  	   req.db.User.find({},null,{ sort:{Updated_at : -1},limit: 80},function   ( err,users) {
         if(err) res.json(200,{msg:"no pm found"});
         else
                res.render('index',{Pms:pms,Users:users,Usession:req.session.User});      
       });
  	
  	}
  });
};
exports.Page404 =function (req,res) {
	res.render('error/404');
};

 
