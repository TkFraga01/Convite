// Importando as funções necessárias do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getDatabase, ref, set, get } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";

// Sua configuração do Firebase
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

// Inicializando o Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Carrega a lista de confirmados ao abrir o site
window.onload = function() {
    carregarListaConfirmados();
};

// Função para mostrar a mensagem e o botão de confirmação
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
        mensagem = "Mensagem para Leandro"; // Personalize conforme necessário
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

// Função para adicionar o nome à lista de confirmados no Firebase
function confirmarPresenca(nome) {
    // Referência ao caminho onde vamos armazenar os confirmados
    const confirmadosRef = ref(database, 'confirmados/' + nome);

    // Grava o nome no banco de dados
    set(confirmadosRef, {
        nome: nome
    }).then(() => {
        console.log("Nome adicionado ao banco de dados!");
        carregarListaConfirmados(); // Atualiza a lista
    }).catch((error) => {
        console.error("Erro ao adicionar nome: ", error);
    });
}

// Função para carregar a lista de confirmados do Firebase
function carregarListaConfirmados() {
    const confirmadosRef = ref(database, 'confirmados');
    get(confirmadosRef).then((snapshot) => {
        if (snapshot.exists()) {
            const confirmado
