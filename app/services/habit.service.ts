import { Habit, HabitLog } from '../models/habit.model';
import { Observable } from '@nativescript/core';
import { StorageService } from './storage.service';

export class HabitService extends Observable {
    private storageService: StorageService;
    private readonly HABITS_KEY = 'habits';
    private readonly HABIT_LOGS_KEY = 'habit_logs';

    constructor() {
        super();
        this.storageService = new StorageService();
    }

    async getHabitStats(): Promise<{ completed: number; streak: number }> {
        const habitLogs = await this.storageService.getData(this.HABIT_LOGS_KEY) || [];
        const today = new Date();
        const completedToday = habitLogs.filter(log => 
            new Date(log.date).toDateString() === today.toDateString()
        ).length;

        // Calculate streak
        let streak = 0;
        let currentDate = new Date();
        
        while (true) {
            const logsForDate = habitLogs.filter(log => 
                new Date(log.date).toDateString() === currentDate.toDateString()
            );
            
            if (logsForDate.length === 0) break;
            
            streak++;
            currentDate.setDate(currentDate.getDate() - 1);
        }

        return {
            completed: completedToday,
            streak
        };
    }

    async addHabit(habit: Habit): Promise<Habit> {
        const habits = await this.storageService.getData(this.HABITS_KEY) || [];
        habit.id = Date.now().toString();
        habit.createdAt = new Date();
        habit.updatedAt = new Date();
        habits.push(habit);
        await this.storageService.saveData(this.HABITS_KEY, habits);
        return habit;
    }

    async logHabit(habitId: string, value: number): Promise<HabitLog> {
        const habitLogs = await this.storageService.getData(this.HABIT_LOGS_KEY) || [];
        const log: HabitLog = {
            id: Date.now().toString(),
            habitId,
            date: new Date(),
            value
        };
        habitLogs.push(log);
        await this.storageService.saveData(this.HABIT_LOGS_KEY, habitLogs);
        return log;
    }
}