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
                if(err) console.log(err);
               else res.json(200,{Votes:doc.Votes}) 
      });

  });

};

exports.VoteUp = function(req,res,next) {
    /*req.db.User.findByIdAndUpdate(req.params.id,{ 
                                       displayName: b.name
                                      ,  regno : b.regno                    
                                      ,  email: b.email                                      
                                      ,  image: b.image
                                      ,  updated: new Date()
                                       
},{new : true},   function   (err,doc) {
       if(err) res.send("error updating user"+err);
       else res.send("user Updated" + doc);
    });
 };*/
 

  req.db.User.findByIdAndUpdate(req.session.User._id,
                           { My_Pm : req.params.id
                            ,Updated_at: new Date()
                           }
                          ,{ new: true },function (err,doc) {
    // body...
    if(err) console.log(err);
    else 
      {  
        console.log(doc+ " " + req.params.id +" "+req.session.User._id  );
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

 