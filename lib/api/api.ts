import {Note} from "@/types/note";

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