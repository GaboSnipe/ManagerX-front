import $api from "../http";

export default class TaskService {
    static async getTaskList (){
        return $api.get('/api/tasks/list/')
    }
    static async addTask (formData){
        return $api.post('/api/tasks/create/',formData)
    }
    static async getTask (uuid){
        return $api.get(`/api/tasks/${uuid}/`)
    }
    static async editTask (uuid, formData){
        return $api.patch(`/api/tasks/${uuid}/update/`,formData)
    }
    static async createTask (formData){
        return $api.post(`/api/tasks/create/`,formData)
    }
    static async editSubTask (uuid, formData){
        return $api.patch(`/api/tasks/subtasks/${uuid}/update/`,formData)
    }
}