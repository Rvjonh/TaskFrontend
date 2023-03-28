
export interface Task {
    "created_at": string;
    "description": string;
    "id": number;
    "title": string;
    "updated_at": string;
    "user": number;
}

export interface TaskList {
    tasks: Task[];
}