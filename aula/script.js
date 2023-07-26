//Algoritimo

// OK   1.Pegar os valores dos INPUTS
//      2.Fazer o Cálculo do IMC -> valorIMC
//      3. Gerar a classificação IMC
//      4.Organizar os dados dos usuários para salvar na lista e gerar a data de cadastro
//      5.inserir o usuário na lista(salvar no localStorage)
//      6.Função para carregar os usuários(localStorage), chamar ao carregar
//      7.Reenderizar o conteúdo da tabela com os usuários cadastrados
//      8.Botão para limpar os registros dos formulários(localStorage)

function calcular(event){
    event.preventDefault();
    console.log('Foi executada a função Calcular');
    let usuario = receberValores();
    let imcCalculado = calcularImc(usuario.altura, usuario.peso);
    let classificacaoImc = classificarImc(imcCalculado);
    console.log(classificacaoImc)

    organizarDados(usuario, imcCalculado, classificacaoImc);
};

function receberValores(){
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

function calcularImc(altura_, peso_){
    let imc = peso_ / (altura_ * altura_);
    console.log(imc);
    return imc;
}

function classificarImc(imc_){
    if (imc_ < 18.5){
        return "Abaixo do peso"
    } else if(imc_>=18.5 && imc_ < 25){
        return "Peso Normal"
    } else if(imc_>=25 && imc_ < 30){
        return "Sobrepeso"
    }else {
        return "Obesidade"
    }
}

function organizarDados(dadosUsuario, valorIMC, classificacaoImc){
    let dataHoraAtual = new Intl.DateTimeFormat(`pt-br`, { timeStyle: `long`, dateStyle: `short` }).format(Date.now())

    console.log(dataHoraAtual);

    let dadosUsuarioAtualizado = {
        
    }
}