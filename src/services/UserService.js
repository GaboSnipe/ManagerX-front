import $api from "../http";

export default class UserService {
  static async getUserInfo(id) {
    return $api.get(`/api/accounts/auth/users/${id}/`);
  }

  static async getUserList() {
    return $api.get('/api/accounts/list/');
  }
}