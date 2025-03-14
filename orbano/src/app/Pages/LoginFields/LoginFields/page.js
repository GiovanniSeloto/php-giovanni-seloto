import InputFields from "../InputFields/page";
import getValidationSchema from "@/app/hooks/resolvers/route";
import { FormComponent } from "../FormFields/page";
import styles from "./style.module.css";
import Button from "@/app/components/Button/page";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { loginAuthEmail } from "@/app/firebase/authEmailServices";

export default function LoginFields({ csrfToken }) {

    const [step, setStep] = useState(0);
    const { getValues } = useForm();
    const selectValidationSchema = getValidationSchema(step)
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const handleClick = async () => {
        try {
            const formData = getValues();
            await selectValidationSchema.validate(formData, { abortEarly: true });

            if (step <= 0) setStep(step + 1);
        } catch (error) {
            console.log("Erro na validação", error.errors);
        }
    };

    const handleSubmit = async (data) => {
        const email = email;  // Pega os dados do formulário (substituir pelo estado)
        const password = password; // Pega os dados do formulário (substituir pelo estado)

        try {
            if (await loginAuthEmail(data.email, data.password)) {
                alert("Usuário logado")
                const res = await fetch("/api/Login", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "CSRF-Token": csrfToken, // Inclui o token CSRF na requisição
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    }),
                });
                const data = await res.json();
                console.log("Resposta da API:", data);
            }
        }
        catch (error) {
            console.error("Erro ao logar usuário", error)
        }
    };

    return (
        <>
            <FormComponent validationSchema={selectValidationSchema} onSubmit={handleSubmit} >
                <h1 className={styles.Login__Title}>Iniciar Sessão</h1>
                <div className={styles.Content__New}>
                    <aside className={styles.Login__Description}>Ainda não tem uma conta?</aside>
                    <button className={styles.New__Login}>Criar Conta</button>
                </div>
                <small className={styles.Login_Small_Description}>Isso levará menos de 01 minuto</small>

                {step === 0 && (
                    <InputFields type="email" value={email} name="email" placeholder="Digite seu email" onChange={(e) => { }} />
                )}

                {step === 1 && (
                    <InputFields type="password" value={password} name="password" placeholder="Digite sua senha" onChange={(e) => { }} />
                )}
                {step === 0 && (
                    <Button type="button" onClick={handleClick}>
                        Próximo
                    </Button>
                )}
                {step === 1 && (
                    <Button type="Submit">
                        Entrar
                    </Button>
                )}
            </FormComponent>
        </>
    );
}
