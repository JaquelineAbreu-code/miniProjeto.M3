const conteiner = document.getElementById("conteiner-profissionais");
let listaProfissional = JSON.parse(localStorage.getItem("profissionais")) || [];

function atualizarDashboard() {
    conteiner.innerHTML = "";

    listaProfissional.forEach((prof) => {
        const card = document.createElement("div");
        card.className = "cards-produtos";

        card.innerHTML = `
            <p><strong>Nome:</strong> ${prof.nome}</p>
            <p><strong>Experiência:</strong> ${prof.experiencia} anos</p>
            <p><strong>Área:</strong> ${prof.area}</p>
            <span>
                <button onclick="editar(${prof.id})">Editar</button>
                <button onclick="excluir(${prof.id})">Excluir</button>
            </span>
        `;

        conteiner.appendChild(card);
    });
}

function excluir(id) {
    if (confirm("Deseja realmente excluir este profissional?")) {
        listaProfissional = listaProfissional.filter(p => p.id !== id);
        localStorage.setItem("profissionais", JSON.stringify(listaProfissional));
        atualizarDashboard();
    }
}

function editar(id) {
    localStorage.setItem("editando", id);
    window.location.href = "index.html";
}

atualizarDashboard();