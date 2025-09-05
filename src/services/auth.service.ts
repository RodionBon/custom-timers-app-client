import { Injectable } from "@angular/core";
import axios from "axios";
import { AuthResponse } from "src/types";

const URL_BASE = 'http://localhost:3000';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    async signIn(credentials: { email: string; password: string }): Promise<AuthResponse> {
        try {
            const response = await axios.post(`${URL_BASE}/auth/signin`, credentials);
            return response.data;
        } catch (error) {
            console.error('Failed to sign in:', error);
            throw error;
        }
    }

    async signUp(credentials: { email: string; password: string }): Promise<AuthResponse> {
        try {
            const response = await axios.post(`${URL_BASE}/auth/signup`, credentials);
            return response.data;
        } catch (error) {
            console.error('Failed to sign up:', error);
            throw error;
        }
    }
}