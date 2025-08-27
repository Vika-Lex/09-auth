import axios from "axios";
import {type Note, User} from "@/types/note";
import {API_URL} from "@/constants";


export interface NoteResponse {
    notes: Note[];
    totalPages: number;
}

export interface RegisterRequest {
    email: string;
    password: string;
    userName: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export enum Sorting {
    CREATED = 'created',
}

export const api = axios.create({
    baseURL: API_URL,
    withCredentials: true
})

const nextServer = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_SERVER_URL}/api`,
    withCredentials: true
})
export const getAllNotes = async (
    search: string,
    page: number = 1,
    sorting: Sorting = Sorting.CREATED,
    perPage: number = 10,
    tag?: string
): Promise<NoteResponse> => {
    const params = new URLSearchParams({
        page: String(page),
        sortBy: sorting,
        perPage: String(perPage),
        ...(search && {search}),
        ...(tag && {tag}),
    });
    const {data} = await nextServer.get<NoteResponse>(`/notes?${params.toString()}`, {});
    return data;
}


export const getNoteById = async (
    id: string
): Promise<Note> => {
    const {data} = await nextServer.get<Note>(`/notes/${id}`);
    return data;
}

export const createNote = async (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>): Promise<Note> => {
    const {data} = await nextServer.post<Note>(`/notes`, note);
    return data;
}

export const deleteNote = async (id: string): Promise<Note> => {
    const {data} = await nextServer.delete<Note>(`/notes/${id}`);
    return data;
}

export const registerUser = async (userData: RegisterRequest) => {
    const {data} = await nextServer.post<User>('/auth/register', userData);
    return data;
}

export const loginUser = async (loginData: LoginRequest) => {
    const {data} = await nextServer.post<User>('/auth/login', loginData);
    return data;
}