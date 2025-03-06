import InputFields from "../InputFields/page";
import { createAuthEmail } from "@/firebase/authEmailServices";
import { FormComponent } from "../FormFields/page";
import { useForm } from "react-hook-form";
import { useState } from "react";
import getValidationSchema from "@/hooks/resolvers/yup";
import Button from "@/app/components/Button/page";

export default function RegistrationFields() {

    const [step, setStep] = useState(0)
    const { getValues } = useForm()
    const selectValidationSchema = getValidationSchema(step);

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
                <h1>Bem-Vindo(a)</h1>
                <span><button>Esqueceu senha!</button></span>
                {
                    step === 0 && (
                        <InputFields
                            label="Email"
                            name="email"
                            type="email"
                        />
                    )
                }
                {
                    step === 1 && (
                        <InputFields
                            label="Senha"
                            name="password"
                            type="password"
                        />
                    )
                    
                }
                {
                    step === 0 && (
                        <Button type="button" onClick={handleClick}>
                            Próximo
                        </Button>
                    )
                }
                {
                    step === 1 && (
                        <Button type="Submit">
                            Próximo
                        </Button>
                    )
                }
            </FormComponent>
        </>
    )
}