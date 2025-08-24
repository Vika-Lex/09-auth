import css from './NoteList.module.css';
import type {Note} from "@/types/note";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import * as NoteService from "@/lib/api";
import Link from "next/link";

interface NoteListProps {
    notes: Note[],
}

const NoteList = ({notes}: NoteListProps) => {
    const queryClient = useQueryClient();

    const mutation = useMutation({
        mutationFn:
        NoteService.deleteNote,
        onSuccess: async () => {
            await queryClient.invalidateQueries({
                queryKey: ['notes'],
            });
        },
        onError: (error) => {
            console.error('Error deleting note:', error);
        },
    });

    return (
        <ul className={css.list}>
            {notes.map((note) => (
                <li key={note.id}
                    className={css.listItem}
                >
                    <Link href={`/notes/${note.id}`}>
                        <h2 className={css.title}>{note.title}</h2>
                        <p className={css.content}>{note.content}</p>
                    </Link>
                    <div className={css.footer}>
                        <span className={css.tag}>{note.tag}</span>
                        <button className={css.button}
                                onClick={() => mutation.mutate(note.id)}
                        >Delete
                        </button>
                    </div>
                </li>)
            )
            }
        </ul>
    );
};
export default NoteList