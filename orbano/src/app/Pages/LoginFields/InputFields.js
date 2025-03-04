import { useFormContext } from "react-hook-form";

export default function InputFields({ type,name, label, ...reset }) {

    const { register, formState: { errors } } = useFormContext()

    return (
        <>
            <label >{label}</label>
            <input
                type={type}
                {...register(name)} 
                {...reset}
            />
            {errors[name] && <p> {errors[name].message} </p>}
        </>
    )

}