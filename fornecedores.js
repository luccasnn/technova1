let dadosFornecedores = JSON.parse(localStorage.getItem('fornecedores')) || [];

const formFornecedor = document.getElementById('formFornecedor');

function validarNomeFornecedor(nome) {
    if (!nome || nome.trim() === "") {
        return false;
    }
    if (nome.length <= 3 || nome.length > 100) {
        return false;
    }
    const regexNome = /^[A-Za-zÀ-ÖØ-öø-ÿ0-9]+(?: [A-Za-zÀ-ÖØ-öø-ÿ0-9]+)*$/;
    return regexNome.test(nome);
}

function validarNomeFornecedor2(nome) {
    if (!nome || nome.trim() === "") {
        return false;
    }
    const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ0-9]+(?: [A-Za-zÀ-ÖØ-öø-ÿ0-9]+)*$/;
    return regex.test(nome) && !/\s{2,}/.test(nome);
}

function validarEmailFornecedor(email) {
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regexEmail.test(email);
}

function validarTelefoneFornecedor(telefone) {
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

function excluirFornecedor(index) {
    dadosFornecedores.splice(index, 1);
    localStorage.setItem('fornecedores', JSON.stringify(dadosFornecedores));
    atualizarTabelaFornecedores();
}

formFornecedor.addEventListener('submit', function (e) {
    e.preventDefault();

    limparMensagensErro();

    const nome = document.getElementById('nomeFornecedor').value;
    const email = document.getElementById('emailFornecedor').value;
    const telefone = document.getElementById('telefoneFornecedor').value;

    if (!validarNomeFornecedor(nome)) {
        exibirMensagemErro(document.getElementById('nomeFornecedor'), 'Nome inválido. Deve ter entre 3 e 100 caracteres.');
        return;
    }

    if (!validarNomeFornecedor2(nome)) {
        exibirMensagemErro(document.getElementById('nomeFornecedor'), 'Nome.');
        return;
    }

    if (!validarEmailFornecedor(email)) {
        exibirMensagemErro(document.getElementById('emailFornecedor'), 'E-mail inválido.');
        return;
    }

    if (!validarTelefoneFornecedor(telefone)) {
        exibirMensagemErro(document.getElementById('telefoneFornecedor'), 'Telefone inválido. O formato correto é (XX) XXXX-XXXX ou (XX) XXXXX-XXXX.');
        return;
    }

    const fornecedorIndex = document.getElementById('fornecedorIndex').value;

    const fornecedor = {
        nome: nome,
        email: email,
        telefone: telefone,
    };

    if (fornecedorIndex) {
        dadosFornecedores[fornecedorIndex] = fornecedor;
    } else {
        dadosFornecedores.push(fornecedor);
    }

    localStorage.setItem('fornecedores', JSON.stringify(dadosFornecedores));
    formFornecedor.reset();
    document.getElementById('fornecedorIndex').value = '';
    document.querySelector('#formFornecedor button[type="submit"]').innerText = "Cadastrar";
    atualizarTabelaFornecedores();
});

function atualizarTabelaFornecedores() {
    const tbodyFornecedores = document.querySelector('#tabelaFornecedores tbody');
    tbodyFornecedores.innerHTML = '';

    dadosFornecedores.forEach((fornecedor, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${fornecedor.nome}</td>
            <td>${fornecedor.email}</td>
            <td>${fornecedor.telefone}</td>
            <td>
                <button onclick="editarFornecedor(${index})">Editar</button>
                <button onclick="excluirFornecedor(${index})">Excluir</button>
            </td>
        `;
        tbodyFornecedores.appendChild(row);
    });
}

function editarFornecedor(index) {
    const fornecedor = dadosFornecedores[index];
    document.getElementById('nomeFornecedor').value = fornecedor.nome;
    document.getElementById('emailFornecedor').value = fornecedor.email;
    document.getElementById('telefoneFornecedor').value = fornecedor.telefone;
    document.getElementById('fornecedorIndex').value = index;
    document.querySelector('#formFornecedor button[type="submit"]').innerText = "Alterar";
}

function gerarRelatorioFornecedores() {
    const tbodyRelatorio = document.querySelector('#tabelaRelatorioFornecedores tbody');
    tbodyRelatorio.innerHTML = '';

    dadosFornecedores.forEach(fornecedor => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${fornecedor.nome}</td>
            <td>${fornecedor.email}</td>
            <td>${fornecedor.telefone}</td>
        `;
        tbodyRelatorio.appendChild(row);
    });
}

window.onload = function () {
    atualizarTabelaFornecedores();
    gerarRelatorioFornecedores();
};
