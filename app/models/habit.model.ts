export interface Habit {
    id: string;
    name: string;
    description?: string;
    frequency: 'daily' | 'weekly';
    target: number;
    unit: string;
    progress: number;
    streak: number;
    createdAt: Date;
    updatedAt: Date;
}

export interface HabitLog {
    id: string;
    habitId: string;
    date: Date;
    value: number;
}