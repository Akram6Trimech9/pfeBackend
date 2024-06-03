const mongoose = require('mongoose');
 
var ActualityShema = new mongoose.Schema({
    title :{ 
        type:String,
        required:true
    } , 
    subtitle:{ 
        type:String,
        required:true
    } ,
    description:{ 
        type:String,
        required:true
    } ,
    file:{
   type:String , 
   required:true
    },
    category: 
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Category',
        },
      
})
module.exports = mongoose.model('Actuality', ActualityShema);