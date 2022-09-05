const {a} =require('../models/model');

module.exports={
    allPirates:(req,res)=>{
        a.aggregate([
            {
                "$project":{
                    "name":1,
                    "insensitive":{"$toLower":"$name"}
                }
            },
            { "$sort": { "insensitive": 1 } }
        ])
        .then(pirates=>res.json(pirates))
        .catch(err=>res.json({message:'something went wrong',error:err}));
    },
    createPirate:(req,res)=>{
        a.create(req.body)
        .then(pirate=>res.json(pirate))
        .catch(err=>res.status(400).json(err));
    },
    viewPirate:(req,res)=>{
        a.findOne({_id:req.params.id})
        .then(pirate=>res.json(pirate))
        .catch(err=>res.json(err))
    },
    updatePirate:(req,res)=>{
        a.updateOne({_id:req.params.id},req.body,{runValidators:true})
        .then(updatedPirate=>res.json(updatedPirate))
        .catch(err=>res.status(400).json(err))
    },
    deletePirate:(req,res)=>{
        a.deleteOne({_id:req.params.id})
        .then(deleteConf=>res.json(deleteConf))
        .catch(err=>res.json(err))
    }
}