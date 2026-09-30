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
formCadastro.addEventListener("submit", function (event) {

    event.preventDefault();

    if (senha.value !== confirmarSenha.value) {

        alert("As senhas não são iguais.");

        return;
    }

    alert("Senha renovada com sucesso!");

    formCadastro.reset();

});