import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getDatabase, ref, set, get, child, update } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-database.js";

// Configuração do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCkvGbo6rPQWrCxDf7vYhVg2sX6JODcty4",
  authDomain: "convite-25c33.firebaseapp.com",
  databaseURL: "https://convite-25c33-default-rtdb.firebaseio.com",
  projectId: "convite-25c33",
  storageBucket: "convite-25c33.appspot.com",
  messagingSenderId: "734325609785",
  appId: "1:734325609785:web:36645c639f8f20d25444e8",
  measurementId: "G-8VBRRT77VQ"
};

// Inicializando o Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Carregar a lista de confirmados ao abrir a página
window.onload = function() {
    carregarListaConfirmados();
};

function mostrarMensagem() {
    let inputName = document.getElementById("inputName");
    let nome = inputName.value;

    let mensagem;

    if (nome.toLowerCase() === "wesley") {
        mensagem = "Eae Sor, como vai? Se tu tiver disposição e vontade pra comparecer nesse dia, seria incrível! Do contrário, relaxa e nem se apega!";
    } else if (nome.toLowerCase() === "theilor") {
        mensagem = "Irmão, eu nem precisaria dizer o quanto quero que tu vá né. Vamos curtir o final de semana e mais ainda o domingo! Ah e não esquece da Victória, ela também está convidada.";
    } else if (nome.toLowerCase() === "leandro") {
        mensagem = "Leandro, vai ser massa te ver! Confirma tua presença!";
    } else {
        mensagem = `Oi, ${nome}! Você está convidado para o meu aniversário!`;
    }

    document.getElementById("mensagem").textContent = mensagem;

    let botaoConfirmar = document.createElement("button");
    botaoConfirmar.textContent = "Confirmar Presença";
    botaoConfirmar.onclick = function() {
        confirmarPresenca(nome);
    };

    document.getElementById("mensagem").appendChild(botaoConfirmar);
    inputName.value = "";
}

function confirmarPresenca(nome) {
    // Adicionando na lista de confirmados no Firebase Realtime Database
    const confirmadosRef = ref(database, 'confirmados/');
    get(confirmadosRef).then((snapshot) => {
        let confirmados = snapshot.exists() ? snapshot.val() : [];

        if (!confirmados.includes(nome)) {
            confirmados.push(nome);

            // Atualizando no Firebase
            update(confirmadosRef, {
                [nome]: true,
            }).then(() => {
                // Atualiza a lista no front-end depois de confirmar no Firebase
                carregarListaConfirmados();
            }).catch((error) => {
                console.error("Erro ao atualizar o Firebase: ", error);
            });
        }
    });
}

function carregarListaConfirmados() {
    const listaConfirmados = document.getElementById("listaConfirmados");
    listaConfirmados.innerHTML = ""; // Limpa a lista antes de adicionar os novos nomes

    const confirmadosRef = ref(database, 'confirmados/');
    get(confirmadosRef).then((snapshot) => {
        if (snapshot.exists()) {
            let confirmados = snapshot.val();
            for (let nome in confirmados) {
                let itemConfirmado = document.createElement("li");
                itemConfirmado.textContent = nome;

                let botaoRemover = document.createElement("button");
                botaoRemover.textContent = "Remover";
                botaoRemover.onclick = function() {
                    removerPresenca(nome);
                };

                itemConfirmado.appendChild(botaoRemover);
                listaConfirmados.appendChild(itemConfirmado);
            }
        }
    });
}

function removerPresenca(nome) {
    const confirmadosRef = ref(database, 'confirmados/');
    get(confirmadosRef).then((snapshot) => {
        if (snapshot.exists()) {
            let confirmados = snapshot.val();
            delete confirmados[nome];
            update(confirmadosRef, confirmados); // Atualiza o Firebase sem o nome removido
            carregarListaConfirmados();
        }
    });
}
