"use client";
import LoginFields from "../app/Pages/LoginFields/LoginFields/LoginFields"
import styles from "./style.module.css"
import Links from "./components/LinksLogin/Links";

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
