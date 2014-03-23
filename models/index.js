var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CommentSchema = new Schema({
	_uid: { type: Schema.Types.ObjectId, ref: 'User' }
  , Content: { type: String, trim: true,max:2000}
  , _pmid: { type: Schema.Types.ObjectId, ref: 'Pm' }
  , Created_at : { type : Date, default : Date.now }
  , Updated_at  : { type : Date, default : Date.now }
  , Enable     : { type : Boolean, default : true }
     
});
 
var PmSchema = new Schema ({
    Name : String
   ,Party :String
   ,Line :String
   ,About :String 
   ,Objectives : String
   ,ProfilePic :String
   ,Votes : { type : Number , default : 0 }
   ,Updated_at  : { type : Date, default : Date.now }
   ,Created_at  : { type : Date, default : Date.now }

 });


var UserSchema = new Schema({

     DisplayName: { type: String,trim: true}
  ,  Email: { type: String,trim: true}
  ,  Approved: {type: Boolean,default: true}
  ,  Banned: {type: Boolean,default: false}
  ,  ProfilePic: String
  ,  My_Pm  :{type: Schema.Types.ObjectId, ref: 'Pm'}
  ,  Updated_at  : { type : Date, default : Date.now }
  ,  Created_at: { type: Date,  default: Date.now }
});

exports.User = mongoose.model('User',UserSchema);
exports.Pm = mongoose.model('Pm',PmSchema);
exports.Comment = mongoose.model('Comment',CommentSchema);