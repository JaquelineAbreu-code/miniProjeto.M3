class Produto{
    constructor(nome,descricao, valor, imagem){
       this.id = Date.now(); // Gera um ID único baseado no timestamp atual
        this.nome = nome;
        this.descricao = descricao;
        this.valor = valor;
        this.imagem = imagem;
    }
}

const botaoAdd = document.getElementById('botao-add');
 
botaoAdd.addEventListener('click', adicionarProduto);

const nome = document.getElementById('input-nome');
const descricao = document.getElementById('input-descricao');
const valor = document.getElementById('input-valor');
const imagem = document.getElementById('image-select');
const conteinerProdutos = document.getElementById('conteiner-products');

const listaProdutos = [];

function adicionarProduto(event){
event.preventDefault();

const novoProduto = new Produto( nome.value, descricao.value, valor.value, imagem.value);


listaProdutos.push(novoProduto);

conteinerProdutos.innerHTML = ''; // Limpa o conteiner antes de adicionar novos produtos

atualizarListaProdutos();

// Limpar os campos
    nome.value = '';
    descricao.value = '';
    valor.value = '';
    imagem.value = '';

}

atualizarListaProdutos.forEach((produto) =>{
    const item =  document.createElement('div');

    item.classList.add('cards-produtos');

    item.innerHTML = `
    <p>Nome: ${produto.nome}</p>
    <p>Descricao: ${produto.descricao}</p>
    <p>Valor: ${produto.valor}</p>
    <img src="${produto.imagem} alt=${produto.nome}">
    <span>
    <button onclick=" editarProduto(${produto.id})">Editar</button>
    <button onclick=" excluirProduto(${produto.id})">Excluir</button>
    </span>
    `;
    conteinerProdutos.appendChild(item);
});

function excluirProduto(id) {
    listaProdutos = listaProdutos.filter(produto => produto.id !== id);
    atualizarListaProdutos(); // Atualiza a interface
}

function editarProduto(id) {
    const produto = listaProdutos.find(produto => produto.id === id);
    if (produto) {
        // Preencher os inputs com os valores atuais
        nome.value = produto.nome;
        descricao.value = produto.descricao;
        valor.value = produto.valor;
        imagem.value = produto.imagem;
        
        // Remover o produto antigo para evitar duplicações ao salvar
        listaProdutos = listaProdutos.filter(produto => produto.id !== id);
        atualizarListaProdutos();
    }
}