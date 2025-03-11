import InputFields from "../InputFields/page";
import getValidationSchema from "@/app/hooks/resolvers/page";
import { FormComponent } from "../FormFields/page";
import styles from "./style.module.css";
import Button from "@/app/components/Button/page";
import { useForm } from "react-hook-form";
import { useState } from "react";
import Login from "@/app/Api/Login/route";

export default function LoginFields() {
    const [step, setStep] = useState(0);
    const { getValues } = useForm();
    const selectValidationSchema = getValidationSchema(step)

    const handleClick = async () => {
        try {
            const formData = getValues();
            await selectValidationSchema.validate(formData, { abortEarly: true });

            if (step <= 0) setStep(step + 1);
        } catch (error) {
            console.log("Erro na validação", error.errors);
        }
    };
    
    const onLoginSubmit = async (data) => {
        try{

        }
        catch{

        }
    }

    return (
        <>
            <FormComponent validationSchema={selectValidationSchema} onSubmit={Login}>
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
