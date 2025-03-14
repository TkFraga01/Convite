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

// Função para adicionar o nome à lista de confirmados
function confirmarPresenca(nome) {
    // Adiciona o nome na lista localStorage
    let confirmados = JSON.parse(localStorage.getItem("confirmados")) || [];

    // Verifica se o nome já está na lista
    if (!confirmados.includes(nome)) {
        confirmados.push(nome);
        localStorage.setItem("confirmados", JSON.stringify(confirmados)); // Atualiza no localStorage
        carregarListaConfirmados();
    }
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
            removerPresenca(nome);
        };

        // Adiciona o botão ao lado do nome
        itemConfirmado.appendChild(botaoRemover);
        listaConfirmados.appendChild(itemConfirmado);
    });
}

// Função para remover o nome da lista de confirmados
function removerPresenca(nome) {
    let confirmados = JSON.parse(localStorage.getItem("confirmados")) || [];

    // Remove o nome da lista
    confirmados = confirmados.filter(item => item !== nome);

    // Atualiza o localStorage e recarrega a lista
    localStorage.setItem("confirmados", JSON.stringify(confirmados));
    carregarListaConfirmados();
}
