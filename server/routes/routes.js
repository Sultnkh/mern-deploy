const Controller =require('../controllers/controller');
const UserController = require("../controllers/UserController.js")

module.exports=app=>{
    app.get('/api/all',Controller.allPirates);
    app.post('/api/new',Controller.createPirate);
    app.get('/api/:id',Controller.viewPirate);
    app.put('/api/:id', Controller.updatePirate);
    app.delete('/api/:id',Controller.deletePirate);
    app.post("/api/register",UserController.create)
    app.get("/api/login/:email",UserController.login)
    app.get("/api/all/users",UserController.all)
}