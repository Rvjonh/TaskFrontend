const APIEndpoint = "http://localhost:8000/api/v1"

import { UserAccount } from './../interfaces/userAccount'
import { MyResetPasswordConfirmationForm } from "./../interfaces/passwordResetConfirmation";


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

    async signup(data: UserAccount) {
        return fetch(APIEndpoint + '/rest-auth/signup/', {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
    }

    async resetPassword(email: string) {
        return fetch(APIEndpoint + '/rest-auth/password/reset/', {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ 'email': email })
        }).then(response => response.json())
    }

    async resetPasswordConfirm(data: MyResetPasswordConfirmationForm) {
        return fetch(APIEndpoint + '/rest-auth/password/reset/confirm/', {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
    }
}

export default new TasksBackend();