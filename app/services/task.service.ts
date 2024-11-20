import { Task } from '../models/task.model';
import { Observable } from '@nativescript/core';
import { StorageService } from './storage.service';

export class TaskService extends Observable {
    private storageService: StorageService;
    private readonly TASKS_KEY = 'tasks';

    constructor() {
        super();
        this.storageService = new StorageService();
    }

    async getTodayTasks(): Promise<Array<Task>> {
        const tasks = await this.storageService.getData(this.TASKS_KEY) || [];
        const today = new Date();
        return tasks.filter(task => 
            new Date(task.dueDate).toDateString() === today.toDateString()
        );
    }

    async addTask(task: Task): Promise<Task> {
        const tasks = await this.storageService.getData(this.TASKS_KEY) || [];
        task.id = Date.now().toString();
        task.createdAt = new Date();
        task.updatedAt = new Date();
        tasks.push(task);
        await this.storageService.saveData(this.TASKS_KEY, tasks);
        return task;
    }

    async updateTask(task: Task): Promise<Task> {
        const tasks = await this.storageService.getData(this.TASKS_KEY) || [];
        const index = tasks.findIndex(t => t.id === task.id);
        if (index !== -1) {
            task.updatedAt = new Date();
            tasks[index] = task;
            await this.storageService.saveData(this.TASKS_KEY, tasks);
        }
        return task;
    }

    async deleteTask(taskId: string): Promise<void> {
        const tasks = await this.storageService.getData(this.TASKS_KEY) || [];
        const index = tasks.findIndex(t => t.id === taskId);
        if (index !== -1) {
            tasks.splice(index, 1);
            await this.storageService.saveData(this.TASKS_KEY, tasks);
        }
    }
}