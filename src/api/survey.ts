import { request } from "./request";

function addSurvey(json : string) {
    return request<string>({
        url: `/survey/create`,
        method: 'POST',
        data: json
    });
}

function getSurvey(id : string){
    return request<any>({
        url: `/survey/${id}`,
        method: `GET`
    });
}

function updateSurvey(id : string, json : string) {
    return request<string> ({
        url: `/survey/${id}`,
        method: `POST`,
        data: json
    });
}

function deleteSurvey(id : string) {
    return request<string> ({
        url: `/survey/${id}`,
        method: `DELETE`
    });
}