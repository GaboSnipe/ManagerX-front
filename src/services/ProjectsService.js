import $api from "../http";

export default class ProjectsService {
    static async getProjectList (settings){
        return $api.get(`/api/expertise/data/list/?${settings ? settings : "limit=15&offset=0"}`)
    }    
    static async getProjectDetails (uuid){
        return $api.get(`/api/expertise/folder/${uuid}/details/`)
    }    
    static async getProjectHeaders (){
        return $api.get(`/api/expertise/data/custom-fields/list/`)
    }    
    static async createNewProject(conclusionNumber, task) {
        return $api.post(`/api/expertise/data/create/`, { conclusionNumber, task });
    }  
    static async fillCustomFields(data) {
        return $api.post(`/api/expertise/data/create-expertise-data/`, data);
    }
    static async createCustomFields(data) {
        return $api.post(`/api/expertise/data/custom-fields/`, data);
    }
    static async generateConclusion(formData) {
        return $api.post(`/api/expertise/rclone/generate-conclusion/`, formData);
    }
}

