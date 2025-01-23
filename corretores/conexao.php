<?php
    $host = "localhost";
    $dbname = "corretores";
    $username = "root";
    $password = "";

    try{
        $conn = new PDO("mysql:host=$host;dbname=$dbname",$username, $password);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    }
    catch(PDOException $e){
        die("Erro na conexão com o banco de dados: " . $e->getMessage());
    }
?>