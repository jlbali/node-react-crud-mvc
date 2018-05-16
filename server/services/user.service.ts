import User from "../models/user.model";
import * as AuxObj from "../auxliares/objectAux";
import * as RoleServices from "./role.service";

export async function create(user){
    var newUser = new User({
        username: user.username,
        password: user.password,
        id_role: user.id_role,
        email: user.email, 
    });
    console.log("Nos llego el usuario ", user);
    try {
        var savedUser = await newUser.save();
        return savedUser;
    } catch(e){
        console.log("Error! : ", e);
        throw Error("Error " + e);
    }
}

export async function getAll(){
    var users = await User.find();
    var newUsers = AuxObj.clone(users);
    for (let user of newUsers){
        var role = await RoleServices.get(user.id_role);
        user.role = role;        
    }
    return newUsers;
}
// forEach no se presta bien para el async await.

export async function get(_id){
    var user = await User.findOne({_id: _id});
    var newUser = AuxObj.clone(user);
    var role = await RoleServices.get(user.id_role);
    newUser.role = role;
    return newUser;
}


export async function remove(_id){
    await User.remove({_id: _id});
}

export async function update(_id, user){
    await User.findOneAndUpdate({_id: _id}, user);
}


export async function getAll_OLD(){
    var users = await User.find();
    return users;
}
// Falta agregarle los roles a estos usuarios...

export async function authenticate(username, password){
    var query = {
        username: username
    }
    try {
        // Levantamos el usuario.
        var user = await User.findOne(query);
        if (!user){
            return {
                user: null,
                validated: false,
            }
        }
        // Validamos password.
        var isMatch = await user.comparePasswords(password);
        return {
            user: user,
            validated: isMatch,
        }
    } catch(e) {
        throw e;
    }
    
}
