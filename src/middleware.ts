import { NextResponse } from "next/server";
import { authConfig } from "./auth.config";
import NextAuth from "next-auth";
 
const { auth } = NextAuth(authConfig);

export async function middleware(request:any) {
    const { nextUrl } = request; 
    const session = await auth();
    const isAuthenticated = !!session?.user;
    console.log(isAuthenticated, nextUrl.pathname);

    const reqUrl = new URL(request.url);
    if(!isAuthenticated && reqUrl.pathname !=="/" ) {
        return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
}

export const config = {
    matcher: [
        "/create-item/",
        "/edit-item/:path*"
    ]
};