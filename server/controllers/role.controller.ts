import * as RoleService from "../services/role.service";


export async function getAll(req, res){
    var roles = await RoleService.getAll();
    res.json(roles);
}

