import { useForm, FormProvider } from "react-hook-form";
import AuthFields from "../../AuthFields";
import { createAuthEmail } from "@/firebase/authEmailServices";

export default function LoginFields() {

    const methods = useForm()

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
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onCreateSubmit)}>
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
                    <button type="Submit">
                        Próximo
                    </button>
                </form>
            </FormProvider>
        </>
    )
}