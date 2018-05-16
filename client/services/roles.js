
import axios from 'axios';
import cookie from 'react-cookies';



export async function getAllRoles(){
    var token = cookie.load("token");
    var params = {
        token: token
    };
    var response = await axios.get("/api/roles", {
        params: params
    });
    return response.data;
}

