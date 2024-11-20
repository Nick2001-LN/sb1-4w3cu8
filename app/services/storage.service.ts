import { Observable } from '@nativescript/core';

export class StorageService extends Observable {
    async saveData(key: string, data: any): Promise<void> {
        try {
            const jsonData = JSON.stringify(data);
            localStorage.setItem(key, jsonData);
        } catch (error) {
            console.error('Error saving data:', error);
        }
    }

    async getData(key: string): Promise<any> {
        try {
            const jsonData = localStorage.getItem(key);
            return jsonData ? JSON.parse(jsonData) : null;
        } catch (error) {
            console.error('Error getting data:', error);
            return null;
        }
    }

    async removeData(key: string): Promise<void> {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error('Error removing data:', error);
        }
    }
}