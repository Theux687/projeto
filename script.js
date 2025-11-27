// LOGIN
if (document.getElementById("btn-login")) {
    document.getElementById("btn-login").addEventListener("click", async () => {
        const email = document.getElementById("login-email").value;
        const senha = document.getElementById("login-senha").value;

        if (!email || !senha) {
            alert("Preencha todos os campos!");
            return;
        }

        try {
            const resultado = await fetch("http://127.0.0.1:5000/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email, senha})
            });

            const retorno = await resultado.json();
            alert(retorno.msg);
            
            if (resultado.status === 200) {
                // Login bem-sucedido - redireciona para página principal
                window.location.href = "index.html";
            }
        } catch (error) {
            alert("Erro de conexão. Verifique se o servidor está rodando.");
        }
    });
}

// CADASTRO
if (document.getElementById("btn-cadastrar")) {
    document.getElementById("btn-cadastrar").addEventListener("click", async () => {
        const nome = document.getElementById("nome").value;
        const email = document.getElementById("email").value;
        const empresa = document.getElementById("empresa").value;
        const senha = document.getElementById("senha").value;
        const confirmarSenha = document.getElementById("confirmar-senha").value;

        if (!nome || !email || !senha || !confirmarSenha) {
            alert("Preencha todos os campos obrigatórios!");
            return;
        }

        if (senha !== confirmarSenha) {
            alert("As senhas não coincidem!");
            return;
        }

        try {
            const resultado = await fetch("http://127.0.0.1:5000/cadastro", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({nome, email, senha, empresa})
            });

            const retorno = await resultado.json();
            alert(retorno.msg);
            
            if (resultado.status === 201) {
                // Cadastro bem-sucedido - redireciona para login
                window.location.href = "entrar.html";
            }
        } catch (error) {
            alert("Erro de conexão. Verifique se o servidor está rodando.");
        }
    });
}
// DASHBOARD NAVIGATION
if (document.querySelector('.nav-link')) {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.dashboard-section');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links and sections
            navLinks.forEach(nav => nav.classList.remove('active'));
            sections.forEach(section => section.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Show corresponding section
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                targetSection.classList.add('active');
            }
        });
    });
}

// REDIRECT TO DASHBOARD AFTER SUCCESSFUL LOGIN
// Atualize a parte do login no script.js para redirecionar para o dashboard:
if (document.getElementById("btn-login")) {
    document.getElementById("btn-login").addEventListener("click", async () => {
        const email = document.getElementById("login-email").value;
        const senha = document.getElementById("login-senha").value;

        if (!email || !senha) {
            alert("Preencha todos os campos!");
            return;
        }

        try {
            const resultado = await fetch("http://127.0.0.1:5000/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email, senha})
            });

            const retorno = await resultado.json();
            alert(retorno.msg);
            
            if (resultado.status === 200) {
                // Login bem-sucedido - redireciona para DASHBOARD
                window.location.href = "dashboard.html";
            }
        } catch (error) {
            alert("Erro de conexão. Verifique se o servidor está rodando.");
        }
    });
}
// INTERATIVIDADE DA TELA PRINCIPAL
document.addEventListener('DOMContentLoaded', function() {
    // Efeito nos cards
    const cards = document.querySelectorAll('.card-funcionalidade');
    
    cards.forEach(card => {
        card.addEventListener('click', function() {
            const titulo = this.querySelector('h3').textContent;
            alert(`Abrindo ${titulo}...`);
            // Aqui você pode adicionar redirecionamento para as funcionalidades
        });
    });
    
    // Botão enviar mensagem
    const btnMensagem = document.querySelector('.btn-mensagem');
    if (btnMensagem) {
        btnMensagem.addEventListener('click', function() {
            alert('Abrindo formulário de contato...');
            // Aqui você pode abrir um modal ou redirecionar para contato
        });
    }
});