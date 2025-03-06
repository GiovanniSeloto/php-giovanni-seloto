import * as yup from "yup"

export const useValidation = () => {
    /* Para configurar email apenas de um domínio
        .matches(/^[a-zA-Z0-9._%+-]+@empresa\.com$/, "Use um e-mail corporativo (@empresa.com)")*/
    return yup.object().shape({
        email: yup
            .string()
            .trim()
            .lowercase()
            .required("Preencha os campos necessários")
            .email("Não encontramos o registro de sua conta")
            .min(8)
            .max(150, "Máximo de caracteres excedido"),

        /*Para configuração de senha com determinadas credenciais
        .matches(/[\W_]/, "A senha deve conter pelo menos um caractere especial (@, #, $, etc.)"),*/
        password: yup
            .string()
            .trim()
            .required("Preencha os campos necessários")
            .min(6)
            .max(20, "Máximo de caracteres excedido")
    })
}