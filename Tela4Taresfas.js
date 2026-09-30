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

        }

        return tarefa;

    });


    salvarTarefas();

    mostrarTarefas();

}


function excluirTarefa(id) {

    tarefas = tarefas.filter(function(tarefa) {

        return tarefa.id !== id;

    });


    salvarTarefas();

    mostrarTarefas();

}


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
const appendAlert = (message, type) => {
  
    
  
    const wrapper = document.createElement('div')
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join('')

  alertPlaceholder.append(wrapper)
}

