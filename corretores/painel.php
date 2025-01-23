<?php
    include('conexao.php');

    $sql = "SELECT * FROM Corretores ORDER BY id DESC";

    $result = $conn->query($sql);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Corretores</title>
    <link rel="stylesheet" href="style.painel.css">
</head>
<body>
    <section>
        <table>
            <h1>Corretores Cadastrados</h1>
            <thead>
                <th>#</th>
                <th>Nome</th>
                <th>CPF</th>
                <th>Creci</th>
                <th>Editar</th>
                <th>Excluir</th>
            </thead>
            <tbody>
                <?php
                    foreach($result as $row){
                        echo "<tr>";
                        echo "<td>".$row['Id']."</td>";
                        echo "<td>".$row['Name']."</td>";
                        echo "<td>".$row['Cpf']."</td>";
                        echo "<td>".$row['Creci']."</td>";
                        echo "<td> <Button>Editar</Button></td>";
                        echo "<td> <Button>Excluir</Button></td>";
                    }
                ?>
            </tbody>
        </table>
    </section>
</body>
</html>