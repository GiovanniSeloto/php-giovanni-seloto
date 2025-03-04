import {  useFormContext } from "react-hook-form";

export default function AuthFields({ name, label, required, 
    errorMessage = "Campo obrigatório", pattern, minLengh, maxLengh, ...props }) {

    const { register, formState: {errors }} = useFormContext()

    return (
        <>
            <label >{label}</label>
            <input

                {...props}
                {...register(name, {
                    required: required ? errorMessage : false,
                    minLengh: minLengh ? { value: minLengh, message: `Númeor de caracteres ${minLengh} inválidas` } : undefined,
                    maxLengh: maxLengh ? { value: maxLengh, message: `Número de caracteres ${maxLengh} excedido` } : undefined,
                    pattern: pattern ? { value: pattern, message: `Caracteres inválidas` } : undefined
                })} />
                {errors[name] && (
                    <span className={styles.authSpan}>{errors[name]?.message}</span>
                )}
        </>
    )

}