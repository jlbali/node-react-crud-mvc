

import axios from 'axios';
import cookie from 'react-cookies';


export async function getUser(_id){
    var token = cookie.load("token");
    var params = {
        token: token
    };
    var response = await axios.get("/api/user/" + _id, {
        params: params
    });
    return response.data;
}



export async function getAllUsers(){
    var token = cookie.load("token");
    var params = {
        token: token
    };
    var response = await axios.get("/api/users", {
        params: params
    });
    return response.data;
}


export async function createUser(user){
    var token = cookie.load("token");
    var params = {
        token: token,
        user: user
    };
    var response = await axios.post("/api/user", params);
    return response.data;
}

export async function removeUser(_id){
    var token = cookie.load("token");
    var params = {
        token: token,
    };
    var response = await axios.delete("/api/user/" + _id, {
        params: params
    });
    return response.data;
}

export async function updateUser(_id, user){
    var token = cookie.load("token");
    var params = {
        token: token,
        user: user,
    };
    var response = await axios.put("/api/user/" + _id, params);
    return response.data;
}

