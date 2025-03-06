"use client";
import LoginFields from "./Pages/LoginFields/LoginFields/route"
import styles from "./style.module.css"
import Links from "./components/LinksLogin/reoute";

export default function TwoColumns() {
  return (
    <main className={styles.Content__Container}>
      <div className={styles.Content__Left}>
      </div>
      <div className={styles.Content__Right}>
        <LoginFields />
        <Links/>
      </div>
    </main>
  );
}
