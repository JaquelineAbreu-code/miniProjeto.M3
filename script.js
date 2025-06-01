class Profissional{
    constructor(nome, experiencia, area){
       this.id = Date.now(); // Gera um ID único baseado no timestamp atual
        this.nome = nome;
        this.experiencia = experiencia;
        this.area = area;
    }
}

const botaoAdd = document.getElementById('botao-add');
 
botaoAdd.addEventListener('click', adicionarProfissional);

const nome = document.getElementById('input-nome');
const experiencia = document.getElementById('input-experiencia');
const area = document.getElementById('area-select');
const conteinersProfissionais = document.getElementById('conteiner-profissionais');

let listaProfissional = [];

function adicionarProfissional(event){
event.preventDefault();

const novoProfissional = new Profissional( nome.value, experiencia.value, area.value );


listaProfissional.push(novoProfissional);

conteinersProfissionais.innerHTML = ''; // Limpa o conteiner antes de adicionar novos produtos

atualizarListaProfissional();

// Limpar os campos
    nome.value = '';
    experiencia.value = '';
    area.value = '';

}

function atualizarListaProfissional() {
    conteinersProfissionais.innerHTML = ''; // Limpa o contêiner antes de recriar os produtos
    
    listaProfissional.forEach((profissional) => {
        const item = document.createElement('div');
        item.classList.add('cards-produtos');

        item.innerHTML = `
            <p>Profissional: ${Profissional.nome}</p>
            <p>Experiência: ${Profissional.experiencia}</p>
            <p>Área de atuação: ${Profissional.area}</p>
            <span>
                <button onclick="editarProfissional(${Profissional.id})">Editar</button>
                <button onclick="excluirProduto(${Profissional.id})">Excluir</button>
            </span>
        `;

        conteinersProfissionais.appendChild(item);
    });
}

function excluirProfissional(id) {
    listaProfissional = listaProfissional.filter(Profissional => Profissional.id !== id);
    atualizarListaProfissional(); // Atualiza a interface
}

function editarProfissional(id) {
    const profissional = listaProfissional.find(p => p.id === id);
    
    if (profissional) {
        nome.value = profissional.nome;
        experiencia.value = profissional.experiencia;
        area.value = profissional.area;

        botaoAdd.onclick = function () {
            profissional.nome = nome.value;
            profissional.experiencia = experiencia.value;
            profissional.area = area.value;
            
            atualizarListaProfissional();
            localStorage.setItem("profissionais", JSON.stringify(listaProfissional));

            botaoAdd.onclick = adicionarProfissional; // Restaura o evento
            nome.value = '';
            experiencia.value = '';
            area.value = '';
        };
    }
}

function adicionarProfissional(event) {
    event.preventDefault();

    const novoProfissional = new Profissional(nome.value, experiencia.value, area.value);

    // Adicionar à lista de produtos
    listaProfissional.push(novoProfissional);

    // **Salvar no localStorage**
localStorage.setItem("profissionais", JSON.stringify(listaProfissional));
   
atualizarListaProfissional();

    // Limpar campos
    nome.value = '';
    experiencia.value = '';
    area.value = '';
}