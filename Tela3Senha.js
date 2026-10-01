const alertPlaceholder = document.getElementById("liveAlertPlaceholder");
const formSenha = document.getElementById("formCadastro");
const senhaInput = document.getElementById("senha");
const confirmarInput = document.getElementById("confirmarSenha");
const iconeSenha = document.getElementById("iconeSenha");
const iconeConfirmarSenha = document.getElementById("iconeConfirmarSenha");


// Alert que some sozinho
const appendAlert = (message, type, tempo = 3000) => {

    alertPlaceholder.innerHTML = "";   // só um alert por vez

    const wrapper = document.createElement("div");
    wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible fade show" role="alert">`,
        `   <div>${message}</div>`,
        '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>'
    ].join("");

    alertPlaceholder.append(wrapper);

    const alerta = wrapper.querySelector(".alert");

    setTimeout(function() {
        bootstrap.Alert.getOrCreateInstance(alerta).close();
    }, tempo);
};


// Mostrar/ocultar senha (serve para os dois campos)
function alternarSenha(input, icone) {

    if (input.type === "password") {
        input.type = "text";
        icone.classList.add("ativo");
    } else {
        input.type = "password";
        icone.classList.remove("ativo");
    }
}

iconeSenha.addEventListener("click", function() {
    alternarSenha(senhaInput, iconeSenha);
});

iconeConfirmarSenha.addEventListener("click", function() {
    alternarSenha(confirmarInput, iconeConfirmarSenha);
});


// Redefinir senha
formSenha.addEventListener("submit", function(event) {

    event.preventDefault();

    const senha = senhaInput.value;
    const confirmar = confirmarInput.value;

    if (senha === "") {
        appendAlert("Digite a nova senha!", "danger", 5000);
        senhaInput.focus();
        return;
    }

    if (senha.length < 6) {
        appendAlert("A senha deve ter pelo menos 6 caracteres.", "danger", 5000);
        senhaInput.focus();
        return;
    }

    if (confirmar === "") {
        appendAlert("Confirme a nova senha!", "danger", 5000);
        confirmarInput.focus();
        return;
    }

    if (senha !== confirmar) {
        appendAlert("As senhas não são iguais!", "danger", 5000);
        confirmarInput.focus();
        return;
    }

    appendAlert("Senha alterada com sucesso!", "success", 1500);

    setTimeout(function() {
        window.location.href = "Tela1Login.html";
    }, 1500);
});