// Carrega a lista de confirmados ao abrir o site
window.onload = function() {
    carregarListaConfirmados();
};

function mostrarMensagem() {
    // Recebe o valor do input do usuário
    let inputName = document.getElementById("inputName");
    let nome = inputName.value;

    // Variável para a mensagem personalizada
    let mensagem;

    // Condição para verificar o nome e atribuir a mensagem correspondente
    if (nome.toLowerCase() === "wesley") {
        mensagem = "Wesley, o convite tá feito! Vai ser demais a tua presença!";
    } else if (nome.toLowerCase() === "theilor") {
        mensagem = "Theilor, não posso esperar para te ver lá! Vai ser épico!";
    } else {
        mensagem = "Oi, " + nome + "! Você está convidado para o meu aniversário!";
    }

    // Exibe a mensagem personalizada
    document.getElementById("mensagem").textContent = mensagem;

    // Adiciona o botão de confirmação de presença
    let botaoConfirmar = document.createElement("button");
    botaoConfirmar.textContent = "Confirmar Presença";
    botaoConfirmar.onclick = function() {
        confirmarPresenca(nome);
    };
    document.getElementById("mensagem").appendChild(botaoConfirmar);

    // Limpa o input do usuário
    inputName.value = "";
}

// Função para adicionar ou remover o nome à lista de confirmados
function confirmarPresenca(nome) {
    // Adiciona ou remove o nome na lista localStorage
    let confirmados = JSON.parse(localStorage.getItem("confirmados")) || [];

    if (confirmados.includes(nome)) {
        // Se o nome já está na lista, remove ele
        confirmados = confirmados.filter(item => item !== nome);
    } else {
        // Caso contrário, adiciona o nome à lista
        confirmados.push(nome);
    }

    localStorage.setItem("confirmados", JSON.stringify(confirmados)); // Atualiza no localStorage
    carregarListaConfirmados();
}

// Função para carregar a lista de confirmados do localStorage
function carregarListaConfirmados() {
    let confirmados = JSON.parse(localStorage.getItem("confirmados")) || [];
    let listaConfirmados = document.getElementById("listaConfirmados");
    listaConfirmados.innerHTML = ""; // Limpa a lista antes de adicionar os novos nomes

    // Adiciona os confirmados na lista
    confirmados.forEach(nome => {
        let itemConfirmado = document.createElement("li");
        itemConfirmado.textContent = nome;

        // Cria o botão de remoção
        let botaoRemover = document.createElement("button");
        botaoRemover.textContent = "Remover";
        botaoRemover.onclick = function() {
            confirmarPresenca(nome); // Vai chamar a função novamente para remover
        };

        itemConfirmado.appendChild(botaoRemover);
        listaConfirmados.appendChild(itemConfirmado);
    });
}
