// pages/api/login.js
import csrfMiddleware from "../../middleware/csrfMiddleware";

console.log("Middleware CSRF importado:", csrfMiddleware);

const handler = async (req, res) => {
  await csrfMiddleware(req, res); // Aplica o middleware CSRF antes da lógica do login

  if (req.method === "POST") {
    const { email, password } = req.body;
    
    try {
      return res.status(200).json({ message: "Login bem-sucedido" });
    } catch (error) {
      return res.status(401).json({ error: "Credenciais inválidas" });
    }
  } else {
    return res.status(405).json({ error: "Método não permitido" });
  }
};

export default handler;
