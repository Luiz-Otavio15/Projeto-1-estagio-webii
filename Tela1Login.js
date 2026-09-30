const senha = document.getElementById("senha");
const iconeSenha = document.getElementById("iconeSenha");

iconeSenha.addEventListener("click", function () {

    if (senha.type === "password") {

        senha.type = "text";

        iconeSenha.classList.add("ativo");

    } else {

        senha.type = "password";

        iconeSenha.classList.remove("ativo");

    }

});