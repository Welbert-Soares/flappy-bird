<h1 align="center">🐦 Documentação do Flappy Bird 🐦</h1>

## 🎮 Link para Jogar

Pronto para a diversão? Você pode jogar o jogo diretamente no seu navegador! Clique no link abaixo para começar a aventura:

[🕹️ Jogar Flappy Bird](https://welbert-soares.github.io/flappy-bird/)

## 📝 Introdução

Este projeto foi desenvolvido individualmente, utilizando apenas HTML, CSS e JavaScript para manipular o DOM com orientação a objetos. Não possui fins comerciais, sendo apenas um exercício de programação.

## 🏗️ Estrutura do Projeto

Bem-vindo ao projeto Flappy Bird! Aqui está uma visão geral da estrutura do projeto:

> flappy/ css/ estilo.css flappy.css flappy.html fonts/ Oswald-Regular.ttf Pixel.ttf imgs/ js/ flappy.js

## 📁 Arquivos Principais

### 📄 flappy.html

Este é o coração do jogo! O arquivo HTML principal que inclui os arquivos CSS para dar aquele estilo legal e o arquivo JavaScript para trazer nosso pássaro à vida.

### 📄 flappy.js

Aqui é onde a mágica acontece! Este arquivo JavaScript contém toda a lógica do jogo. Ele define várias funções e classes para implementar o jogo Flappy Bird.

## 🎮 Classes e Funções

### `FlappyBird()`

Conheça a classe principal do jogo. Ela dá o pontapé inicial no jogo, cria as barreiras e o pássaro, e inicia a diversão!

### `Passaro(alturaJogo)`

Apresentando nosso herói, o pássaro! Esta classe representa o pássaro no jogo. Ele tem um método `animar()` que atualiza a posição do pássaro com base em se ele está voando ou não.

### `Barreiras(altura, largura, abertura, espaco, notificarPonto)`

E aqui estão nossos obstáculos, as barreiras! Esta classe cria um par de barreiras em intervalos regulares e as anima movendo-as para a esquerda.

## 🎯 Como Jogar

Prepare-se para a aventura! Pressione qualquer tecla para fazer o pássaro voar. O objetivo é evitar colidir com as barreiras. A pontuação do jogador aumenta cada vez que ele passa por um par de barreiras.

## 🔄 Reiniciar o Jogo

Oh não, o pássaro colidiu com uma barreira! Mas não se preocupe, um botão de reinício aparece na tela, e o jogo reinicia após um contador regressivo.

Para mais detalhes, consulte o código fonte em [`flappy.js`](command:_github.copilot.openSymbolInFile?%5B%22flappy%2Fjs%2Fflappy.js%22%2C%22flappy.js%22%5D "flappy/js/flappy.js").