import InputFields from "@/app/components/InputFields/page";
import getValidationSchema from "@/app/hooks/resolvers/route";
import { FormComponent } from "@/app/FormFields/page";
import styles from "./style.module.css";
import Button from "@/app/components/Button/page";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { loginAuthEmail } from "@/app/firebase/authEmailServices";

export default function LoginFields({ csrfToken, setPage }) {

    const [step, setStep] = useState(0);
    const { getValues } = useForm();
    const selectValidationSchema = getValidationSchema(step)
    const [user, setUser] = useState('')
    const [senha, setSenha] = useState('')

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
        const email = user;  // Pega os dados do formulário (substituir pelo estado)
        const password = senha; // Pega os dados do formulário (substituir pelo estado)

        const login = await loginAuthEmail(data.email, data.password)

        try {
            if (login) {
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
                    <button type="button" className={styles.New__Login} onClick={()=> setPage(true)}>Criar Conta</button>
                </div>
                <small className={styles.Login_Small_Description}>Isso levará menos de 01 minuto</small>

                {step === 0 && (
                    <InputFields type="email" value={user} name="email" placeholder="Digite seu email" onChange={(e) => setUser(e.target.value)} />
                )}

                {step === 1 && (
                    <InputFields type="password" name="password" placeholder="Digite sua senha" />
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
