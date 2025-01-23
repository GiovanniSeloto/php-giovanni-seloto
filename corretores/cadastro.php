<?php
    require('conexao.php');

    if(isset($_POST['name'],$_POST['cpf'],$_POST['creci'] )){

        $name = trim($_POST['name']);
        $cpf = trim($_POST['cpf']);
        $creci = trim($_POST['creci']);

        if(strlen($name) == 0){
            echo "Digite seu nome";
        }
        else if(strlen($cpf) < 11 || strlen($cpf) > 12){
            echo "Digite um CPF válido";
        }
        else if(strlen($creci) < 6 || strlen($creci) > 7){
            echo "Digite uma Creci válida";
        }

    $stmt = $conn->prepare(
        "INSERT INTO `Corretores` (`Name`, `Cpf`, `Creci`)
        VALUES (:Name, :Cpf, :Creci)"
    );

    $stmt->bindParam(':Name', $name);
    $stmt->bindParam(':Cpf', $cpf);
    $stmt->bindParam(':Creci',$creci);

    if($stmt->execute()){
        header("Location: painel.php");
    }
    else{
        echo "Erro ao realizar cadastro de corretor: " .$stmt->errorinfo()[2]; 
    }
    }
?>