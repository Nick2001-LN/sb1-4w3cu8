export enum Priority {
    High = 'HIGH',
    Medium = 'MEDIUM',
    Low = 'LOW'
}

export interface Task {
    id: string;
    title: string;
    description?: string;
    dueDate: Date;
    dueTime?: string;
    priority: Priority;
    category: string;
    completed: boolean;
    createdAt: Date;
    updatedAt: Date;
}