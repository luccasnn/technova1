function validarNomeProduto(nome) {
    if (!nome || nome.trim() === "") {
        return false;
    }
    const regexNome = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/;
    return regexNome.test(nome);
}

function validarQuantidade(quantidade) {
    if (!quantidade || isNaN(quantidade) || quantidade <= 0) {
        return false;
    }
    return true;
}

function validarPreco(preco) {
    if (!preco || isNaN(preco) || preco <= 0) {
        return false;
    }
    return true;
}

function validarPreco2(preco) {
    const regexPreco = /^\d+(\.\d{1,2})?$/;
    if (!regexPreco.test(preco)) {
        return false;
    }
    return true;
}

function validarEmailProduto(email) {
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regexEmail.test(email);
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

function excluirProduto(index) {
    dadosProdutos.splice(index, 1);
    localStorage.setItem('produtos', JSON.stringify(dadosProdutos));
    atualizarTabelaProdutos();
}

let dadosProdutos = JSON.parse(localStorage.getItem('produtos')) || [];

const formProduto = document.getElementById('formProduto');

formProduto.addEventListener('submit', function (e) {
    e.preventDefault();
    limparMensagensErro();

    const produtoIndex = document.getElementById('produtoIndex').value;

    const nome = document.getElementById('nome').value;
    const quantidade = document.getElementById('quantidade').value;
    const preco = document.getElementById('preco').value;
    const email = document.getElementById('email').value;

    let valido = true;

    if (!validarNomeProduto(nome)) {
        exibirMensagemErro(document.getElementById('nome'), 'Nome inválido. Apenas letras e espaços são permitidos.');
        valido = false;
    }

    if (!validarQuantidade(quantidade)) {
        exibirMensagemErro(document.getElementById('quantidade'), 'Quantidade inválida. Deve ser um número maior que zero.');
        valido = false;
    }

    if (!validarPreco(preco)) {
        exibirMensagemErro(document.getElementById('preco'), 'Preço inválido. Deve ser um número maior que zero.');
        valido = false;
    }
    if (!validarPreco2(preco)) {
        exibirMensagemErro(document.getElementById('preco'), 'Preço com mais de duas casas decimais.');
        valido = false;
    }

    if (!validarEmailProduto(email)) {
        exibirMensagemErro(document.getElementById('email'), 'Email inválido.');
        valido = false;
    }

    if (!valido) {
        return;
    }

    const produto = {
        nome,
        quantidade,
        preco,
        email,
    };

    if (produtoIndex) {
        dadosProdutos[produtoIndex] = produto;
    } else {
        dadosProdutos.push(produto);
    }

    localStorage.setItem('produtos', JSON.stringify(dadosProdutos));
    formProduto.reset();
    document.getElementById('produtoIndex').value = '';
    document.querySelector('#formProduto button[type="submit"]').innerText = "Cadastrar";
    atualizarTabelaProdutos();
});

function atualizarTabelaProdutos() {
    const tbodyProdutos = document.querySelector('#tabela tbody');
    tbodyProdutos.innerHTML = '';

    dadosProdutos.forEach((produto, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${produto.nome}</td>
            <td>${produto.quantidade}</td>
            <td>${produto.preco}</td>
            <td>${produto.email}</td>
            <td>
                <button onclick="editarProduto(${index})">Editar</button>
                <button onclick="excluirProduto(${index})">Excluir</button>
            </td>
        `;
        tbodyProdutos.appendChild(row);
    });
}

function editarProduto(index) {
    const produto = dadosProdutos[index];
    document.getElementById('nome').value = produto.nome;
    document.getElementById('quantidade').value = produto.quantidade;
    document.getElementById('preco').value = produto.preco;
    document.getElementById('email').value = produto.email;
    document.getElementById('produtoIndex').value = index;
    document.querySelector('#formProduto button[type="submit"]').innerText = "Alterar";
}

function gerarRelatorioProdutos() {
    const tbodyRelatorio = document.querySelector('#tabelaRelatorio tbody');
    tbodyRelatorio.innerHTML = '';

    if (dadosProdutos.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = '<td colspan="4">Nenhum produto cadastrado.</td>';
        tbodyRelatorio.appendChild(row);
    } else {
        dadosProdutos.forEach(produto => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${produto.nome}</td>
                <td>${produto.quantidade}</td>
                <td>${produto.preco}</td>
                <td>${produto.email}</td>
            `;
            tbodyRelatorio.appendChild(row);
        });
    }
}

window.onload = function () {
    atualizarTabelaProdutos();
    gerarRelatorioProdutos();
};
