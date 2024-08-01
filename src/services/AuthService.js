import $api from "../http";

export default class AuthService {
    static async login (email, password){
        return $api.post('/api/accounts/auth/jwt/create/', {email, password})
    }    
    
    static async logout(){
        return $api.post('/logout')
    }
}

