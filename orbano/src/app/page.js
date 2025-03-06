"use client";
<<<<<<< HEAD
import LoginFields from "./Pages/LoginFields/LoginFields/page";
import styles from "./style.module.css"
import Links from "./components/LinksLogin/page";
import RegistrationFields from "./Pages/LoginFields/RegistrationFields/page";
=======
import LoginFields from "./Pages/LoginFields/LoginFields/route"
import styles from "./style.module.css"
import Links from "./components/LinksLogin/reoute";

>>>>>>> main
export default function TwoColumns() {
  return (
    <main className={styles.Content__Container}>
      <div className={styles.Content__Left}>
      </div>
      <div className={styles.Content__Right}>
        <RegistrationFields/>
        <Links/>
      </div>
    </main>
  );
}
