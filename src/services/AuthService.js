import $api from "../http";

export default class AuthService {
  static async login(email, password) {
    return $api.post('/api/accounts/auth/login/', { email, password });
  }
  static async googleLogin(access_token) {
    return $api.post('/api/accounts/auth/google/', { access_token });
  }
  static async authCheck(token) {
    return $api.post('/api/accounts/auth/token/verify/', { token });
  }
  
 
  static async logout() {
    return $api.post('/api/accounts/auth/logout/');
  }
}