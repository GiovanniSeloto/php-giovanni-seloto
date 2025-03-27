import InputFields from "../components/InputFields/page";
import { createAuthEmail } from "@/app/firebase/authEmailServices";
import { FormComponent } from "@/app/FormFields/page";
import { useForm } from "react-hook-form";
import getValidationSchema from "@/app/hooks/resolvers/route";
import Button from "@/app/components/Button/page";
import { useState } from "react";
import styles from "./style.module.css"
import { resetPassword } from "@/app/firebase/authEmailServices";

export default function RegistrationFields({ setPage }) {

    const [step, setStep] = useState(0)
    const { getValues } = useForm()
    const selectValidationSchema = getValidationSchema(step);

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')


    // Estado do formulário
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

    // Validação com token CSRF
 const handleSubmit = async (data) => {
        try {
            const res = await fetch("/api/Create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "CSRF-Token": csrfToken, // Inclui o token CSRF na requisição
                },
                body: JSON.stringify({
                    email: data.email,
                    password: data.password
                }),
            });
            const responseData = await res.json();

            if (!res.ok) {
                console.error("Erro na API:", responseData.error);
                alert("Erro ao criar novo usuário. Verifique suas credenciais.");
                return;
            }

            const login = await createAuthEmail(data.email, data.password)

            if (login) {
                alert("Usuário criado com sucesso!")
            }
        } catch (error) {
            console.error("Erro ao criar usuário", error);
            alert("Erro ao tentar criar novo usuário")
        }
    };

    // Envio de email de recuperação
    const onSubmit = (data)=>{
        resetPassword(data.email)
    }

    return (
        <>
            <FormComponent validationSchema={selectValidationSchema} onSubmit={handleSubmit}>
                <h1 className={styles.Cad__Title}>Bem-Vindo(a)</h1>
                {step === 0 && (
                    <InputFields
                        label="Email" name="email" value={email} type="email" placeholder="Digite seu email"
                        onChange={(e) => setEmail(e.target.value)} />
                )}
                {step === 1 && (
                    <>
                        <button type="button" onClick={() => setPage(false)}>Voltar</button><p>{email}</p>
                        <InputFields
                            label="Senha" name="password" value={password} type="password" placeholder="Crie sua senha"
                            onChange={(e) => setPassword(e.target.value)} />
                        <span><button type="button" onClick={onSubmit} className={styles.Cad__Login}>Esqueceu senha!</button></span>
                    </>

                )}
                {step === 0 && (
                    <Button type="button" onClick={handleClick}>Próximo</Button>
                )}
                {step === 1 && (
                    <Button type="submit" > Próximo</Button>
                )}
            </FormComponent>
        </>
    )
}