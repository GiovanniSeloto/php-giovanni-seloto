// Validadno o token criado

import { nextCsrf } from "next-csrf"

const {csrfMiddleware} = nextCsrf({secret: process.env.CSRF_SECRET});

export default csrfMiddleware

// Vamos utilizar esse middleware para aplicar nas rotas que exigem CSRF

