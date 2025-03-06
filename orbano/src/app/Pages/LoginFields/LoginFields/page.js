import InputFields from "../InputFields/page";
import getValidationSchema from "@/hooks/resolvers/yup";
import { FormComponent } from "../FormFields/page";
import { useValidation } from "@/app/hooks/resolvers/yup";
import { FormComponent } from "../FormFields";
import Button from "@/app/components/Button/page";
import { useForm } from "react-hook-form";

export default function LoginFields() {
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

    const onLoginSubmit = async (data) => {
        try {
            const response = await fetch("@/Pages/Api/login",{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            })
            const result = await response.json()

            if(response.ok){
                alert("Usuário logado");
                console.log(result)
            }
            else{
                console.log("Erro ao logar usuário", result.error)
            }
        }
        catch (error) {
            console.log("Erro conectar com servidor", error)
        }
    }

    return (
        <>
            <FormComponent validationSchema={selectValidationSchema} onSubmit={onLoginSubmit}>
                <h1 className={styles.Login__Title}>Iniciar Sessão</h1>
                <div className={styles.Content__New}>
                    <aside className={styles.Login__Description}> Ainda não tem uma conta ?</aside>
                    <button className={styles.New__Login} >Criar Conta</button>
                </div>
                <small className={styles.Login_Small_Description}>Isso levará menos de 01 minuto</small>
                {
                    step === 0 && (
                        <InputFields
                            type="email"
                            name="email"
                            placeholder="Digite seu email"
                        />
                    )
                }
                {
                    step === 1 && (
                        <InputFields
                            type="password"
                            name="password"
                            placeholder="Digite sua senha"
                        />
                    )
                }
                {
                    step === 0 && (
                        <Button type="button" onClick={handleClick} >
                            Próximo
                        </Button>
                    )
                }
                {
                    step === 1 && (
                        <Button type="Submit">
                            Entrar
                        </Button>
                    )
                }
            </FormComponent>
        </>
    )
}