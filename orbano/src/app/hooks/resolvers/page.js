import * as yup from "yup"

const getValidationSchema = (step) => {
    if (step === 0) {
         yup.object().shape({
            /* Para configurar email apenas de um domínio
                .matches(/^[a-zA-Z0-9._%+-]+@empresa\.com$/, "Use um e-mail corporativo (@empresa.com)")*/
            email: yup
                .string()
                .required("Preencha os campos necessários")
                .trim()
                .min(5)
                .max(150, "Máximo de caracteres excedido"),
        });
    }
    if (step === 1) {
         yup.object().shape({
            /*Para configuração de senha com determinadas credenciais
            .matches(/[\W_]/, "A senha deve conter pelo menos um caractere especial (@, #, $, etc.)"),*/
            password: yup
                .string()
                .required("Preencha os campos necessários")
                .min(6)
                .max(20, "Máximo de caracteres excedido")
        })
    }
    return yup.object()
}

export default getValidationSchema