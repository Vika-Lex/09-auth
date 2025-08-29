import {api} from "@/app/api/api";
import {NextResponse} from "next/server";

export async function GET(request: Request, {params}: { params: { id: string } }) {
    try {
        const res = await api.get(`/notes/${params.id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
            }
        })
        return NextResponse.json(res.data);
    } catch (e) {
        return NextResponse.json({error: 'Failed to get by id'}, {status: 500});
    }
}

export async function DELETE(request: Request, {params}: { params: { id: string } }) {
    try {
        const res = await api.delete(`/notes/${params.id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`
            }
        })
        return NextResponse.json(res.data);
    } catch (e) {
        return NextResponse.json({error: 'Failed to delete'}, {status: 500});
    }
}