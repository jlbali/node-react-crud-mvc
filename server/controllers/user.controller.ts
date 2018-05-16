import * as JWT from "jsonwebtoken";

import * as UserService from "../services/user.service";
import * as RoleService from "../services/role.service";
import * as AuxObj from "../auxliares/objectAux";


var superSecret = "TodoApp";

export async function authenticate(req, res){
    var username = req.body.username;
    var password = req.body.password;
    var objetoUser = await UserService.authenticate(username, password);
    if (!objetoUser.validated){
        console.log("Ingreso impedido!");
        res.json({
            success: false,
            message: "Fallo de autenticacion, usuario o clave incorrectos."
        });
    } else {
        var user = AuxObj.clone(objetoUser.user); // Necesario, el objeto como viene es read-only.
        console.log("Ingreso concedido!");
        var token = JWT.sign({
            name: user.name
        }, superSecret, {
            expiresIn: 60*60*24, // expira en un dia (24 horas)
        });
        var role = await RoleService.get(user.id_role);
        user.role = role;
        res.json({
            success: true,
            message: "Ingreso concedido",
            token: token,
            user: user
        });
    }
}

export async function validateToken(req, res, next){
    var token = req.body.token || req.param('token') || req.headers['x-access-token'];
    //console.log("Token: ", token);
    //console.log("req.body: ", req.body);
    //console.log("req.params: ", req.params);
    if (!token){
        console.log("No se proveyo Token");
        return res.status(403).send({
            success: false,
            message: "No token provided."
        });
    } else {
        try {
            var decoded = await JWT.verify(token, superSecret);
            req.decoded = decoded;
            console.log("token aceptado");
            next();
        } catch(e){
            console.log("Token rechazado");
            return res.status(403).send({
                success: false,
                message: 'Failed to authenticate token.'
            });
        }
        
    }
}

export async function get(req, res){
    var user = await UserService.get(req.params._id);
    res.json(user);
}

export async function getAll(req, res){
    var users = await UserService.getAll();
    res.json(users);
}


export async function create(req, res){
    await UserService.create(req.body.user);
    res.json({
        success: true
    });
}

export async function update(req, res){
    await UserService.update(req.params._id, req.body.user);
    res.json({
        success: true
    });
}


export async function remove(req, res){
    await UserService.remove(req.params._id);
    res.json({
        success: true
    });
}

