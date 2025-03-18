"use client";
import LoginFields from "./LoginFields/page";
import styles from "./style.module.css";
import Links from "./components/LinksLogin/page";
import { useState, useEffect } from "react";
import RegistrationFields from "./RegistrationFields/page";

export default function TwoColumns() {
  const [csrfToken, setCsrfToken] = useState("");
  const [page, setPage] = useState(false)

  // Pega o token CSRF na inicialização
  useEffect(() => {
    fetch("/api/Csrf")
      .then((res) => res.json())
      .then((data) => {
        console.log("Token CSRF recebido:", data.csrfToken);
        setCsrfToken(data.csrfToken);
      })
      .catch((error) => {
        console.error("Erro ao buscar token CSRF", error);
      });
  }, []);

  return (
    <main className={styles.Content__Container}>
      <div className={styles.Content__Left}></div>
      <div className={styles.Content__Right}>
        {page ? <RegistrationFields setPage={setPage}/> : <LoginFields csrfToken={csrfToken} setPage={setPage}/> }
        {/* <LoginFields /> */}
        {/* Desabilita o botão enquanto o CSRF Token não estiver carregado */}
        {/* <button > 
          Enviar 
        </button> */}
        <Links />
      </div>
    </main>
  );
}
