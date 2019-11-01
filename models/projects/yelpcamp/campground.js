var mongoose = require("mongoose");

var campgroundSchema = new mongoose.Schema({
   name: String,
   price: String,
   image: String,
   description: String,
   location: String,
   lat: Number,
   lng: Number,
   createdAt: {type: Date, default: Date.now},
   cost: Number,
   author: {
       id: {
           type: mongoose.Schema.Types.ObjectId,
           ref: "YelpCamp_User"
       },
       username: String
   },
   comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "YelpCamp_Comment"
      }
   ]
});

module.exports = mongoose.model("YelpCamp_Campground", campgroundSchema);
