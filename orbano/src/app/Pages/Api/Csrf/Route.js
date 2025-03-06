/*Arquivo para lidar com a geração de token CSRF */
import { NextResponse } from "next/server";
import csrf from "csrf"

const tokens = new csrf()
const secret = process.env.CSRF_SECRET || tokens.secretSync();

export async function GET() {
    const token = tokens.create(secret)

    // Definindo um token CSRF como cookie somente em HTTP

    const response = NextResponse.json({csrfToken: token})
    response.cookies.set("XSRF-TOKEN", token, {httpOnly: true})

    return response;
}