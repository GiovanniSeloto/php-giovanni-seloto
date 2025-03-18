"use client";

import InputFields from "../components/InputFields/page";
import { createAuthEmail } from "@/app/firebase/authEmailServices";
import { FormComponent } from "@/app/FormFields/page";
import { useForm } from "react-hook-form";
import getValidationSchema from "@/app/hooks/resolvers/route";
import Button from "@/app/components/Button/page";
import { useState } from "react";
import styles from "./style.module.css"

export default function RegistrationFields({ handleSubmit, setPage }) {

    const [step, setStep] = useState(0)
    const { getValues } = useForm()
    const selectValidationSchema = getValidationSchema(step);
    const [user, setUser] = useState('')

    const handleClick = async () => {
        try {
            const formData = getValues()
            await selectValidationSchema.validate(formData, { abortEarly: false })
            if (step <= 1)
                setStep(step + 1);
        }
        catch (error) {
            console.log("Erro na validação", error.errors)
        }
    }

    const onCreateSubmit = async (data) => {
        try {
            await createAuthEmail(data.email, data.password)
            alert("Usuário criado")
            console.log(data)
        }
        catch (error) {
            console.log("Erro ao criar novo usuário", error)
        }
    }

    return (
        <>
            <FormComponent validationSchema={selectValidationSchema} onSubmit={onCreateSubmit}>
                <h1 className={styles.Cad__Title}>Bem-Vindo(a)</h1>
                {step === 0 && (
                    <InputFields
                        label="Email" name="email" value={user} onChange={e => setUser(e.target.value)} type="email" placeholder="Digite seu email" />
                )}
                {step === 1 && (
                    <>
                        <button type="button" onClick={()=> setPage(false)}>Voltar</button><p>{user}</p>
                        <InputFields
                            label="Senha" name="password" type="password" placeholder="Crie sua senha" />
                        <span><button type="button" onClick={() => setPage(false)} className={styles.Cad__Login}>Esqueceu senha!</button></span>
                    </>

                )}
                {step === 0 && (
                    <Button type="button" onClick={handleClick}>Próximo</Button>
                )}
                {step === 1 && (
                    <Button type="button" onClick={handleSubmit}> Próximo</Button>
                )}
            </FormComponent>
        </>
    )
}