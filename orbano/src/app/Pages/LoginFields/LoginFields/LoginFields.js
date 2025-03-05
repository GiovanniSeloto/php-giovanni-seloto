import InputFields from "../InputFields/InputFields";
import { useValidation } from "@/hooks/resolvers/yup";
import { FormComponent } from "../FormFields";
import { useState } from "react";
import { loginAuthEmail } from "@/firebase/authEmailServices";
import styles from "./style.module.css"
import Button from "@/app/components/Button/button";

export default function LoginFields() {
    const [step, setStep] = useState(0)

    const validationSchema = useValidation()

    const handleClick = async () => {

        if (isValid && step <= 1) {
            setStep(step + 1);
        }
        else {
            console.log("Erro na validação")
        }
    }

    const onLoginSubmit = async (data) => {
        try {
            await loginAuthEmail(data.email, data.password)
            alert("Usuário logado")
            console.log(data)
        }
        catch (error) {
            console.log("Erro ao logar usuário", error)
        }
    }

    return (
        <>
            <FormComponent validationSchema={validationSchema} onSubmit={onLoginSubmit}>
                <h1 className={styles.Login__Title}>Iniciar Sessão</h1>
                <div className={styles.Content__New}> 
                    <aside className={styles.Login__Description}> Ainda não tem uma conta ?</aside>
                    <button className={styles.New__Login}>Criar Conta</button>
                </div>
                <small className={styles.Login_Small_Description}>Isso levará menos de 01 minuto</small>
                {
                    step >= 0 && (
                        <InputFields
                            type="email"
                            name="email"
                            placeholder="Digite seu email"
                        />
                    )
                }
                {
                    step >= 1 && (
                        <InputFields
                            type="password"
                            name="password"
                            placeholder="Digite sua senha"
                        />
                    )
                }
                {
                    step >= 0 && (
                        <Button type="Submit" onClick={handleClick} >
                            Próximo
                        </Button>
                    )
                }
                {
                    step >= 1 && (
                        <Button type="Submit">
                            Entrar
                        </Button>
                    )
                }
            </FormComponent>
        </>
    )
}