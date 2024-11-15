import $api from "../http";

export default class TaskService {
    static async getTaskList(settings) {
        return $api.get(`/api/tasks/list${settings ? settings : ''}`,)
    }
    static async addTask(formData) {
        return $api.post('/api/tasks/create/', formData)
    }
    static async getTask(uuid) {
        return $api.get(`/api/tasks/${uuid}/`)
    }
    static async getSubTask(uuid) {
        return $api.get(`/api/tasks/subtasks/${uuid}/`)
    }
    static async getSubtaskList(uuid) {
        return $api.get(`/api/tasks/subtasks/list/?task=${uuid}`);
    }
    static async getSubtaskSettList(settings) {
        return $api.get(`/api/tasks/subtasks/list/?${settings}`);
    }
    static async editTask(uuid, formData) {
        return $api.patch(`/api/tasks/${uuid}/update/`, formData)
    }
    static async deleteSubTask(uuid) {
        return $api.delete(`/api/tasks/subtasks/${uuid}/delete/`)
    }
    static async createTask(formData) {
        return $api.post(`/api/tasks/create/`, formData)
    }
    static async editSubTask(uuid, formData) {
        return $api.patch(`/api/tasks/subtasks/${uuid}/update/`, formData)
    }
    static async createSubTask(formData) {
        return $api.post(`/api/tasks/subtasks/create/`, formData)
    }

    static async createComment(content, subtaskUuid, parentUuid = null) {
        const data = {
            content,
            subtask: subtaskUuid,
            parent: parentUuid,
        };

        try {
            const response = await $api.post('/api/tasks/subtasks/comments/create/', data);
            return response.data;
        } catch (error) {
            throw new Error(`Error creating comment: ${error.response?.statusText || error.message}`);
        }
    }
    static async deletecomment(uuid) {
        return $api.delete(`/api/tasks/subtasks/comments/${uuid}/delete/`)
    }
    static async getNotesList( ) {
        return $api.get(`/api/tasks/notes/list/`)
    }
    static async getCurrentNote(uuid) {
        return $api.get(`/api/tasks/notes/${uuid}/`)
    }
    static async deleteCurrentNote(uuid) {
        return $api.get(`/api/tasks/notes/${uuid}/delete/`)
    }
    static async updateCurrentNote({uuid, newTitle, newContent}) {
        return $api.get(`/api/tasks/notes/${uuid}/update/`, {title: newTitle, content: newContent})
    }
}