 
exports.list = function(req, res){
  req.db.User.find({},null,{ sort: { Updated_at : -1 }},
                              function   ( err,docs) {
                            if (err)
                                res.json(200,{msg :"no user found"});
                              else
                               res.json(200,{users:docs});
  });
};

exports.checkUser = function(req, res, next) {
  if (req.session && req.session.auth && req.session.UserId && req.session.User.Approved) {
    console.info('Access USER: ' + req.session.User.DisplayName+ "  " +req.session.User._id);
    return next();
  } else {
    res.json(200, {notice: 'Please Login first. Login Button is reside in upper right corner'} );
  }
};

exports.register = function (req,res) {
  var nUser = req.body;
  req.db.User.findOneAndUpdate({Email :nUser.email}
                                  ,{ DisplayName: nUser.name
                                    ,Email: nUser.email
                                    ,ProfilePic: nUser.picture
                                    ,Updated_at : new Date()
                                    ,$inc:{ Visits :1}
                                    }
                                  ,{ new: true,upsert: true  }
                                  ,function (err,user) {
    
                if(err) {console.log(err);res.json({err:"Sorry! But Something weird had happened."});} 
               else if(user)
                        {        req.session.auth = true;
                                 req.session.UserId = user._id.toHexString();
                                 req.session.User = user;
                                     console.info('Login USER: ' + req.session.User.DisplayName);
                                     res.json(200, { msg: user });    
                               
                        } 
              else res.json({err:"Sorry! But Something weird had happened."});
      });

};
 
exports.logout = function(req, res) {
  console.info('Logout USER: ' + req.session.UserId);
  req.session.destroy(function(error) {
    if (error) {res.json(200, { err: "Something wierd had happened.!" });}
    else res.json(200, { msg: "Logged out Successfully.</p>" });
  });
};
 
 