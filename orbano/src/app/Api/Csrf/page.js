// Gerando token

import { nextCsrf } from "next-csrf";

const {csrf, csrfVerify} = nextCsrf({
  secret: process.env.CSRF_SECRET || 'CSRF_SECRET',
})

export {csrf, csrfVerify};