import {NextRequest, NextResponse} from "next/server";
import {api} from "@/lib/api";
import {cookies} from "next/headers";
import {parse} from "cookie";

interface ApiError {
    response?: {
        data?: {
            error?: string;
        };
    };
    message: string;
    status: number;
}

export async function POST(request: NextRequest) {
    const body = await request.json();
    console.log('Register body', body);
    try {
        const res = await api.post('/auth/register', body);
        const cookieStore = await cookies();
        const setCookie = res.headers['set-cookie'];
        if (setCookie) {
            const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
            for (const cookieArrayElement of cookieArray) {
                const parsed = parse(cookieArrayElement);
                const options = {
                    expires: parsed.Expires ? new Date(parsed.Expires) : undefined,
                    path: parsed.Path || '/',
                    maxAge: Number(parsed['Max-Age']) || undefined
                }

                if (parsed.accessToken) {
                    cookieStore.set('accessToken', parsed.accessToken, options);
                }
                if (parsed.refreshToken) {
                    cookieStore.set('refreshToken', parsed.refreshToken, options);
                }
            }
            return NextResponse.json(res.data);
        }
        return NextResponse.json({error: 'Unauthorized'}, {status: 401});

    } catch (error) {
        return NextResponse.json(
            {
                error: (error as ApiError).response?.data?.error ?? (error as ApiError).message,
            },
            {status: (error as ApiError).status}
        );
    }
}