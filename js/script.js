/**
 * CONCEITOS EXTRAS:
 * DOM (Document Object Model): É a representação do HTML que o JS consegue manipular.
 * Evento: Uma ação do usuário (clique, envio de form) que o JS "escuta".
 * Função: Um bloco de código que executa uma tarefa específica.
 */

// 1. Seleção de elementos do DOM
const form = document.getElementById("formViajante");
const listaContainer = document.getElementById("listaPassageiros");

// Array para armazenar os dados dos viajantes (Banco de dados temporário)
let viajantes = [];

// 2. Adição de um Evento de 'submit' (envio) no formulário
form.addEventListener("submit", function(event) {
    // Evita que a página recarregue ao clicar no botão
    event.preventDefault();

    // Captura os valores digitados nos inputs
    const nome = document.getElementById("nome").value;
    const poltrona = document.getElementById("poltrona").value;

    // 3. Lógica de Validação (Regras do Sistema)
    
    // Regra: Dados vazios ou incompletos (o 'required' no HTML já ajuda, mas aqui reforçamos)
    if (nome.trim() === "") {
        alert("Por favor, digite o nome.");
        return;
    }

    // Regra: Evitar duas pessoas na mesma cadeira
    // O método .some verifica se já existe uma poltrona com esse número no array
    const cadeiraOcupada = viajantes.some(v => v.poltrona === poltrona);
    
    if (cadeiraOcupada) {
        alert("⚠️ Erro: Esta poltrona já está reservada para outro viajante!");
        return; // Interrompe a função para não cadastrar
    }

    // Se passou nas validações, cria o objeto do novo viajante
    const novoViajante = {
        nome: nome,
        poltrona: poltrona
    };

    // Adiciona ao array e atualiza a tela
    viajantes.push(novoViajante);
    atualizarLista();
    
    // Limpa o formulário para o próximo cadastro
    form.reset();
});

// 4. Função para manipular o DOM e exibir os viajantes
function atualizarLista() {
    // Limpa a mensagem de "Nenhum viajante"
    listaContainer.innerHTML = "";

    // Percorre o array de viajantes e cria o HTML para cada um
    viajantes.forEach(function(pessoa) {
        const div = document.createElement("div");
        div.className = "card-passageiro";
        div.innerHTML = `<strong>Passageiro:</strong> ${pessoa.nome} | <strong>Poltrona:</strong> ${pessoa.poltrona}`;
        
        // Adiciona o elemento criado dentro do container da lista
        listaContainer.appendChild(div);
    });
}