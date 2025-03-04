import InputFields from "../InputFields";
import { useValidation } from "@/hooks/resolvers/yup";
import { FormComponent } from "../FormFields";
import { useState } from "react";

export default function LoginFields() {

    const [step, setStep] = useState(0)

    const handleClick = () => {
        if (step < 1) setStep(step + 1);
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
            <FormComponent validationSchema={useValidation} onSubmit={onLoginSubmit}>
                {
                    step >= 0 && (
                        <InputFields
                            label="Email"
                            type="email"
                            name="email"
                            placeholder="Digite seu email"
                        />
                    )
                }
                {
                    step >= 1 && (
                        <InputFields
                            label="Senha"
                            type="password"
                            name="password"
                            placeholder="Digite sua senha"
                        />
                    )
                }
                <button type="Submit" onClick={handleClick} >
                    Próximo
                </button>
            </FormComponent>
        </>
    )
}