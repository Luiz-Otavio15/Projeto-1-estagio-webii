
const nomeInput = document.getElementById("nome");
const emailInput = document.getElementById("email");
const senhaInput = document.getElementById("senha");
const confirmarInput = document.getElementById("confirmarSenha");
const senha = document.getElementById("senha");
const confirmarSenha = document.getElementById("confirmarSenha");

const iconeSenha = document.getElementById("iconeSenha");
const iconeConfirmarSenha = document.getElementById("iconeConfirmarSenha");

const formCadastro = document.getElementById("formCadastro");


// Mostrar/ocultar senha
iconeSenha.addEventListener("click", function () {

    if (senha.type === "password") {

        senha.type = "text";
        iconeSenha.classList.add("ativo");

    } else {

        senha.type = "password";
        iconeSenha.classList.remove("ativo");

    }

});


// Mostrar/ocultar confirmar senha
iconeConfirmarSenha.addEventListener("click", function () {

    if (confirmarSenha.type === "password") {

        confirmarSenha.type = "text";
        iconeConfirmarSenha.classList.add("ativo");

    } else {

        confirmarSenha.type = "password";
        iconeConfirmarSenha.classList.remove("ativo");

    }

});


// Cadastro
formCadastro.addEventListener("submit", function(event) {

    event.preventDefault();

    const nome = nomeInput.value.trim();
    const email = emailInput.value.trim();
    const senha = senhaInput.value;
    const confirmar = confirmarInput.value;

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (nome === "") {
        appendAlert("Digite seu nome!", "danger", 5000);
        nomeInput.focus();
        return;
    }

    if (nome.length < 3) {
        appendAlert("O nome deve ter pelo menos 3 caracteres.", "danger", 5000);
        nomeInput.focus();
        return;
    }

    if (email === "") {
        appendAlert("Digite seu e-mail!", "danger", 5000);
        emailInput.focus();
        return;
    }

    if (!emailValido.test(email)) {
        appendAlert("E-mail inválido. Ex: nome@email.com", "danger", 5000);
        emailInput.focus();
        return;
    }

    if (senha === "") {
        appendAlert("Crie uma senha!", "danger", 5000);
        senhaInput.focus();
        return;
    }

    if (senha.length < 6) {
        appendAlert("A senha deve ter pelo menos 6 caracteres.", "danger", 5000);
        senhaInput.focus();
        return;
    }

    if (confirmar === "") {
        appendAlert("Confirme sua senha!", "danger", 5000);
        confirmarInput.focus();
        return;
    }

    if (senha !== confirmar) {
        appendAlert("As senhas não são iguais!", "danger", 5000);
        confirmarInput.focus();
        return;
    }

    appendAlert("Conta criada com sucesso!", "success", 1500);

    setTimeout(function() {
        window.location.href = "Tela1Login.html";
    }, 1500);
});

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

  const alerta = wrapper.querySelector('.alert')

  setTimeout(function() {
        bootstrap.Alert.getOrCreateInstance(alerta).close();
    }, tempo);
}