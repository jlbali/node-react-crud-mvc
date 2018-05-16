
import axios from 'axios';
import cookie from 'react-cookies';


export async function authenticate(username, password){
    var body={
        username: username,
        password: password
    }
    console.log("Mandando ", body);
    var response = await axios.post("/api/login", body);
    console.log("Respuesta: ", response.data);
    if (response.data.success){
        // Generamos la suscripcion del token en la sesion.
        cookie.save("token", response.data.token);
        cookie.save("user", response.data.user);
        return {
            validated: true
        };
    } else return {
        validated: false,
        message: response.data.message,
    }
}

