// Importa as funções necessárias do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getDatabase, ref, set, onValue, remove } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";

// Configuração do Firebase
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

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Função para exibir a mensagem de convite personalizada
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
    } else {
        mensagem = `Oi, ${nome}! Você está convidado para o meu aniversário!`;
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
    const confirmadosRef = ref(database, 'confirmados/' + nome);

    // Grava o nome do convidado no Firebase
    set(confirmadosRef, {
        nome: nome
    }).then(() => {
        carregarListaConfirmados();
    });
}

// Função para carregar a lista de confirmados do Firebase
function carregarListaConfirmados() {
    const confirmadosRef = ref(database, 'confirmados');
    const listaConfirmados = document.getElementById("listaConfirmados");
    listaConfirmados.innerHTML = ""; // Limpa a lista antes de adicionar os novos nomes

    // Escuta as mudanças no Firebase em tempo real
    onValue(confirmadosRef, (snapshot) => {
        const data = snapshot.val();
        if (data) {
            for (const key in data) {
                const nome = data[key].nome;
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
            }
        }
    });
}

// Função para remover o nome da lista de confirmados
function removerPresenca(nome) {
    const confirmadosRef = ref(database, 'confirmados/' + nome);

    // Remove o nome da lista no Firebase
    remove(confirmadosRef).then(() => {
        carregarListaConfirmados();
    });
}

// Carrega a lista de confirmados ao abrir o site
window.onload = function() {
    carregarListaConfirmados();
};
