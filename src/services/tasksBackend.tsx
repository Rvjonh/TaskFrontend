const APIEndpoint = "http://localhost:8000/api/v1"

import { UserAccount } from './../interfaces/userAccount'

class TasksBackend {

    async login(data: UserAccount) {
        return fetch(APIEndpoint + '/rest-auth/login/', {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
    }
}

export default new TasksBackend();
