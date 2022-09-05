const User = require("../models/UserModel")

module.exports = {
    create: (request , response) => {
        User.create(request.body)
            .then(user => response.json({
                message: "Your user has been registered successfully",
                user: user,
            }))
            .catch(err => response.status(400).json(err))
    },
    login: (request , response) => {
        User.findOne({email:request.params.email})
            .then(user => response.json(user))
            .catch(err => response.status(400).json(err))
    },
    all:(req,res)=>{
        User.find()
        .then(users=>res.json(users))
        .catch(err=>res.json(err))
    }

}

