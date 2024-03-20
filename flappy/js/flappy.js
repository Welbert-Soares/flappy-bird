function novoElemento(tagName, className) {
  const elem = document.createElement(tagName);
  elem.className = className;
  return elem;
}

function Barreira(reversa = false) {
  this.elemento = novoElemento("div", "barreira");

  const borda = novoElemento("div", "borda");
  const corpo = novoElemento("div", "corpo");
  this.elemento.appendChild(reversa ? corpo : borda);
  this.elemento.appendChild(reversa ? borda : corpo);

  this.setAltura = (altura) => (corpo.style.height = `${altura}px`);
}

// teste 1
// const b = new Barreira(true)
// b.setAltura(300)
// document.querySelector('[div-flappy]').appendChild(b.elemento)

function ParDeBarreiras(altura, abertura, x) {
  this.elemento = novoElemento("div", "par-de-barreiras");

  this.superior = new Barreira(true);
  this.inferior = new Barreira(false);

  this.elemento.appendChild(this.superior.elemento);
  this.elemento.appendChild(this.inferior.elemento);

  this.sortearAbertura = () => {
    const alturaSuperior = Math.random() * (altura - abertura);
    const alturaInferior = altura - abertura - alturaSuperior;
    this.superior.setAltura(alturaSuperior);
    this.inferior.setAltura(alturaInferior);
  };

  this.getX = () => parseInt(this.elemento.style.left.split("px")[0]);
  this.setX = (x) => (this.elemento.style.left = `${x}px`);
  this.getLargura = () => this.elemento.clientWidth;

  this.sortearAbertura();
  this.setX(x);
}

// teste 2
// const b = new ParDeBarreiras(700, 200, 400)
// document.querySelector('[div-flappy]').appendChild(b.elemento)

function Barreiras(altura, largura, abertura, espaco, notificarPonto) {
  this.pares = [
    new ParDeBarreiras(altura, abertura, largura),
    new ParDeBarreiras(altura, abertura, largura + espaco),
    new ParDeBarreiras(altura, abertura, largura + espaco * 2),
    new ParDeBarreiras(altura, abertura, largura + espaco * 3),
  ];

  const deslocamento = 3;
  this.animar = () => {
    this.pares.forEach((par) => {
      par.setX(par.getX() - deslocamento);

      // quando o elemento sair da área do jogo
      if (par.getX() < -par.getLargura()) {
        par.setX(par.getX() + espaco * this.pares.length);
        par.sortearAbertura();
      }

      const meio = largura / 2;
      const cruzouOMeio =
        par.getX() + deslocamento >= meio && par.getX() < meio;
      if (cruzouOMeio) notificarPonto();
    });
  };
}

function Passaro(alturaJogo) {
  let voando = false;
  let velocidade = 0;
  let aceleracao = 0;

  this.elemento = novoElemento("img", "passaro");
  this.elemento.src = "imgs/passaro.png";

  this.getY = () => parseInt(this.elemento.style.bottom.split("px")[0]);
  this.setY = (y) => (this.elemento.style.bottom = `${y}px`);

  window.onkeydown = (e) => {
    voando = true;
    velocidade = 5; // Ajuste este valor conforme necessário
    aceleracao = 0.3; // Ajuste este valor conforme necessário
  };
  window.onkeyup = (e) => {
    voando = false;
    aceleracao = 0;
  };

  this.animar = () => {
    if (voando) {
      velocidade += aceleracao;
    } else {
      velocidade -= 0.5; // Ajuste este valor conforme necessário
    }

    const novoY = this.getY() + velocidade;
    const alturaMaxima = alturaJogo - this.elemento.clientHeight;

    if (novoY <= 0) {
      this.setY(0);
      velocidade = 0;
    } else if (novoY >= alturaMaxima) {
      this.setY(alturaMaxima);
      velocidade = 0;
    } else {
      this.setY(novoY);
    }
  };

  this.setY(alturaJogo / 2);
}

// teste 3
//  const barreiras = new Barreiras(700, 1200, 200, 400)
//  const passaro = new Passaro(700)
//  const areaDoJogo = document.querySelector('[div-flappy]')
//  areaDoJogo.appendChild(passaro.elemento)
//  barreiras.pares.forEach(par => areaDoJogo.appendChild(par.elemento))
//
//  setInterval(() => {
//      barreiras.animar()
//      passaro.animar()
//  }, 20)

function Progresso() {
  this.elemento = novoElemento("span", "progresso");
  this.atualizarPontos = (pontos) => {
    this.elemento.innerHTML = pontos;
  };
  this.atualizarPontos(0);
}

function estaoSobrepostos(elementoA, elementoB) {
  const a = elementoA.getBoundingClientRect();
  const b = elementoB.getBoundingClientRect();

  const horizontal = a.left + a.width >= b.left && b.left + b.width >= a.left;
  const vertical = a.top + a.height >= b.top && b.top + b.height >= a.top;

  return horizontal && vertical;
}

function colidiu(passaro, barreiras) {
  let colidiu = false;
  barreiras.pares.forEach((parDeBarreiras) => {
    if (!colidiu) {
      const superior = parDeBarreiras.superior.elemento;
      const inferior = parDeBarreiras.inferior.elemento;
      colidiu =
        estaoSobrepostos(passaro.elemento, superior) ||
        estaoSobrepostos(passaro.elemento, inferior);
    }
  });
  return colidiu;
}

function FlappyBird() {
  let pontos = 0;
  let speedFactor = 1;

  const areaDoJogo = document.querySelector("[div-flappy]");
  const altura = areaDoJogo.clientHeight;
  const largura = areaDoJogo.clientWidth;

  const progresso = new Progresso();
  const barreiras = new Barreiras(altura, largura, 200, 400, () => {
    progresso.atualizarPontos(++pontos);
    speedFactor += 0.01; // Aumenta o fator de velocidade
  });
  const passaro = new Passaro(altura);

  areaDoJogo.appendChild(progresso.elemento);
  areaDoJogo.appendChild(passaro.elemento);
  barreiras.pares.forEach((par) => areaDoJogo.appendChild(par.elemento));

  this.start = () => {
    // loop do jogo
    const temporizador = setInterval(() => {
      barreiras.animar();
      passaro.animar();

      if (colidiu(passaro, barreiras)) {
        clearInterval(temporizador);

        // Limpa a área do jogo
        areaDoJogo.innerHTML = "";

        // Cria um botão de reinício
        const restartButton = document.createElement("button");
        restartButton.innerText = "Reiniciar";
        restartButton.className = "restart-button";
        restartButton.addEventListener("click", () => {
          // Inicia a contagem regressiva
          let countdown = 3;
          const countdownInterval = setInterval(() => {
            if (countdown > 0) {
              // Atualiza o texto do botão para mostrar a contagem regressiva
              restartButton.innerText = `Reiniciando em ${countdown}...`;
              countdown--;
            } else {
              // Limpa a contagem regressiva
              clearInterval(countdownInterval);

              // Remove o botão de reinício
              areaDoJogo.removeChild(restartButton);

              // Inicia um novo jogo
              new FlappyBird().start();
            }
          }, 1000);
        });

        // Adiciona o botão de reinício à área do jogo
        areaDoJogo.appendChild(restartButton);
      }
    }, 20);
  };
}

new FlappyBird().start();
