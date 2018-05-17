
import axios from 'axios';
import cookie from 'react-cookies';

import { Publisher } from '../framework/mvc';

class RolesStore extends Publisher {

    async getAllRoles(){
        var token = cookie.load("token");
        var params = {
            token: token
        };
        var response = await axios.get("/api/roles", {
            params: params
        });
        return response.data;    
    }
}


let rolesStore = new RolesStore();

export default rolesStore;


