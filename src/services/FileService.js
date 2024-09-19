import $api from "../http";

export default class FileService {
  static async getFolderList() {
    return await $api.get('/api/expertise/folder/list/');
  }
  static async getFolderDetails(folderId) {
    return await $api.get(`/api/expertise/folder/${folderId}/details/`);
  }
  static async getFileDetails(fileUuid) {
    return await $api.get(`/api/expertise/file/${fileUuid}/details/`);
  }
  static async addFileInFolder(formData) {
    return $api.post('/api/expertise/file/upload/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }
  static async addFolder(formData) {
    return $api.post('/api/expertise/folder/create/', formData);
  }
  static async deleteFolder(folderUuid) {
    return $api.delete(`/api/expertise/folder/${folderUuid}/delete/`);
  }
  static async deleteFile(fileUuid) {
    return $api.delete(`/api/expertise/file/${fileUuid}/delete/`);
  }
  static async patchFile(fileUuid, formData) {
    return $api.delete(`/api/expertise/file/${fileUuid}/update/`, formData);
  }
  static async patchFile(fileUuid, formData) {
    return $api.delete(`/api/expertise/folder/${fileUuid}/update/`, formData);
  }
  static async downloadFile(fileUuid) {
    return $api.get(`/api/expertise/file/${fileUuid}/download/`, {
      responseType: 'blob'
    });
  }
  static async getSincFolderList(rcloneSettings) {
    return $api.post(`/api/expertise/rclone/list/`, rcloneSettings);
  }
  static async rcMkdir(fs, remote) {
    const formData = new FormData();
    formData.append('fs', fs);
    formData.append('remote', remote);
    
    return $api.post(`/api/expertise/rclone/mkdir/`, formData);
  }
  
  static async rcUploadFile(fs, remote, file) {
    const formData = new FormData();
    formData.append('fs', fs);
    formData.append('remote', remote);
    formData.append('file', file);
  
    return $api.post(`/api/expertise/rclone/uploadfile/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
  }

  static async uploadAttachmentfile(file, subtaskUuid, options = {}) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('subtask', subtaskUuid);

    try {
      const response = await $api.post('/api/expertise/attachment/upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        signal: options.signal,
      });
      return response.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        console.log('Request canceled', error.message);
      } else {
        throw new Error(`Error uploading file: ${error.response?.statusText || error.message}`);
      }
    }
  }

  static async downloadAttachment(fileUuid) {
    try {
      const response = await $api.get(`/api/expertise/attachment/${fileUuid}/download/`, {
        responseType: 'blob'
      });
      return response.data;
    } catch (error) {
      throw new Error(`Error downloading file: ${error.response?.statusText || error.message}`);
    }
  }
  static async deleteAttachment(fileUuid) {
    try {
      const response = await $api.delete(`/api/expertise/attachment/${fileUuid}/delete/`);
      return response.data;
    } catch (error) {
      throw new Error(`Error deleting attachment: ${error.response?.statusText || error.message}`);
    }
  }
  
  
}
