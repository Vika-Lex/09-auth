import {User} from "@/types/user";
import {Note} from "@/types/note";
import {api} from "@/app/api/api";
import {cookies} from "next/headers";
import {NoteResponse, Sorting} from "@/lib/api/api";


export const getServerMe = async (): Promise<User> => {
    const cookieStore = await cookies();
    const { data } = await api.get('/users/me', {
        headers: {
            Cookie: cookieStore.toString(),
        },
    });
    return data;
};

export const checkServerSession = async () => {
    const cookieStore = await cookies();
    const res = await api.get('/auth/session', {
        headers: {
            Cookie: cookieStore.toString(),
        },
    });
    return res;
};
export const getAllServerNotes = async (
    search: string = '',
    page: number = 1,

    sorting: Sorting = Sorting.CREATED,
    perPage: number = 10,
    tag?: string
): Promise<NoteResponse> => {
    const cookieStore = await cookies();
    const params = new URLSearchParams({
        page: String(page),
        sortBy: sorting,
        perPage: String(perPage),
        ...(search && { search }),
        ...(tag && { tag })
    });

    const { data } = await api.get(`/notes?${params.toString()}`, {
        headers: {
            Cookie: cookieStore.toString(),
        },
    });
    return data;
};

export const getServerNoteById = async (id: string): Promise<Note> => {
    const cookieStore = await cookies();
    const { data } = await api.get(`/notes/${id}`, {
        headers: {
            Cookie: cookieStore.toString(),
        },
    });
    return data;
};