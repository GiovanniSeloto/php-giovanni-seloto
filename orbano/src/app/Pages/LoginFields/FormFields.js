import { useForm, FormProvider } from "react-hook-form";
import { useValidation } from "@/hooks/resolvers/yup";

export const FormComponent = ({ children, validationSchema, onSubmit }) => {
    const methods = useForm({
        resolver: useValidation(validationSchema)
    })

    return(
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                {children}
            </form>
        </FormProvider>
    )
}