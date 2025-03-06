import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth"
import { db } from '@/app/lib/firebaseConfig'

export const createAuthEmail = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(db, email, password);
    return userCredential.user
}

export const loginAuthEmail = async (email, password) =>{
    const userCredential = await signInWithEmailAndPassword(db, email, password)
    return userCredential.user
}