import { NextResponse } from "next/server";
import { nextCsrf } from "next-csrf";

const { csrfVerify } = nextCsrf({
  secret: process.env.CSRF_SECRET || "CSRF_SECRET",
});

export async function middleware(req) {
  try {
    console.log("Verificando CSRF Token...");
    await csrfVerify(req); // Corrigindo a chamada para `csrfVerify`
    return NextResponse.next();
  } catch (error) {
    console.error("Erro na verificação CSRF:", error);
    return NextResponse.json(
      { error: "Falha na autenticação CSRF" },
      { status: 403 }
    );
  }
}
