import { NextResponse } from "next/server";
import { csrf } from "./src/app/Api/Csrf/page";

export default function middleware(req){
  try{
    return csrf(req)
  }
  catch(error){
    console.error("Erro no middleware CSRF", error);
    return NextResponse.json({error: "Falha na autenticação CSFR"}, {status: 403})
  }
}

export const config = {
  matcher: "/app/Api"
}