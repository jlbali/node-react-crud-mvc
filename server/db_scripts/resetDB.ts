import * as mongoose from 'mongoose';
import * as bluebird from 'bluebird';

import Role from "../models/role.model";
import User from "../models/user.model";
import ToDo from "../models/todo.model";

import * as RoleService from "../services/role.service";
import * as UserService from "../services/user.service";

async function resetAndPopulate(){
    mongoose.Promise = bluebird;
    try{
      await mongoose.connect('mongodb://127.0.0.1:27017/todoapp');
      console.log(`Succesfully Connected to the Mongodb Database  at URL : mongodb://127.0.0.1:27017/todoapp`);
      // Limpiando base de datos.
      await ToDo.remove({});
      await User.remove({});
      await Role.remove({});
      // Populando Roles...
      var adminRole = await RoleService.create({
        title: "Administrador",
        isAdmin: true,
      });
      var normalRole = await RoleService.create({
        title: "Usuario",
        isAdmin: false,
      });
      // Populando usuarios.
      var adminUser = await UserService.create({
        username: "admin",
        password: "bla",
        email: "empty@gmail.com",
        id_role: adminRole._id,
      });
    } catch(err){
      console.log("Error: ", err);
      throw Error(err);
    }
}

resetAndPopulate();

