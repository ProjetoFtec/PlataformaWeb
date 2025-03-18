document.getElementById("cadastroForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;
    const confirmSenha = document.getElementById("confirmSenha").value;

    if (senha !== confirmSenha) {
        alert("As senhas não coincidem!");
        return;
    }

    const response = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha }),
    });

    const data = await response.json();
    alert(data.msg);
});

document.getElementById('senha').addEventListener('input', function() {
    const senha = document.getElementById('senha').value;
    const validacaoSenha = document.getElementById('validacaoSenha');

    let feedback = [];
    let regexMaiuscula = /[A-Z]/;
    let regexMinuscula = /[a-z]/;
    let regexSimbolo = /[!@#$%^&*(),.?":{}|<>]/;
    let regexMinimo = /.{8,}/;

    feedback.push(`Maiúscula: ${regexMaiuscula.test(senha) ? '✔' : '❌'}`);
    feedback.push(`Minúscula: ${regexMinuscula.test(senha) ? '✔' : '❌'}`);
    feedback.push(`Símbolos: ${regexSimbolo.test(senha) ? '✔' : '❌'}`);
    feedback.push(`Mínimo 8 caracteres: ${regexMinimo.test(senha) ? '✔' : '❌'}`);

    validacaoSenha.innerHTML = feedback.join('<br>');
});

document.getElementById("toggleSenha").addEventListener("click", function() {
    const senhaInput = document.getElementById("senha");
    const confirmSenhaInput = document.getElementById("confirmSenha");
    
    // Alterna entre tipo 'password' e 'text'
    const tipo = senhaInput.type === "password" ? "text" : "password";
    senhaInput.type = tipo;
    confirmSenhaInput.type = tipo;
});

document.getElementById("loginForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    // Enviar a requisição para o backend
    const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
    });

    const data = await response.json();

    if (data.success) {
        // Se o login for bem-sucedido, redireciona para o dashboard em uma nova aba
        window.open("dashboard.html", "_blank");
    } else {
        // Caso contrário, exibe a mensagem de erro
        document.getElementById("erroMensagem").style.display = "block";
    }
});

// Lógica para enviar o código de recuperação de senha
document.getElementById("forgotPasswordForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("forgotEmail").value;

    const response = await fetch("http://localhost:3000/auth/recuperar-senha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
    });

    const data = await response.json();
    alert(data.msg);

    if (data.msg === "Código enviado com sucesso. Verifique seu e-mail.") {
        // Esconde a seção do e-mail e mostra a seção do código
        document.getElementById("emailSection").style.display = "none";
        document.getElementById("codeSection").style.display = "block";
    }
});

// Lógica para validar o código de recuperação
document.getElementById("verifyCodeForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("forgotEmail").value;
    const code = document.getElementById("verificationCode").value;

    const response = await fetch("http://localhost:3000/auth/validar-codigo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
    });

    const data = await response.json();
    alert(data.msg);

    if (data.msg === "Código válido!") {
        // Esconde a seção do código e mostra a seção para nova senha
        document.getElementById("codeSection").style.display = "none";
        document.getElementById("resetPasswordSection").style.display = "block";

        // Quando o código for validado, abrir a nova aba para atualizar a senha
        window.open("update-password.html", "_blank");
    }
});

// Lógica para atualizar a senha
document.getElementById("resetPasswordForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("forgotEmail").value;
    const newPassword = document.getElementById("newPassword").value;
    const confirmNewPassword = document.getElementById("confirmNewPassword").value;

    if (newPassword !== confirmNewPassword) {
        alert("As senhas não coincidem!");
        return;
    }

    const response = await fetch("http://localhost:3000/auth/atualizar-senha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, newPassword }),
    });

    const data = await response.json();
    alert(data.msg);
});