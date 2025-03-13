function mostrarMensagem() {
    // Recebe o valor do input do usuário
    let inputName = document.getElementById("inputName");
    let nome = inputName.value;

    // Variável para a mensagem personalizada
    let mensagem;

    // Condição para verificar o nome e atribuir a mensagem correspondente
    if (nome.toLowerCase() === "wesley") {
        mensagem = "Eae Sor, como vai? Se tu tiver disposição e vontade pra comparecer nesse dia, seria incrível! Do contrário, relaxa e nem se apega!";
    } else if (nome.toLowerCase() === "theilor") {
        mensagem = "Theilor, não posso esperar para te ver lá! Vai ser épico!";
    } else if (nome.toLowerCase() === "leandro") {
        mensagem = ""
    }
        
    

    // Exibe a mensagem personalizada
    document.getElementById("mensagem").textContent = mensagem;

    // Limpa o input do usuário
    inputName.value = "";
}
