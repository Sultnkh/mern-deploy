const mongoose=require('mongoose');

const aSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,'A Name must be provided'],
    },
    imgg:{
        type:String,
        required:[true,'An Image url must be provided'],
    },
    tres:{
        type:Number,
        required:[true,'A Number of tresaures must be provided'],
    },
    catchf:{
        type:String,
        required:[true,'A Catch phrase must be provided'],
    },
    pos:{
        type:String,
        required:[true,'A Crew position must be provided'],
    },
    peg:{
        type:Boolean,
    },
    eye:{
        type:Boolean,
    },
    hook:{
        type:Boolean,
    },
},{timestamps:true});

module.exports.a=mongoose.model('a',aSchema);