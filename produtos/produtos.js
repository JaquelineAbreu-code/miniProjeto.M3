// Recupera os produtos do localStorage
let listaProdutos = JSON.parse(localStorage.getItem("produtos")) || [];

const conteinerProdutos = document.getElementById("conteiner-products");

// Função para exibir produtos na página
function exibirProdutos() {
    conteinerProdutos.innerHTML = ''; // Limpa o contêiner antes de adicionar os produtos

    listaProdutos.forEach((produto) => {
        const item = document.createElement('div');
        item.classList.add('cards-produtos');

        item.innerHTML = `
            <p>Nome: ${produto.nome}</p>
            <p>Descrição: ${produto.descricao}</p>
            <p>Valor: R$ ${produto.valor}</p>
            <img src="${produto.imagem}" alt="${produto.nome}">
            <span>
                <button onclick="editarProduto(${produto.id})">Editar</button>
                <button onclick="excluirProduto(${produto.id})">Excluir</button>
            </span>
        `;

        conteinerProdutos.appendChild(item);
    });
}

// **Chamar a função ao carregar a página**
exibirProdutos();