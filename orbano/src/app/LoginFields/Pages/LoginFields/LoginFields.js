import { useForm, FormProvider } from "react-hook-form";
import AuthFields from "../../AuthFields";
import { useState } from "react";
import { loginAuthEmail } from "@/firebase/authEmailServices";


export default function LoginFields() {
    
    const [step, setStep] = useState(0)
    const methods = useForm()

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
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onLoginSubmit)} >
                    {step >= 0 && (
                        <AuthFields
                            label="Email:"
                            maxLengh={150}
                            minLengh={8}
                            name="email"
                            placeholder="Digite seu Email"
                            required
                            pattern={/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/}
                            errorMessage="Não encontramos o registro da sua conta"
                            type="email"
                        />
                    )}
                    {step >= 1 && (
                        <AuthFields
                            label="Senha:"
                            maxLengh={20}
                            minLengh={6}
                            name="password"
                            placeholder="Digite sua senha"
                            required
                            errorMessage="Por favor, insira uma senha válida"
                            type="password"
                        />
                    )}

                    <button type="Submit" onClick={handleClick}>
                        Próximo
                    </button>
                </form>
            </FormProvider>
        </>
    )
}