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

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

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
        try {
            const res = await fetch("/api/Login", {
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
                alert("Erro ao fazer login. Verifique suas credenciais.");
                return;
            }

            const login = await loginAuthEmail(data.email, data.password)

            if (login) {
                alert("Usuário logado com sucesso!")
            }
        } catch (error) {
            console.error("Erro ao logador usuário", error);
            alert("Erro ao tentar fazer login")
        }
    };

    return (
        <>
            <FormComponent validationSchema={selectValidationSchema} onSubmit={handleSubmit} >
                <h1 className={styles.Login__Title}>Iniciar Sessão</h1>
                <div className={styles.Content__New}>
                    <aside className={styles.Login__Description}>Ainda não tem uma conta?</aside>
                    <button type="button" className={styles.New__Login} onClick={() => setPage(true)}>Criar Conta</button>
                </div>
                <small className={styles.Login_Small_Description}>Isso levará menos de 01 minuto</small>

                {step === 0 && (
                    <InputFields type="email" value={email} name="email" placeholder="Digite seu email" 
                    onChange={(e) => setEmail(e.target.value)} />
                )}

                {step === 1 && (
                    <InputFields type="password" value={password} name="password" placeholder="Digite sua senha" 
                    onChange={(e)=> setPassword(e.target.value)}/>
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
