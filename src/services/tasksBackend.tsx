
import { UserAccount } from './../interfaces/userAccount'
import { MyResetPasswordConfirmationForm } from "./../interfaces/passwordResetConfirmation";
import { PasswordChangeForm } from './../interfaces/passwordChangeForm';

import { TaskCreation } from '../interfaces/tasks';

const APIEndpoint = import.meta.env.VITE_BACKEND_ENDPOINT

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

    async logoutSession() {
        return fetch(APIEndpoint + '/rest-auth/logout/', {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
        }).then(response => response.json())
    }

    async changePassword(data: PasswordChangeForm, token: string) {
        return fetch(APIEndpoint + '/rest-auth/password/change/', {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "AUTHORIZATION": "Token " + token
            },
            body: JSON.stringify(data)
        }).then(response => response.json())
    }

    /* CRUD in tasks */

    async getTasks(token: string) {
        return fetch(APIEndpoint + '/tasks/', {
            headers: {
                "Content-Type": "application/json",
                "AUTHORIZATION": "Token " + token
            },
        }).then(response => response.json())
    }

    async getTask(idTask: string, token: string) {
        return fetch(APIEndpoint + '/tasks/' + idTask + '/', {
            headers: {
                "Content-Type": "application/json",
                "AUTHORIZATION": "Token " + token
            },
        })
    }

    async createTask(task: TaskCreation, token: string) {
        return fetch(APIEndpoint + '/tasks/', {
            method: 'post',
            headers: {
                "Content-Type": "application/json",
                "AUTHORIZATION": "Token " + token
            },
            body: JSON.stringify(task)
        })
    }

    async updateTask(taskid: string, task: TaskCreation, token: string) {
        return fetch(APIEndpoint + '/tasks/' + taskid + '/', {
            method: 'put',
            headers: {
                "Content-Type": "application/json",
                "AUTHORIZATION": "Token " + token
            },
            body: JSON.stringify(task)
        })
    }

    async deleteTask(taskid: string, token: string) {
        return fetch(APIEndpoint + '/tasks/' + taskid + '/', {
            method: 'delete',
            headers: {
                "Content-Type": "application/json",
                "AUTHORIZATION": "Token " + token
            },
        })
    }
}

export default new TasksBackend();
