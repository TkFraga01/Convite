// Inicialize o Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCkvGbo6rPQWrCxDf7vYhVg2sX6JODcty4",
    authDomain: "convite-25c33.firebaseapp.com",
    databaseURL: "https://convite-25c33-default-rtdb.firebaseio.com",
    projectId: "convite-25c33",
    storageBucket: "convite-25c33.firebasestorage.app",
    messagingSenderId: "734325609785",
    appId: "1:734325609785:web:36645c639f8f20d25444e8",
    measurementId: "G-8VBRRT77VQ"
};

// Inicialize o Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);  // Para interagir com o Realtime Database

// Carrega a lista de confirmados ao abrir o site
window.onload = function() {
    carregarListaConfirmados();
};

// Função para mostrar a mensagem personalizada
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
    const confirmadosRef = ref(database, 'confirmados');  // Ref para os confirmados no Firebase

    // Adiciona o nome no banco de dados do Firebase
    set(push(confirmadosRef), nome)
        .then(() => {
            console.log("Presença confirmada!");
        })
        .catch((error) => {
            console.error("Erro ao confirmar presença: ", error);
        });
}

// Função para carregar a lista de confirmados do Firebase
function carregarListaConfirmados() {
    const confirmadosRef = ref(database, 'confirmados');  // Ref para os confirmados no Firebase

    // Escuta em tempo real as mudanças na lista de confirmados
    onValue(confirmadosRef, (snapshot) => {
        let confirmados = snapshot.val() || [];
        let listaConfirmados = document.getElementById("listaConfirmados");
        listaConfirmados.innerHTML = ""; // Limpa a lista antes de adicionar os novos nomes

        // Adiciona os confirmados na lista
        for (let nome in confirmados) {
            let itemConfirmado = document.createElement("li");
            itemConfirmado.textContent = confirmados[nome];

            // Cria o botão de remoção
            let botaoRemover = document.createElement("button");
            botaoRemover.textContent = "Remover";
            botaoRemover.onclick = function() {
                removerPresenca(confirmados[nome]);
            };

            // Adiciona o botão ao lado do nome
            itemConfirmado.appendChild(botaoRemover);
            listaConfirmados.appendChild(itemConfirmado);
        }
    });
}

// Função para remover o nome da lista de confirmados
function removerPresenca(nome) {
    const confirmadosRef = ref(database, 'confirmados');  // Ref para os confirmados no Firebase

    // Remover o nome do Firebase
    get(confirmadosRef).then((snapshot) => {
        const confirmados = snapshot.val() || [];
        const index = confirmados.indexOf(nome);
        
        if (index > -1) {
            confirmados.splice(index, 1);  // Remove o nome da lista
            set(confirmadosRef, confirmados)  // Atualiza a lista no Firebase
                .then(() => {
                    console.log("Presença removida!");
                })
                .catch((error) => {
                    console.error("Erro ao remover presença: ", error);
                });
        }
    });
}
