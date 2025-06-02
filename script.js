class Profissional {
    constructor(nome, experiencia, area) {
        this.id = Date.now();
        this.nome = nome;
        this.experiencia = experiencia;
        this.area = area;
    }
}

const nome = document.getElementById('input-nome');
const experiencia = document.getElementById('input-experiencia');
const area = document.getElementById('area-select');
const botaoAdd = document.getElementById('botao-add');
const botaoSalvar = document.getElementById('botao-salvar');

// Recupera dados do localStorage ou inicia com lista vazia
let listaProfissional = JSON.parse(localStorage.getItem("profissionais")) || [];

// Verifica se estamos editando (ID armazenado no localStorage)
let editandoId = localStorage.getItem("editando");

if (editandoId) {
    // Se estiver editando, mostra botão "Salvar" e esconde "Adicionar"
    botaoAdd.style.display = "none";
    botaoSalvar.style.display = "inline-block";

    const profissional = listaProfissional.find(p => p.id == editandoId);

    if (profissional) {
        nome.value = profissional.nome;
        experiencia.value = profissional.experiencia;
        area.value = profissional.area;
    }
}

// Adiciona novo profissional
botaoAdd.addEventListener("click", () => {
    if (!nome.value || !experiencia.value || !area.value) {
        alert("Preencha todos os campos!");
        return;
    }

    const novo = new Profissional(nome.value, experiencia.value, area.value);
    listaProfissional.push(novo);

    localStorage.setItem("profissionais", JSON.stringify(listaProfissional));

    nome.value = "";
    experiencia.value = "";
    area.value = "";

    alert("Profissional cadastrado!");
});

// Salva alterações ao editar
botaoSalvar.addEventListener("click", () => {
    const index = listaProfissional.findIndex(p => p.id == editandoId);
    if (index !== -1) {
        listaProfissional[index].nome = nome.value;
        listaProfissional[index].experiencia = experiencia.value;
        listaProfissional[index].area = area.value;

        localStorage.setItem("profissionais", JSON.stringify(listaProfissional));
        localStorage.removeItem("editando");

        alert("Alterações salvas!");
        window.location.href = "dashboard.html";
    }
});