import Link from "next/link"
import styles from "./style.module.css"

export default function Links(){
    return(
        <div className={styles.Content__Link}>
            <Link className={styles.Link} href="./*">Aviso Legal</Link>
            <Link className={styles.Link} href="./*">Política de Privacidade</Link>
            <Link className={styles.Link} href="./*">Alterar Regiões</Link>
        </div>
    )
}