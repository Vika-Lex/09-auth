import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';

export interface NoteFormData {
    title: string;
    content: string;
    tag: string;
}

export const initialDraft: NoteFormData = {
    title: '',
    content: '',
    tag: 'Todo',
};

interface NoteStore {
    draft: NoteFormData;
    setDraft: (note: Partial<NoteFormData>) => void;
    clearDraft: () => void;
}

export const useNoteStore = create<NoteStore>()(
    devtools(
        persist(
            (set, get) => ({
                draft: initialDraft,
                setDraft: (note: Partial<NoteFormData>) =>
                    set({
                        draft: { ...get().draft, ...note },
                    }, false, "setDraft"),
                clearDraft: () => set({ draft: initialDraft }, false, "clearDraft"),
            }),
            {
                name: 'note-draft-storage',
                partialize: (state) => ({ draft: state.draft }),
            }
        ),
        {
            name: 'note-store',
        }
    )
);