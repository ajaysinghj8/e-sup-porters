exports.New = function(req,res,next) {
  res.render('Admin/newpm');
};

exports.Add = function(req,res,next) {
  var b = req.body;
 	var newPm = new req.db.Pm({
  	   Name : b.name 
      ,Line : b.line
      ,Objectives: b.objectives
      ,ProfilePic : b.profile_pic
   });
  newPm.save(function(err,doc) {
    if (err) next(err);
    res.json("Pm Created Successfully. "+ doc );
  });

};

exports.countVotes = function  (req,res,next) {
   req.db.User.count({My_Pm:req.params.id},function  (err,count) {
       req.db.Pm.findByIdAndUpdate(req.params.id
                                  ,{ Votes : count}
                                  ,{ new: true }
                                  ,function (err,doc) {
    // body...
                if(err) {console.log(err);res.json({err:"Sorry! But Something weird had happened."});} 
               else res.json({msg:"Thanks a million for your treasured votes and support."}); 
      });

  });

};

exports.VoteUp = function(req,res,next) {
  req.db.User.findByIdAndUpdate(req.session.User._id,
                           { My_Pm : req.params.id
                            ,Updated_at: new Date()
                           }
                          ,{ new: true },function (err,doc) {
    // body...
    if(err) {console.log(err);res.json({err:"Sorry! But Something weird had happened."});}
    else 
      {  
        console.log('Voted by :' + doc.DisplayName+' -to-'+req.params.id );
        next();
      }
  });		
};
 
exports.get_comment = function   (req,res) {
   res.send("to do get comments");
};
exports.post_comment = function   (req,res) {
   res.send("to do post comment");
};

 