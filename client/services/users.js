

import axios from 'axios';
import cookie from 'react-cookies';



import { Publisher } from '../framework/mvc';

class UsersStore extends Publisher {

    async getUser(_id){
        var token = cookie.load("token");
        var params = {
            token: token
        };
        var response = await axios.get("/api/user/" + _id, {
            params: params
        });
        return response.data;
    }
    
    
    
    async getAllUsers(){
        var token = cookie.load("token");
        var params = {
            token: token
        };
        var response = await axios.get("/api/users", {
            params: params
        });
        return response.data;
    }
    
    
    async createUser(user){
        var token = cookie.load("token");
        var params = {
            token: token,
            user: user
        };
        var response = await axios.post("/api/user", params);
        this.notifyAll();
        return response.data;
    }
    
    async removeUser(_id){
        var token = cookie.load("token");
        var params = {
            token: token,
        };
        var response = await axios.delete("/api/user/" + _id, {
            params: params
        });
        this.notifyAll();
        return response.data;
    }
    
    async updateUser(_id, user){
        var token = cookie.load("token");
        var params = {
            token: token,
            user: user,
        };
        var response = await axios.put("/api/user/" + _id, params);
        this.notifyAll();
        return response.data;
    }
    
    

}

let usersStore = new UsersStore();

export default usersStore;



