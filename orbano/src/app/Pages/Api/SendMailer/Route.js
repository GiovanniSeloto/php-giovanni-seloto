// import { NextRequest, NextResponse } from "next/server";
// import nodemailer from "nodemailer";
// import csrf from "csrf";

// const tokens = new csrf()
// const secret = process.env.CSRF_SECRET || tokens.secretSync();

// export async function POST(request: NextRequest){
//     const {csrfToken, email, message} = await request.json();

//     // Validando token CSRF
//     if(!tokens.verify(secret, csrfToken)){
//         return NextResponse.json({error: "Invalid CSRF token"}, {status: 403})
//     }
// }