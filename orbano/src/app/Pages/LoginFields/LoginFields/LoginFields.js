import InputFields from "../InputFields";
import { useValidation } from "@/hooks/resolvers/yup";
import { FormComponent } from "../FormFields";
import { useState } from "react";
import { loginAuthEmail } from "@/firebase/authEmailServices";
import { useFormContext } from "react-hook-form";

export default function LoginFields() {

    
const { getValues } = useFormContext()
    // Recebendo os dados do formulário
    const formData = getValues()

    const [step, setStep] = useState(0)

    const validationSchema = useValidation()

    const handleClick = async () => {
        const isValid = await validationSchema.isValid(formData)

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
                {
                    step >= 0 && (
                        <button type="Submit" onClick={handleClick} >
                            Próximo
                        </button>
                    )
                }
                {
                    step >= 1 && (
                        <button type="Submit">
                            Entrar
                        </button>
                    )
                }
            </FormComponent>
        </>
    )
}