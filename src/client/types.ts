export interface Task {
    task_id: number;
    description: string;
    type: string;
    user_id: number;
    room_id: number;
    created_at: string;
    completed_at: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
}

export interface Room {
    room_id: number;
    type: string;
    name: string;
}
