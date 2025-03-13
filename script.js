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
        mensagem = "Irmão, eu nem precisaria dizer o quanto quero que tu vá né. Vamos curtir o final de semana e mais ainda o domingo! Ah e não esquece da Victória, ela também está convidada.";
    } else if (nome.toLowerCase() === "leandro") {
        mensagem = ""
    }
        
    

    // Exibe a mensagem personalizada
    document.getElementById("mensagem").textContent = mensagem;

    // Limpa o input do usuário
    inputName.value = "";
}
