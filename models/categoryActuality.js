const mongoose = require('mongoose');
 
var categorySchema = new mongoose.Schema({
    title :{ 
        type:String,
        required:true
    } ,
    description:{ 
        type:String,
        required:true
    } ,
    actualities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Actuality',
    }],
})
module.exports = mongoose.model('Category', categorySchema);