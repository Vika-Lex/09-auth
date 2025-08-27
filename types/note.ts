export interface Note {
    id: string
    title: string
    content: string
    createdAt: string
    updatedAt: string
    tag: string
}

export interface NewNoteData {
    title: string
    content: string
    tag: string
}

export interface User {
    id: string;
    email: string;
    userName?: string;
    photoUrl?: string;
    createdAt: Date;
    updatedAt: Date;
}



