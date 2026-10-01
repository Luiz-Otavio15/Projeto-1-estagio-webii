let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

let filtroAtual = "todas";

const tarefaInput = document.getElementById("tarefaInput");
const tarefaTextArea = document.getElementById("descricao");
const adicionarBtn = document.getElementById("adicionarBtn");
const lista = document.getElementById("lista");
const semTarefas = document.getElementById("semTarefas");
const botoesFiltro = document.querySelectorAll(".filtro");
const sairBtn = document.getElementById("sair");


function salvarTarefas() {

    localStorage.setItem("tarefas", JSON.stringify(tarefas));

}


function mostrarTarefas() {

    lista.innerHTML = "";

    let tarefasFiltradas = tarefas;

    if (filtroAtual === "pendentes") {

        tarefasFiltradas = tarefas.filter(function(tarefa) {
            return !tarefa.concluida;
        });

    }

    if (filtroAtual === "concluidas") {

        tarefasFiltradas = tarefas.filter(function(tarefa) {
            return tarefa.concluida;
        });

    }


    if (tarefasFiltradas.length === 0) {

        semTarefas.style.display = "block";

    } else {

        semTarefas.style.display = "none";

    }


    tarefasFiltradas.forEach(function(tarefa) {

        const div = document.createElement("div");

        div.classList.add("col");


        if (tarefa.concluida) {

            div.classList.add("concluida");

        }
        
        div.innerHTML = `
            
                <div class="col-sm-auto">
                    <div class="card" style="width: 300px; height: auto;">
                        <div class="card-body">
                            <h5 class="card-title">${tarefa.nome}</h5>
                            <p class="card-text">${tarefa.descricao}</p>
                            
                            <input class="form-check-input" type="checkbox" ${tarefa.concluida ? "checked" : ""} value="" id="checkDefault" onchange="concluirTarefa(${tarefa.id})"><p>Concluido</p>
                            <button type="button" class="btn btn-outline-danger" onclick="excluirTarefa(${tarefa.id})">Excluir</button>
                        </div>
                    </div>
                </div>
        `;

        

        lista.appendChild(div);

    });

}


function adicionarTarefa() {

    const nome = tarefaInput.value.trim();
    const descricao1 = tarefaTextArea.value.trim()

    if (nome === "") {
        appendAlert('Campo nome vazio, Digite Algo!', 'danger')
        return;    
            
        


    } 
    
    if (descricao1 === "") {
        appendAlert('Campo descrição vazio, digite algo!', 'danger')
           
        return;
    }

    

    const novaTarefa = {

        id: Date.now(),
        nome: nome,
        descricao: descricao1,
        concluida: false

    };
    appendAlert('Campos de nome e descrição preenchidos com sucesso! ', 'success')

    tarefas.push(novaTarefa);

    salvarTarefas();

    tarefaInput.value = "";
    tarefaTextArea.value = "";
    
    mostrarTarefas();

}


function concluirTarefa(id) {

    tarefas = tarefas.map(function(tarefa) {

        if (tarefa.id === id) {
            tarefa.concluida = !tarefa.concluida;
            if (tarefa.concluida === true){
                appendAlert(`Você marcou a tarefa ${tarefa.nome} como concluido!`, `success`)
            }
            if (tarefa.concluida === false) {
                appendAlert(`Você desmarcou a tarefa: ${tarefa.nome}`, `danger`)
            }
            
        }
        
        
        return tarefa;



    });


    salvarTarefas();

    mostrarTarefas();

}

let idParaExcluir = null;
let modalExcluir = null;

// Abre a tela de confirmação
function excluirTarefa(id) {
    
    const tarefa = tarefas.find(function(t) {
        return t.id === id;
    });

    

    idParaExcluir = id;
    document.getElementById("textoExcluir").textContent =
        `Tem certeza que deseja excluir ${tarefa.nome} ? Essa ação não pode ser desfeita.`;

    if (!modalExcluir) {
        modalExcluir = new bootstrap.Modal(document.getElementById("modalExcluir"));
    }

    modalExcluir.show();
}

// Exclui de verdade, só depois de confirmar
function confirmarExclusao() {
    tarefas = tarefas.filter(function(tarefa) {
        appendAlert(`Você excluiu a tarefa: ${tarefa.nome}`, `success`)
        return tarefa.id !== idParaExcluir;
    });

    salvarTarefas();
    mostrarTarefas();

    modalExcluir.hide();
    idParaExcluir = null;
}

document.getElementById("confirmarExcluir").addEventListener("click", confirmarExclusao);






adicionarBtn.addEventListener("click", adicionarTarefa);


tarefaInput.addEventListener("keydown", function(event) {

    if (event.key === "Enter") {

        adicionarTarefa();

    }

});


botoesFiltro.forEach(function(botao) {

    botao.addEventListener("click", function() {

        botoesFiltro.forEach(function(btn) {

            btn.classList.remove("ativo");

        });


        botao.classList.add("ativo");

        filtroAtual = botao.dataset.filtro;

        mostrarTarefas();

    });

});


sairBtn.addEventListener("click", function() {

    window.location.href = "Tela1Login.html";

});


mostrarTarefas();




const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
const appendAlert = (message, type, tempo) => {
  
    
  
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('')

  alertPlaceholder.append(wrapper)
  setTimeout(function() {
        bootstrap.Alert.getOrCreateInstance(alerta).close();
    }, tempo);
}
