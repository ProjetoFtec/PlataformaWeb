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

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('loginEmail').value;
    const senha = document.getElementById('loginSenha').value;

    const response = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
    });

    const data = await response.json();
    if (data.msg) {
        alert(data.msg);
    } else {
        alert('Login bem-sucedido');
        // Aqui você pode redirecionar para o dashboard ou outra página.
    }
});