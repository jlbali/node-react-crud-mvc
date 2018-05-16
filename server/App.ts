import * as express from 'express';
import * as bluebird from 'bluebird';
import * as mongoose from 'mongoose';
import * as bodyParser from 'body-parser';

import * as TodoController from './controllers/todos.controller';
import * as UserController from './controllers/user.controller';
import * as RoleController from './controllers/role.controller';

class App {
  public express;

  constructor(){
    this.express = express();
    this.enableCors();
    this.enablePublic();
    this.mountDefaultRoutes();
    this.enableMongoose();
    this.mountRoutesAuthentication();
    this.tokenValidationMiddleware();
    this.mountRoutesTodos();
    this.mountRoutesUsers();
    this.mountRoutesRoles();
  
  }

  private enableCors(): void {
    this.express.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "http://localhost:4200");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
      next();
    });
  }

  private enablePublic(): void{
    this.express.use(bodyParser.urlencoded({ extended: true }));
    this.express.use(bodyParser.json());
    this.express.use(express.static('dist_client'));

  }

  // Version con promesas.
  private enableMongoose_OLD(): void {
    mongoose.Promise = bluebird;
    mongoose.connect('mongodb://127.0.0.1:27017/todoapp')
      .then(()=> { console.log(`Succesfully Connected to the
        Mongodb Database  at URL : mongodb://127.0.0.1:27017/todoapp`)})
      .catch((err)=> { 
        console.log("Error: ", err);
        console.log(`Error Connecting to the Mongodb Database at URL : mongodb://127.0.0.1:27017/todoapp`);
      });    
  }

  // Version con Async, que queda algo mas elegante.
  private async enableMongoose() {
    mongoose.Promise = bluebird;
    try{
      await mongoose.connect('mongodb://127.0.0.1:27017/todoapp');
      console.log(`Succesfully Connected to the
        Mongodb Database  at URL : mongodb://127.0.0.1:27017/todoapp`);
    } catch(err){
      console.log("Error: ", err);
      console.log(`Error Connecting to the Mongodb Database at URL : mongodb://127.0.0.1:27017/todoapp`);
    }
  }



  private mountDefaultRoutes(): void {
    this.express.get('/', (req, res) => {
      console.log("Redireccionando a login...");
      res.redirect("/main.html#/login");
    });
    this.express.get('/hello', (req, res) => {
      res.json({
        message: "Hello World!"
      });
    });
    this.express.post("/api/login", UserController.authenticate);
  }

  private tokenValidationMiddleware(){
    this.express.use(UserController.validateToken);
  }


  private mountRoutesTodos(): void {
    this.express.get("/api/todos", TodoController.getTodos);
    this.express.post("/api/todo", TodoController.createTodo);
    this.express.put("/api/todo", TodoController.updateTodo);
    this.express.delete("/api/todo/:_id", TodoController.removeTodo);
  }

  private mountRoutesUsers(): void {
    this.express.get("/api/users", UserController.getAll);
    this.express.get("/api/user/:_id", UserController.get);
    this.express.post("/api/user", UserController.create);
    this.express.delete("/api/user/:_id", UserController.remove);
    this.express.put("/api/user/:_id", UserController.update);
  }

  private mountRoutesRoles(): void{
    this.express.get("/api/roles", RoleController.getAll);
  }

  private mountRoutesAuthentication(): void {
    this.express.post("/api/authenticate", UserController.authenticate);
  }

  public async listen(port:number) {
    await this.express.listen(port);
    console.log("Servidor activo en puerto " + port);
  }

}

export default App;
