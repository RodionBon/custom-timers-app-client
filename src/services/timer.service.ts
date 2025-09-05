import { Injectable } from "@angular/core";
import axios from "axios";
import { Timer } from "src/types";

const URL_BASE = 'http://localhost:3000';

@Injectable({
    providedIn: 'root',
})
export class TimerService {
    async getTimers() {
        try {
            const response = await axios.get(`${URL_BASE}/timer`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Failed to fetch timers:', error);
            throw error;
        }
    }

    async getTimer(id: number): Promise<Timer> {
        try {
            const response = await axios.get(`${URL_BASE}/timer/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Failed to fetch timer:', error);
            throw error;
        }
    }

    async createTimer(timerData: Partial<Timer>) {
        try {
            const response = await axios.post(`${URL_BASE}/timer`, timerData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Failed to create timer:', error);
            throw error;
        }
    }

    async updateTimer(id: number, updatedData: Partial<Timer>) {
        try {
            const response = await axios.put(`${URL_BASE}/timer/${id}`, updatedData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Failed to update timer:', error);
            throw error;
        }
    }

    async deleteTimer(id: number) {
        try {
            const response = await axios.delete(`${URL_BASE}/timer/${id}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Failed to delete timer:', error);
            throw error;
        }
    }
} 