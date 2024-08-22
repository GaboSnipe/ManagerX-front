import $api from "../http";

export default class NotificationsService {
    static async getNotifications (user_id){
        return $api.get(`/api/notifications/user/${user_id}/list/`)
    }
    static async getCurrentNotification (uuid){
        return $api.get(`/api/notifications/${uuid}/`)
    }
    static async deleteCurrentNotification (uuid){
        return $api.delete(`/api/notifications/${uuid}/delete/`)
    }
    static async patchCurrentNotification (uuid, formData){
        return $api.patch(`/api/notifications/${uuid}/update/`, formData)
    }
}

