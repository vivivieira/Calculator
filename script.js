const display = document.querySelector(".display");

const teclasNumeros = document.querySelectorAll("[id*=tecla]");

const operadores = document.querySelectorAll("[id*=operador]");

const historico = document.querySelector(".historico");

let novoNumero = true;
let operador;
let numeroAnterior;
let calculoHistorico;

function atualizarDisplay(texto){
    if(novoNumero === true){
        display.textContent = texto;
        novoNumero = false;      
    } else {
        display.textContent += texto;
    }
};

const inserirNumero = (event) => atualizarDisplay(event.target.textContent);

teclasNumeros.forEach(function(tecla){
  tecla.addEventListener("click", inserirNumero);
  });

const selecionarOperador = (event) => {
    novoNumero = true;
    operador = event.target.textContent;
    calculoHistorico = display.textContent + operador;
    numeroAnterior = display.textContent.replace(",",".");
};

operadores.forEach(function(operador){
    operador.addEventListener("click", selecionarOperador );
});

const calcular = () => {
    //verificamos se há um operador em memória
    if(operador !== undefined){
        calculoHistorico +=display.textContent;
        //pega o número do display a coloca em numeroAtual
        const numeroAtual = display.textContent.replace(",",".");
        //seta novoNumero como verdadeiro,
        //para que possamos atualizar o display com o resultado
        novoNumero = true;
        //calculamos o resultado com a função eval
        //o eval interpreta uma expressão, executa e retorna o resultado
        let resultado = eval(`${numeroAnterior}${operador}${numeroAtual}`);
        //atualizamos  o display com o resultado calculado
        if(resultado,toString().includes(".")) {
        resultado = resultado.tofixed(1);
        }
       
        calculoHistorico += "=" + resultado.toString().replace(".",",");

        atualizarDisplay(resultado.toString().replace(".",","));
         //resetamos o operador como indefinido (estado inicial)
        operador = undefined;

        incluirHistorico();
    }
};

const incluirHistorico = () => {
    const novoHistorico = document.createElement("p");
    novoHistorico.textContent = calculoHistorico;

    historico.appendChild(novoHistorico);

    novoHistorico = undefined;
}

const ativarIgual = () => calcular();

document.querySelector("#igual").addEventListener("click", ativarIgual);

const limparDisplay = () => (display.textContent = "");

document.querySelector("#limparDisplay").addEventListener("click", limparDisplay);

const limparCalculo = () => {
    limparDisplay();
    operador = undefined;
    novoNumero = true;
    numeroAnterior = undefined;
};

document.querySelector("#limparCalculo").addEventListener("click", limparCalculo);

const removerUltimoNumero = () => {
display.textContent = display.textContent.slice(0, -1);
};

document.querySelector("#backspace").addEventListener("click", removerUltimoNumero);

const inverterSinal = () => {
display.textContent = display.textContent * -1;
};

document.querySelector("#inverter").addEventListener("click", inverterSinal);


const inserirDecimal = () => {
  if(!display.textContent.includes(",")) {
      if(display.textContent.length > 0) {
          atualizarDisplay(",");
      } else {
        atualizarDisplay("0,");
   }
  }
 };

document.querySelector("#decimal").addEventListener("click", inserirDecimal);
