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
                    />
                    <AuthFields
                    />
                    <button type="Submit">
                        Próximo
                    </button>
                </form>
            </FormProvider>
        </>
    )
}