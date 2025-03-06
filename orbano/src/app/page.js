"use client";
import LoginFields from "./Pages/LoginFields/LoginFields/page";
import styles from "./style.module.css"
import Links from "./components/LinksLogin/page";
import RegistrationFields from "./Pages/LoginFields/RegistrationFields/page";
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
