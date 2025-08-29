import {api} from "@/app/api/api";
import { cookies } from "next/headers";
import {NextResponse} from "next/server";

type Props = {
    params: Promise<{ id: string }>;
};

export async function GET(request: Request,  { params }: Props) {
     try {
         const cookieStore = await cookies();
         const { id } = await params;
         const res = await api(`/notes/${id}`, {
             headers: {
                 Cookie: cookieStore.toString(),
             },
         });
         return NextResponse.json(res.data, { status: res.status });
    } catch (e) {
        return NextResponse.json({error: 'Failed to get by id'}, {status: 500});
    }
}

export async function DELETE(request: Request, { params }: Props) {
    try {
        const cookieStore = await cookies();
        const { id } = await params;

        const res = await api.delete(`/notes/${id}`, {
            headers: {
                Cookie: cookieStore.toString(),
            },
        });
        return NextResponse.json(res.data, { status: res.status });
    } catch (e) {
        return NextResponse.json({error: 'Failed to delete'}, {status: 500});
    }
}

export async function PATCH(request: Request, { params }: Props) {
    try {
        const cookieStore = await cookies();
        const { id } = await params;
        const body = await request.json();

        const res = await api.patch(`/notes/${id}`, body, {
            headers: {
                Cookie: cookieStore.toString(),
            },
        });
        return NextResponse.json(res.data, { status: res.status });
    } catch (error) {
        return NextResponse.json({error: 'Failed to change'}, {status: 500});
    }
}