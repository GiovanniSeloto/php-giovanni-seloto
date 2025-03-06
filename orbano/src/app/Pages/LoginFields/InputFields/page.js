import { useFormContext } from "react-hook-form";
import styles from "./style.module.css"

export default function InputFields({ type,name, label, ...reset }) {

    const { register, formState: { errors } } = useFormContext()

    return (
        <>
            <input
                className={styles.Input__Fields}
                type={type}
                {...register(name)} 
                {...reset}
            />
            {errors[name] && <p className={styles.Error__Mensage}> {errors[name].message} </p>}
        </>
    )

}