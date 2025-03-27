import csrf from "csrf";
import {createUserWithEmailAndPassword} from "firebase/auth"
import { db } from "@/app/lib/firebaseConfig";

const csrfInstance = new csrf();

export async function POST(req) {
  try {
    const headers = req.headers;
    const tokenRecebido = headers.get("csrf-token");

    // Verificar o token CSRF
    const secret = process.env.CSRF_SECRET || "CSRF_SECRET";
    const isValid = csrfInstance.verify(secret, tokenRecebido);

    if (!isValid) {
      return Response.json({ error: "Token CSRF inválido" }, { status: 403 });
    }

    // Obter os dados do corpo da requisição
    const { email, password } = await req.json();

    // Autenticar o usuário no Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(db, email, password);
    const user = userCredential.user;

    return Response.json({
      message: "Cadastro realizado com sucesso",
      uid: user.uid,
      email: user.email,
    });
  } catch (error) {
    console.error("Erro ao Castrar:", error);
    return Response.json({ error: "Falha no cadastro" }, { status: 401 });
  }
}
