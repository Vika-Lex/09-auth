import {Note} from "@/types/note";
import axios from 'axios';

export interface ApiError {
    response?: {
        data?: {
            error?: string;
        };
        status?: number;
    };
    message: string;
    status: number;
}

export interface NoteResponse {
    notes: Note[];
    totalPages: number;
}

export enum Sorting {
    CREATED = 'created',
}

export const clientApi = axios.create({
    baseURL: '/api',
    withCredentials: true,
});