function validarNome1(nome) {
    if (!nome || nome.trim() === "") {
        return false;
    }
    const regexNome = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?: [A-Za-zÀ-ÖØ-öø-ÿ]+)*$/;
    return regexNome.test(nome);
}

function validarNome2(nome) {
    if (!nome || nome.trim() === "") {
        return false;
    }
    if (nome.length < 3 || nome.length > 100) {
        return false;
    }
    const regexNome = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?: [A-Za-zÀ-ÖØ-öø-ÿ]+)*$/;
    return regexNome.test(nome);
}

function validarNome3(nome) {
    if (!nome || nome.trim() === "") {
        return false;
    }
    const regexNome = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?: [A-Za-zÀ-ÖØ-öø-ÿ]+)*$/;
    return regexNome.test(nome);
}

function validarNome4(nome) {
    if (!nome || nome.trim() === "") {
        return false;
    }
    const regexNome = /^([A-ZÀ-ÖØ-öø-ÿ][a-zà-öø-ÿ]+)( [A-ZÀ-ÖØ-öø-ÿ][a-zà-öø-ÿ]+)*$/;
    return regexNome.test(nome);
}

function validarNome5(nome) {
    if (!nome || nome.trim() === "") {
        return false;
    }
    const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ]+(?: [A-Za-zÀ-ÖØ-öø-ÿ]+)*$/;
    return regex.test(nome) && !/\s{2,}/.test(nome);
}

function validarEmail(email) {
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regexEmail.test(email);
}

function validarTelefone(telefone) {
    const regexTelefone = /^\(\d{2}\) \d{4,5}-\d{4}$/;
    return regexTelefone.test(telefone);
}

function exibirMensagemErro(campo, mensagem) {
    let erroElemento = campo.parentElement.querySelector('.erro');
    if (erroElemento) {
        erroElemento.textContent = mensagem;
    } else {
        erroElemento = document.createElement('div');
        erroElemento.classList.add('erro');
        erroElemento.textContent = mensagem;
        campo.parentElement.appendChild(erroElemento);
    }
}

function limparMensagensErro() {
    const mensagensErro = document.querySelectorAll('.erro');
    mensagensErro.forEach(erro => erro.remove());
}

let dadosClientes = JSON.parse(localStorage.getItem('clientes')) || [];

const formCliente = document.getElementById('formCliente');

function excluirCliente(index) {
    dadosClientes.splice(index, 1);
    localStorage.setItem('clientes', JSON.stringify(dadosClientes));
    atualizarTabelaClientes();
}

formCliente.addEventListener('submit', function (e) {
    e.preventDefault();

    limparMensagensErro();

    const nome = document.getElementById('nomeCliente').value;
    const email = document.getElementById('emailCliente').value;
    const telefone = document.getElementById('telefoneCliente').value;

    let valido = true;

    if (!validarNome1(nome)) {
        exibirMensagemErro(document.getElementById('nomeCliente'), 'Nome vazio ou apenas espaços');
        valido = false;
    }
    if (!validarNome2(nome)) {
        exibirMensagemErro(document.getElementById('nomeCliente'), 'Nome muito curto ou muito longo');
        valido = false;
    }
    if (!validarNome3(nome)) {
        exibirMensagemErro(document.getElementById('nomeCliente'), 'Não é permitido numeros ou caracteres Especiais.');
        valido = false;
    }
    if (!validarNome4(nome)) {
        exibirMensagemErro(document.getElementById('nomeCliente'), 'As primeiras letras devem ser maiusculas e as demais minusculas.');
        valido = false;
    }
    if (!validarNome5(nome)) {
        exibirMensagemErro(document.getElementById('nomeCliente'), 'Existem espaços não permitidos');
        valido = false;
    }

    if (!validarEmail(email)) {
        exibirMensagemErro(document.getElementById('emailCliente'), 'Por favor, insira um e-mail válido.');
        valido = false;
    }

    if (!validarTelefone(telefone)) {
        exibirMensagemErro(document.getElementById('telefoneCliente'), 'O telefone deve seguir o formato (XX) XXXX-XXXX ou (XX) XXXXX-XXXX.');
        valido = false;
    }

    if (!valido) {
        return;
    }

    const clienteIndex = document.getElementById('clienteIndex').value;

    const cliente = {
        nome: nome,
        email: email,
        telefone: telefone,
    };

    if (clienteIndex) {
        dadosClientes[clienteIndex] = cliente;
    } else {
        dadosClientes.push(cliente);
    }

    localStorage.setItem('clientes', JSON.stringify(dadosClientes));
    formCliente.reset();
    document.getElementById('clienteIndex').value = '';
    document.querySelector('#formCliente button[type="submit"]').innerText = "Cadastrar";
    atualizarTabelaClientes();
});

function atualizarTabelaClientes() {
    const tbodyClientes = document.querySelector('#tabelaClientes tbody');
    tbodyClientes.innerHTML = '';

    dadosClientes.forEach((cliente, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${cliente.nome}</td>
            <td>${cliente.email}</td>
            <td>${cliente.telefone}</td>
            <td>
                <button onclick="editarCliente(${index})">Editar</button>
                <button onclick="excluirCliente(${index})">Excluir</button>
            </td>
        `;
        tbodyClientes.appendChild(row);
    });
}

function editarCliente(index) {
    const cliente = dadosClientes[index];
    document.getElementById('nomeCliente').value = cliente.nome;
    document.getElementById('emailCliente').value = cliente.email;
    document.getElementById('telefoneCliente').value = cliente.telefone;
    document.getElementById('clienteIndex').value = index;
    document.querySelector('#formCliente button[type="submit"]').innerText = "Alterar";
}

function gerarRelatorioClientes() {
    const tbodyRelatorio = document.querySelector('#tabelaRelatorioClientes tbody');
    tbodyRelatorio.innerHTML = '';

    dadosClientes.forEach(cliente => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${cliente.nome}</td>
            <td>${cliente.email}</td>
            <td>${cliente.telefone}</td>
        `;
        tbodyRelatorio.appendChild(row);
    });
}

window.onload = function () {
    atualizarTabelaClientes();
    gerarRelatorioClientes();
};
