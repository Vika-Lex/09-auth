import {api} from "@/lib/api";
import {NextRequest, NextResponse} from "next/server";

export async function GET(request: NextRequest) {
    try {
        const {searchParams} = new URL(request.url);
        console.log('URL', request.url)
        const res = await api.get(`/notes?${searchParams.toString()}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
            }
        })
        return NextResponse.json(res.data);
    } catch (e) {
        return NextResponse.json({error: 'Failed to fetch notes'}, {status: 500});
    }
}

export async function POST(request: NextRequest) {
    try {
        const note = await request.json();
        const res = await api.post('/notes', note, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`,
            }
        });
        return NextResponse.json(res.data);
    } catch (e) {
        return NextResponse.json({error: 'Failed to create note'}, {status: 500});
    }
}

