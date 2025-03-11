"use client";
import LoginFields from "./Pages/LoginFields/LoginFields/page";
import styles from "./style.module.css"
import Links from "./components/LinksLogin/page";
import RegistrationFields from "./Pages/LoginFields/RegistrationFields/page";

import { useState, useEffect } from "react";

export default function TwoColumns() {

  const [csrfToken, setCsrfToken] = useState("");

  useEffect(() => {
    fetch("/api/csrf")
      .then((res) => res.json())
      .then((data) => setCsrfToken(data.csrfToken))
      .catch((err) => console.error("Erro ao obter CSRF token:", err));
  }, []);

  const enviarRequisicao = async () => {
    const resposta = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRF-Token": csrfToken, // Enviando o token
      },
      body: JSON.stringify({ dado: "teste" }),
    });

    const resultado = await resposta.json();
    console.log(resultado);
  };

  return (
    <main className={styles.Content__Container}>
      <div className={styles.Content__Left}>
      </div>
      <div className={styles.Content__Right}>
        <LoginFields/>
        <Links/>
      </div>
    </main>
  );
}
