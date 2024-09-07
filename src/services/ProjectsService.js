import $api from "../http";

export default class ProjectsService {
    static async getProjectList (){
        return $api.get('/api/expertise/data/list/')
    }    
    static async getProjectDetails (uuid){
        return $api.get(`/api/expertise/folder/${uuid}/details/`)
    }    
    static async getProjectHeaders (){
        return $api.get(`/api/expertise/data/custom-fields/list/`)
    }
}

