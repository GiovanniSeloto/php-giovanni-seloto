import InputFields from "../InputFields/page";
import getValidationSchema from "@/app/hooks/resolvers/yup";
import { FormComponent } from "../FormFields/page";
import styles from "./style.module.css";
import Button from "@/app/components/Button/page";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function LoginFields() {
    const [step, setStep] = useState(0);
    const { getValues } = useForm();
    const selectValidationSchema = getValidationSchema(step);

    const handleClick = async () => {
        try {
            const formData = getValues();
            await selectValidationSchema.validate(formData, { abortEarly: false });

            if (step <= 1) setStep(step + 1);
        } catch (error) {
            console.log("Erro na validação", error.errors);
        }
    };

    const getCsrfToken = async () => {
        try {
            const response = await fetch("/api/Csrf"); // Certifique-se de que a URL está correta
            if (!response.ok) {
                throw new Error("Falha ao obter token CSRF");
            }
            const data = await response.json();
            return data.csrfToken;
        } catch (error) {
            console.error("Erro ao obter token CSRF:", error);
        }
    };
    

    const onLoginSubmit = async (data) => {
        try {
            const csrfToken = await getCsrfToken();  // Obtém o CSRF token

            const response = await fetch("/api/Login", {
                method: "POST",  // Usando POST
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRF-Token": csrfToken,  // Envia o CSRF token no cabeçalho
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                const errorResult = await response.json();
                console.error("Erro na API:", errorResult.error);
                return;
            }

            const result = await response.json();
            console.log("Login bem-sucedido:", result);
            alert("Usuário logado");
        } catch (error) {
            console.error("Erro de conexão com a API:", error);
        }
    };

    return (
        <>
            <FormComponent validationSchema={selectValidationSchema} onSubmit={onLoginSubmit}>
                <h1 className={styles.Login__Title}>Iniciar Sessão</h1>
                <div className={styles.Content__New}>
                    <aside className={styles.Login__Description}>Ainda não tem uma conta?</aside>
                    <button className={styles.New__Login}>Criar Conta</button>
                </div>
                <small className={styles.Login_Small_Description}>Isso levará menos de 01 minuto</small>

                {step === 0 && (
                    <InputFields type="email" name="email" placeholder="Digite seu email" />
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
