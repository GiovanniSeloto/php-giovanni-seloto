import { nextCsrf } from "next-csrf";

// Configuração do CSRF com o segredo
const { csrfMiddleware } = nextCsrf({
  secret: process.env.CSRF_SECRET || 'default-secret',
});

console.log("csrfMiddleware carregado corretamente");
// Exporte a função csrfMiddleware para uso em outras partes do projeto
export default csrfMiddleware;