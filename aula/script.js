// ALGORITIMO //

// 1. Pegar os valores dos INPUTS
// 2. Fazer o Cálculo do IMC -> valorIMC
// 3. Gerar a classificação IMC
// 4. Organizar os dados dos usuários para salvar na lista e gerar a data de cadastro
// 5. Inserir o usuário na lista(salvar no localStorage)
// 6. Função para carregar os usuários(localStorage), chamar ao carregar
// 7. Reenderizar o conteúdo da tabela com os usuários cadastrados
// 8. Botão para limpar os registros dos formulários(localStorage)

function calcular(event) {
    event.preventDefault(); // Previne o regarregar da página
    console.log('Foi executada a função Calcular');

    //Passo 1
    let usuario = receberValores();

    //Passo 2
    let imcCalculado = calcularImc(usuario.altura, usuario.peso);

    //Passo 3
    let classificacaoImc = classificarImc(imcCalculado);
    console.log(classificacaoImc)

    //Passo 4
    usuario = organizarDados(usuario, imcCalculado, classificacaoImc);

    //Passo 5
    cadastrarUsuario(usuario)

    window.location.reload() // Recarregar a página ao cadastrar o usuário e carregá-lo na lista.

};

// 1.Pegar os valores dos INPUTS
function receberValores() {
    let nomeRecebido = document.getElementById("nome").value.trim();
    let alturaRecebida = document.getElementById("altura").value;
    let pesoRecebido = document.getElementById("peso").value;

    let dadosUsuario = {
        nome: nomeRecebido,
        altura: alturaRecebida,
        peso: pesoRecebido
    };

    return dadosUsuario;
}

// 2.Fazer o Cálculo do IMC -> valorIMC
function calcularImc(altura_, peso_) {
    let imc = peso_ / (altura_ * altura_);
    console.log(imc);
    return imc;
}

// 3. Gerar a classificação IMC
function classificarImc(imc_) {
    if (imc_ < 18.5) {
        return "Abaixo do peso"
    } else if (imc_ >= 18.5 && imc_ < 25) {
        return "Peso Normal"
    } else if (imc_ >= 25 && imc_ < 30) {
        return "Sobrepeso"
    } else {
        return "Obesidade"
    }
}

// 4.Organizar os dados dos usuários para salvar na lista e gerar a data de cadastro
function organizarDados(dadosUsuario, valorIMC, classificacaoImc) {
    let dataHoraAtual = new Intl.DateTimeFormat(`pt-br`, { timeStyle: `long`, dateStyle: `short` }).format(Date.now())

    console.log(dataHoraAtual);

    let dadosUsuarioAtualizado = {
        ...dadosUsuario,
        imc: valorIMC,
        situacaoIMC: classificacaoImc,
        dataCadastro: dataHoraAtual,
    }

    return dadosUsuarioAtualizado;
}

// 5. Inserir o usuário na lista(salvar no localStorage)
function cadastrarUsuario(dadosUsuario) {
    let listaUsuarios = []

    // Se houver uma lista de usuários no localStorage, carregar isso para a variável listaUsuarios
    if (localStorage.getItem("usuariosCadastrados") != null) {
        listaUsuarios = JSON.parse(localStorage.getItem("usuariosCadastrados"))
    }
    listaUsuarios.push(dadosUsuario) // Adiciona o usuário na lista de usuários
    localStorage.setItem("usuariosCadastrados", JSON.stringify(listaUsuarios)) // Salva a listaUsuarios no localStorage
}

// 6. Função para carregar os usuários(localStorage), chamar ao carregar
function carregarUsuarios() {
    let listaCarregada = []

    if (localStorage.getItem("usuariosCadastrados") != null) {
        listaCarregada = JSON.parse(localStorage.getItem("usuariosCadastrados"))
    }

    if (listaCarregada.length == 0) {
        // Se não tiver nenhum usuário cadastrado, mostrar a mensagem:
        let tabela = document.getElementById("corpo-tabela")
        
        // tabela.innerHTML = "Nenhum usuário cadastrado." // Exibe uma mensagem caso não tenha nenhum usuário cadastrado

        tabela.innerHTML = `<tr class="linha-mensagem"><td colspan="6">Nenhum usuário cadastrado ☹️</td></tr>` // Exibe uma mensagem caso não tenha nenhum usuário cadastrado
    } else {
        // Montar conteúdo da tabela
        mostarTabela(listaCarregada)
    }

    console.log(listaCarregada);
}

window.addEventListener("DOMContentLoaded", () => carregarUsuarios()) // Função de carregar usuários

// 7. Reenderizar o conteúdo da tabela com os usuários cadastrados
function mostarTabela(listaUsuarios){
    let tabela = document.getElementById("corpo-tabela")
    let template = ""

    listaUsuarios.forEach(usuario => {
        template += `<tr>
        <td data-cell="nome">${usuario.nome}</td>
        <td data-cell="altura">${usuario.altura}</td>
        <td data-cell="peso">${usuario.peso}</td>
        <td data-cell="valor do IMC">${usuario.imc.toFixed(2)}</td>
        <td data-cell="classificação do IMC">${usuario.situacaoIMC}</td>
        <td data-cell="data de cadastro">${usuario.dataCadastro}</td>
    </tr> `
    })

    tabela.innerHTML = template; // Exibir a lista dos usuários
}

// 8. Botão para limpar os registros dos formulários(localStorage)
    function deletarRegistros() {
        localStorage.removeItem("usuariosCadastrados") // Remover registros do localStorage

        window.location.reload() // Recarregar a página
    }