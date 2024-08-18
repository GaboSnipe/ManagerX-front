import $api from "../http";

export default class FileService {
  static async getFolderList() {
      return  await $api.get('/api/expertise/folder/list/');
  }    

  static async getFolderDetails(folderId) {
      return await $api.get(`/api/expertise/folder/${folderId}/details/`);
  }

  static async addFileInFolder(formData) {
    return $api.post('/api/expertise/file/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
  static async addFolder(formData) {
    return $api.post('/api/expertise/folder/', formData);
  }
}
