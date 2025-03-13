// Gernado e retornando um token válido para o meu front-end

import { NextResponse } from "next/server";
import csrf from "csrf";

const csrfInstance = new csrf();

export async function GET(req) {
  try {
    // Gerando token CSRF
    const token = csrfInstance.create(process.env.CSRF_SECRET || "CSRF_SECRET");
    console.log("Token CSRF gerado diretamente:", token);
    return NextResponse.json({ csrfToken: token });
  } catch (error) {
    console.error("Erro ao gerar token CSRF:", error);
    return NextResponse.json(
      { error: "Erro ao gerar token CSRF" },
      { status: 500 }
    );
  }
}
