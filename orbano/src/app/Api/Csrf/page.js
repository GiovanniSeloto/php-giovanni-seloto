import { nextCsrf } from "next-csrf";
import csrfMiddleware from "../Middleware/page";

const { csrf } = nextCsrf({
    secret: process.env.CSRF_SECRET || 'default-secret',
  });
  
  const handler = async (req, res) => {
    // Aplica o middleware CSRF antes de processar a requisição
    await csrfMiddleware(req, res);
  
    if (req.method === "GET") {
      console.log("Gerando token CSRF...");
      const token = csrf(req); // Gera o token CSRF
      return res.status(200).json({ csrfToken: token });
    } else {
      console.log("Método não permitido:", req.method);
      return res.status(405).json({ error: "Método não permitido" });
    }
  };
  
  export default handler;