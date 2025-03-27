import {createUserWithEmailAndPassword, signInWithEmailAndPassword, 
    sendEmailVerification} from "firebase/auth"
import { db } from '@/app/lib/firebaseConfig'

export const createAuthEmail = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(db, email, password);
    return userCredential.user
}

export const loginAuthEmail = async (email, password) =>{
    const userCredential = await signInWithEmailAndPassword(db, email, password)
    return userCredential.user
}

export const resetPassword = async (email) =>{
    try{
        await sendEmailVerification(db, email);
        alert("E-mail de verificação enviado! Verifique sua caixa de entrada")
    } catch (error){
        console.error("Erro ao enviar e-mail:", error.message)
        alert("Erro ao enviar e-mail. Verifique se voce enseriu um e-mail válido")
    }
}