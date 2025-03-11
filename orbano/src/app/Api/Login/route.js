// Protejendo EndPoint da APi

import { csrfVerify } from "../Csrf/page";

export default async function handler(req, res){
  try{
    await csrfVerify(req, res);
    res.status(200).json({message: 'Requisição segura!'});
  }
  catch (error){
    console.error(error);
    res.status(403).json({error: 'Falha na verificação CSRF'})
  }
}