export interface Task {
    task_id: number;
    description: string;
    type: string;
    user_id: number;
    room_id: number;
    created_at: string;
    completed_at: string;
}
