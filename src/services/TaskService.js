import $api from "../http";

export default class TaskService {
    static async getTaskList (){
        return $api.get('/api/tasks/list/')
    }
    static async addTask (formData){
        return $api.post('/api/tasks/create/',formData)
    }
}

