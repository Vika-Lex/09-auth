import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { api } from "../../api";

export async function POST() {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refreshToken')?.value;

    if (!refreshToken) {
        return NextResponse.json(
            { error: 'No refresh token provided' },
            { status: 401 }
        );
    }

    try {
        const apiRes = await api.post('/auth/refresh', {}, {
            headers: {
                Cookie: cookieStore.toString()
            }
        });

        const setCookieHeaders = apiRes.headers['set-cookie'];
        const response = NextResponse.json({ success: true });

        if (setCookieHeaders) {
            const cookieArray = Array.isArray(setCookieHeaders) ? setCookieHeaders : [setCookieHeaders];

            cookieArray.forEach(cookieHeader => {
                response.headers.append('Set-Cookie', cookieHeader);
            });
        }

        return response;
    } catch {
        const response = NextResponse.json(
            { error: 'Failed to refresh token' },
            { status: 401 }
        );

        response.cookies.delete('accessToken');
        response.cookies.delete('refreshToken');

        return response;
    }
}