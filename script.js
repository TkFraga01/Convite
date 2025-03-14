function mostrarMensagem() {
    // Recebe o valor do input do usuário
    let inputName = document.getElementById("inputName");
    let nome = inputName.value;

    // Verifica se o campo de nome está vazio
    if (nome.trim() === "") {
        alert("Por favor, digite o seu nome!");
        return; // Impede que a mensagem seja exibida sem um nome válido
    }

    // Variável para a mensagem personalizada
    let mensagem;

    // Condição para verificar o nome e atribuir a mensagem correspondente
    if (nome.toLowerCase() === "wesley") {
        mensagem = "Eae Sor, como vai? Gostaria bastante que tu comparecesse, pra conversar um pouco e curtir a natureza. Mas se não rolar eu entendo, sem pressão, relaxa!";
    } else if (nome.toLowerCase() === "theilor") {
        mensagem = "Irmão, eu nem precisaria dizer o quanto quero que tu vá né. Vamos curtir o final de semana e mais ainda o domingo! Ah e não esquece da Victória, ela também está convidada.";
    } else if (nome.toLowerCase() === "leandro") {
        mensagem = "Então pai, vamos curtir o domingão? Leva umas birita pra gente ficar todo torto hahahaha.";
    } else if (nome.toLowerCase() === "eliane") {
        mensagem = "Mãe, bora aproveitar o domingão e esquecer um pouco o trabalho e estudos. Vai ser bem bom!";
    } else if (nome.toLowerCase() === "daniel") {
        mensagem = "Eae meu, como tá? Bora lá pra vó confraternizar e relaxar no final de semana? Vai ser top demais!";
    } else if (nome.toLowerCase() === "cristiane") {
        mensagem = "Enfim eu decidi reunir o pessoal no meu aniversário hein? Se quiserem ir, estão convidados. Vai ser bem legal, principalmente se todos estiverem reunidos!";
    } else if (nome.toLowerCase() === "davi") {
        mensagem = "Davizera, bora curtir no mato mermão! Vai ser muito tri se tu for lá nessa data, depois de tempos sem a gente aproveitar uma zoeira e beber.";
    } else if (nome.toLowerCase() === "matheus") {
        mensagem = "Oh meu, bora lá comer uma comida gostosa e curtir o domingão! Vai ser dahora demais um almoção lá na vó!";
    } else if (nome.toLowerCase() === "jonatam") {
        mensagem = "Opa, como vai? Bora curitr um domingo no interior? Comer algo gostoso (lá ele) e relaxar com a galera!";
    } else if (nome.toLowerCase() === "roger") {
        mensagem = "Roooogeerrrr, meu camarada! Bora chapar o galo, comer uma comida bem boa e aproveitar a tranquilidade do interior? Gostaria da tua presença nessa data especial!";
    } else if (nome.toLowerCase() === "fernanda") {
        mensagem = "Oi Fê, tudo belezinha? Seguinte, bora lá na vó curtir um tuts tuts com o pessoal? Só não esquece de levar o Leandrinho e o Antônio hein hahahaha";
    } else if (nome.toLowerCase() === "raissa") {
        mensagem = "O que acha da gente observar a lua de novo? A vista da garagem é muito bonita hahaha. E no domingo vamo se enlouquecer de caipirinha e se enpanturrar de comida.";
    } else {
        mensagem = "Você não está convidado(a)!";
    }

    // Exibe a mensagem personalizada
    document.getElementById("mensagem").textContent = mensagem;

    // Limpa o input do usuário
    inputName.value = "";
}
