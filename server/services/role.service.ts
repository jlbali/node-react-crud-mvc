import Role from "../models/role.model";


export async function create(role){
    var newRole = new Role({
        title: role.title,
        isAdmin: role.isAdmin, 
    });
    try {
        var savedRole = await newRole.save();
        return savedRole;
    } catch(e){
        console.log("Error! : ", e);
        throw Error("Error " + e);
    }
}



export async function get(_id){
    var role = await Role.findOne({_id: _id});
    return role;
}

export async function getAll(){
    var roles = await Role.find();
    return roles;
}