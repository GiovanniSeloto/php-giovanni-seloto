"use client"

import { useForm, FormProvider } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

export const FormComponent = ({ children, validationSchema, onSubmit }) => {
    const methods = useForm({
        resolver: yupResolver(validationSchema)
    })

    return(
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                {children}
            </form>
        </FormProvider>
    )
}