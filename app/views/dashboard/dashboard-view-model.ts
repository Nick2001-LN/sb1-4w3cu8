import { Observable } from '@nativescript/core';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { HabitService } from '../../services/habit.service';

export class DashboardViewModel extends Observable {
    private _dailyQuote: string = "The only way to do great work is to love what you do.";
    private _quoteAuthor: string = "Steve Jobs";
    private _todayTasks: Array<Task> = [];
    private _completedHabits: number = 0;
    private _streakDays: number = 0;

    constructor() {
        super();
        this.loadDashboardData();
    }

    get dailyQuote(): string {
        return this._dailyQuote;
    }

    get quoteAuthor(): string {
        return this._quoteAuthor;
    }

    get todayTasks(): Array<Task> {
        return this._todayTasks;
    }

    get completedHabits(): number {
        return this._completedHabits;
    }

    get streakDays(): number {
        return this._streakDays;
    }

    private async loadDashboardData() {
        // Load tasks for today
        const taskService = new TaskService();
        this._todayTasks = await taskService.getTodayTasks();
        
        // Load habits progress
        const habitService = new HabitService();
        const habitStats = await habitService.getHabitStats();
        this._completedHabits = habitStats.completed;
        this._streakDays = habitStats.streak;

        this.notifyPropertyChange('todayTasks', this._todayTasks);
        this.notifyPropertyChange('completedHabits', this._completedHabits);
        this.notifyPropertyChange('streakDays', this._streakDays);
    }
}