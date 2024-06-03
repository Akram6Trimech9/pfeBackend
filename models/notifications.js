const mongoose = require('mongoose');
 
var notifSchema = new mongoose.Schema({
    message :{ 
        type:String,
        required:true
    } ,
    user:      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Rdv',
      }, 
})
module.exports = mongoose.model('Notifications', notifSchema);