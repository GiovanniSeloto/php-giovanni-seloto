// Criando o endpoint -> forncedor de token CSRF

import { nextCsrf } from "next-csrf"

const {csrf} = nextCsrf({secret: process.CSRF_SECRET});

export default function handler(req, res){
    res.status(200).json({csrfToken: csrf(req)});
}