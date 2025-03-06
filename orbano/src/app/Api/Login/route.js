import { nextCsrf } from "next-csrf";
import { loginAuthEmail } from "@/app/firebase/authEmailServices";
import csrfMiddleware from "../Middleware/CsrfMiddleware";

async function handler(req, res) {
    if(req.method !== "POST"){
        return res.status(405).json({error: "Método não permitido"})
    }
    
    const { email, password } = req.body

    try{
        await loginAuthEmail(email, password)
        return res.status(200).json({message: "Login bem sucedido"});
    }
    catch (error){
        return res.status(401).json({error: "Credenciais inválidas"})
    }
}

export default csrfMiddleware(handler)