import $api from "../http";

export default class ProjectsService {
    static async getProjectList (){
        return $api.get('/api/expertise/folder/list/')
    }    
    static async getProjectDetails (uuid){
        return $api.get(`/api/expertise/folder/${uuid}/details/`)
    }    
    static async getProjectHeaders (){
        return $api.get(`/api/expertise/folder/custom-fields/list/`)
    }
}

