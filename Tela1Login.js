
const formLogin = document.getElementById("formLogin");
const emailInput = document.getElementById("email");
const senhaInput = document.getElementById("senha");
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

// Validação do login
formLogin.addEventListener("submit", function(event) {

    event.preventDefault();   // impede de enviar antes de validar

    const email = emailInput.value.trim();
    const senha = senhaInput.value;

    const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
        appendAlert("Digite sua senha!", "danger", 5000);
        senhaInput.focus();
        return;
    }

    if (senha.length < 6) {
        appendAlert("A senha deve ter pelo menos 6 caracteres.", "danger", 5000);
        senhaInput.focus();
        return;
    }

    appendAlert("Login realizado com sucesso!", "success", 1500);

    // Espera o alert aparecer um pouquinho e vai para a tela de tarefas
    setTimeout(function() {
        window.location.href = "Tela4Tarefas.html";
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
