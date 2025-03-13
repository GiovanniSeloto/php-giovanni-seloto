"use client";
import LoginFields from "./pages/LoginFields/LoginFields/page";
import styles from "./style.module.css";
import Links from "./components/LinksLogin/page";
import { useState, useEffect } from "react";

export default function TwoColumns() {
  const [csrfToken, setCsrfToken] = useState("");

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

  // Função de envio do formulário
  const handleSubmit = async () => {
    const email = "gio@gmail.com";  // Pega os dados do formulário (substituir pelo estado)
    const password = "123456";        // Pega os dados do formulário (substituir pelo estado)
  
    const res = await fetch("/api/Login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "CSRF-Token": csrfToken, // Inclui o token CSRF na requisição
      },
      body: JSON.stringify({
        email: email,
        password: password
      }),
    });
  
    const data = await res.json();
    console.log("Resposta da API:", data);
  };
  

  return (
    <main className={styles.Content__Container}>
      <div className={styles.Content__Left}></div>
      <div className={styles.Content__Right}>
        <LoginFields />
        {/* Desabilita o botão enquanto o CSRF Token não estiver carregado */}
        <button onClick={handleSubmit} > 
          Enviar 
        </button>
        <Links />
      </div>
    </main>
  );
}
