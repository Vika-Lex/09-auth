import {api} from "@/app/api/api";
import {NextResponse} from "next/server";

interface RouteParams {
    params: {
        id: string;
    };
}

export async function GET(request: Request,  { params }: RouteParams) {
 const { id } = params;
    try {
        const res = await api.get(`/notes/${id}`, {
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

export async function DELETE(request: Request, { params }: RouteParams) {
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