// Importa a biblioteca Phaser
import Phaser from 'phaser';
import * as back from './backEndconnector.js';
import { loginInfo } from '/loginInfo.js';



// Define as dimensões do jogo
const sizes = {
    width: 1580, // Largura do jogo
    height: 680, // Altura do jogo
} 

// definir fundo
document.body.style.backgroundColor = "white";

//
//let width;
//let height;
let callOnce = 0;
let username;
let password;

// Define uma classe para a cena do jogo
class GameScene extends Phaser.Scene {
    constructor() {
        super("scene-game"); // Chama o construtor da classe pai com o nome da cena
        this.background; // Fundo do jogo
        this.backgroundSQ2; // Segundo fundo do jogo
        this.meninocarrinho; // Personagem do jogo (menino no carrinho)
        this.homemcaixa; // Personagem do jogo (homem com caixa)
        this.btinfo; // Botão de informação
        this.btcreditos; // Botão de créditos
        this.titulo; // Título do jogo
        this.bthome; // Botão de início
        this.caixaregistadora;
        this.okbutton;
        this.seta;
        this.setaparatras;
        this.wallet;
        this.centimo1;
        this.centimos2;
        this.centimos5;
        this.centimos10;
        this.centimos20;
        this.centimos50;
        this.chapeu_8a20euros;
        this.chavena_2a4euros;
        this.banana_de10a20centimos;
        this.etiqueta;
        this.euro1;
        this.euros2;
        this.euros5_completos;
        this.euros5;
        this.euros10_completos;
        this.euros10;
        this.euros20_completos;
        this.euros20;
        this.gelado_40a120centimos;
        this.imagemDinheiro;
        this.pera_10a20centimos;
        this.tshirt_5a18euros;
        this.btloginVisivel = true;
        this.btlogoutVisivel = false;
        this.creditosMC;
        this.creditosMC2;

        this.imageList = [ "banana_de10a20centimos", 
        "chapeu_8a20euros", "chavena_2a4euros",
        "gelado_40a120centimos", "pera_10a20centimos", 
        "tshirt_5a18euros"];
    }

    preload() {
        this.load.image("backgroundSQ", "./assets/backgroundSQ.png");
        this.load.image("backgroundSQ2", "./assets/backgroundSQ2.png");
        this.load.image("meninocarrinho", "./assets/meninocarrinho.png");
        this.load.image("homemcaixa", "./assets/homemcaixa.png");
        this.load.image("btcreditos", "./assets/btcreditos.png");
        this.load.image("btinfo", "./assets/btinfo.png");
        this.load.image("titulo", "./assets/titulo.png");
        this.load.image("bthome", "./assets/bthome.png");
        this.load.image("caixaregistadora", "./assets/caixaregistadora.png");
        this.load.image("okbutton", "./assets/okbutton.png");
        this.load.image("seta", "./assets/seta.png");
        this.load.image("setaparatras", "./assets/setaparatras.png");
        this.load.image("wallet", "./assets/wallet.png");
        this.load.image("centimo1", "./assets/1centimo.png");
        this.load.image("euro1", "./assets/1euro.png");
        this.load.image("centimos2", "./assets/2centimos.png");
        this.load.image("euros2", "./assets/2euros.png");
        this.load.image("centimos5", "./assets/5centimos.png");
        this.load.image("euros5_completos", "./assets/5euros-completos.png");
        this.load.image("euros5", "./assets/5euros.png");
        this.load.image("centimos10", "./assets/10centimos.png");
        this.load.image("euros10_completos", "./assets/10euros-completos.png");
        this.load.image("euros10", "./assets/10euros.png");
        this.load.image("centimos20", "./assets/20centimos.png");
        this.load.image("euros20_completos", "./assets/20euros-completos.png");
        this.load.image("euros20", "./assets/20euros.png");
        this.load.image("centimos50", "./assets/50centimos.png");
        this.load.image("etiqueta", "./assets/etiqueta.png");
        this.load.image("imagemDinheiro", "./assets/imagemDinheiro.png");
        this.load.image("btlogin", "./assets/btlogin.png");
        this.load.image("btlogout", "./assets/btlogout.png");
        this.load.image("btnotok", "./assets/btnotok.png");
        this.load.image("btok", "./assets/btok.png");
        this.load.image("btplayagain", "./assets/btplayagain.png");
        this.load.image("login", "./assets/login.png");
        this.load.image("banana_de10a20centimos", "./assets/banana-de10a20centimos.png");
        this.load.image("chapeu_8a20euros", "./assets/chapeu-8a20euros.png");
        this.load.image("chavena_2a4euros", "./assets/chavena-2a4euros.png");
        this.load.image("gelado_40a120centimos", "./assets/gelado-40a120centimos.png");
        this.load.image("pera_10a20centimos", "./assets/pera-10a20centimos.png");
        this.load.image("tshirt_5a18euros", "./assets/tshirt-5a18euros.png");
        this.load.image("creditosMC","./assets/creditosMC.png");
        this.load.image("creditosMC2","./assets/creditosMC2.png");

    }

    create() {
        // Função para calcular a porcentagem de acertos e atualizar o texto correspondente
        const atualizarPercentagem = (valor, player) => {
            this.ola.setText("Olá " + player + "(" + valor + ")");
        };
        const obterDados = async () => {
            const { percentagem: valorPercentagem , nome: player} = await back.devolveDados(); // Obtém a percentagem usando a função devolvedados
            atualizarPercentagem(valorPercentagem, player); // Atualiza o texto da percentagem com o valor obtido
        };
        obterDados();

        const self = this;
        // Define uma variável para controlar se o menu inicial está ativo
        this.menuInicial = true;

        //width = game.config.width;
        //height = game.config.height;
        // Layout 1: Configura o fundo e os personagens para o menu inicial
        this.background = this.add.image(0,0,"backgroundSQ").setOrigin(0,0); // Fundo
        this.background.setDisplaySize(sizes.width, sizes.height); // Define o tamanho do fundo
        this.ola = this.add.text(720 ,50,{font: "bold 50px Baguet Script", fill: "#0D870F", align : 'right'});
        if(username == undefined){
            this.ola.visible = false;
        }
        else {
            if(this.menuInicial == true){
                this.ola.setFontSize(26);
                this.ola.setPosition(655,50);
            }
            this.ola.visible = true;
        }

                    
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Personagem "meninocarrinho" e sua interação
        this.meninocarrinho = this.add.image(370, 285, "meninocarrinho").setOrigin(0,0); // Personagem
        this.meninocarrinho.setDisplaySize(sizes.width-1295, sizes.height-400); // Define o tamanho do personagem
        this.meninocarrinho.setScale(1); // Define a escala do personagem
            // Configuração do evento de clique para o personagem "meninocarrinho"
            this.meninocarrinho.on("pointerup", (pointer) => {
                // Atualiza o estado do menu inicial
                this.menuInicial = false;
                this.ola.setDepth(1);
                this.ola.setFontSize(15); // Define o tamanho da fonte para 24 pixels
                this.ola.setPosition(150,60);
                this.homemcaixa.destroy();
                this.meninocarrinho.disableInteractive();

                // Configura o layout para a tela de compra
                this.backgroundSQ2 = this.add.image(0,0, "backgroundSQ2").setOrigin(0,0);
                this.backgroundSQ2.setDisplaySize(sizes.width,sizes.height);
                this.meninocarrinho2 = this.add.image(20,15, "meninocarrinho").setOrigin(0,0);
                this.meninocarrinho2.setDisplaySize(100,120);
                this.titulo = this.add.image(500,35, "titulo").setOrigin(0,0);
                this.titulo.setDisplaySize(sizes.width - 1000, sizes.height - 630);
                this.caixaregistadora = this.add.image(950,120, "caixaregistadora").setOrigin(0,0);//(+ vai para a direita, + vai para baixo)
                this.caixaregistadora.setDisplaySize(600,535);//(+ estica, + comprime)

                this.btplayagain = this.add.image(730, 420, "btplayagain").setOrigin(0, 0);
                this.btplayagain.setDisplaySize(0, 0);
                this.btplayagain.setScale(0.5, 0.5);
                this.btplayagain.setVisible(false); // Define o botão como invisível inicialmente
                
                
                this.btplayagain.setDepth(1);
                var jogarnovamente = this;
                this.okbutton = this.add.image(1070, 295, "okbutton").setOrigin(0, 0);
                this.okbutton.setDisplaySize(130, 70); // (+ estica, + comprime)
                this.okbutton.setScale(1.1, 0.9);
                this.okbutton.setInteractive();
                // Evento quando o botão é pressionado
                this.okbutton.on('pointerdown', function () {
                    this.setScale(1.05, 0.85); // Diminui o tamanho horizontal do botão ao ser pressionado
                });

                var textoTotal = this.add.text(1300, 160, '', { fontFamily: 'Arial', fontSize: 24, color: '#000000' });
                var txt = this.add.text(1063, 140, '', { fontFamily: 'Arial', fontSize: 16, color: '#000000' });
                var texto_notas5 = this.add.text(1150, 450, '', { fontFamily: 'Arial', fontSize: 20, color: '#ffffff' });
                var texto_notas10 = this.add.text(1058, 450, '', { fontFamily: 'Arial', fontSize: 20, color: '#ffffff' });
                function calcularPagamentoMinimo(precoProduto, dinheiro) {
                    // Ordena as moedas pelo valor em ordem decrescente
                    dinheiro.sort((a, b) => imagensValoresDinheiro[b].valor - imagensValoresDinheiro[a].valor);
                
                    // Inicializa o pagamento mínimo como o maior valor possível
                    var pagamentoMinimo = Number.MAX_SAFE_INTEGER;
                
                    // Função recursiva para calcular o pagamento mínimo
                    function calcular(pagamentoAtual, indiceMoeda) {
                        // Se o pagamento atual for maior ou igual ao preço do produto, atualiza o pagamento mínimo
                        if (pagamentoAtual >= precoProduto) {
                            pagamentoMinimo = Math.min(pagamentoMinimo, pagamentoAtual).toFixed(2);
                            return;
                        }
                
                        // Se não houver mais moedas disponíveis, retorna
                        if (indiceMoeda >= dinheiro.length) {
                            return;
                        }
                
                        // Tenta adicionar a moeda atual e chama a função recursivamente
                        for (var i = indiceMoeda; i < dinheiro.length; i++) {
                            calcular(pagamentoAtual + imagensValoresDinheiro[dinheiro[i]].valor, i + 1);
                        }
                    }
                
                    // Inicia o cálculo do pagamento mínimo
                    calcular(0, 0);
                
                    // Retorna o pagamento mínimo encontrado
                    return parseFloat(pagamentoMinimo);
                }
                
                // Evento quando o botão é solto
                this.okbutton.on('pointerup', function () {
                    this.setScale(1.1, 0.9); // Retorna o tamanho do botão ao normal ao soltar

                    // Verifica se há notas de 5 ou de 10 na caixa e exibe a quantidade em forma de texto
                    if (count_5 > 0) {
                        texto_notas5.setVisible(true);
                        texto_notas5.setText(count_5);
                    }
                    else {
                        texto_notas5.setVisible(false);
                    }
                    if (count_10 > 0) {
                        texto_notas10.setVisible(true);
                        texto_notas10.setText(count_10);
                    }
                    else {
                        texto_notas10.setVisible(false);
                    }

                    // Arredonda o valor total para duas casas decimais
                    total = Math.round(total * 100) / 100;
                    if(total == 0.00){
                        textoTotal.setVisible(false);
                    }
                    else {
                        textoTotal.setVisible(true);
                        textoTotal.setText('Valor: ' + total.toFixed(2)); // Exibe o valor arredondado com duas casas decimais
                    
                    }

                    // Calcula o pagamento mínimo usando as moedas disponíveis
                    //recebe o valor das moedas que tem na carteira, o preço do produto e as moedas disponiveis, array de moedasUsadas vazio inicialmente
                    var melhorPagamento = calcularPagamentoMinimo(preco_produto, moedasEscolhidasClone);
                    console.log(melhorPagamento, total);
                    // Define o texto com base no pagamento mínimo
                    if (total === melhorPagamento) {
                        txt.setVisible(true);
                        back.saveScore("+", "C");
                        obterDados();
                        // Função para obter os dados e atualizar a percentagem
                        txt.setText('Pagamento \n   mínimo \n   atingido!');
                        
                        // jogar novamente aqui:
                        jogarnovamente.btplayagain.setVisible(true);
                        // Configurar evento de clique para a seta para trás
                        jogarnovamente.btplayagain.setInteractive();
                        jogarnovamente.btplayagain.on('pointerdown', function () {
                            jogarnovamente.btplayagain.setScale(0.48, 0.48); // Diminui o tamanho horizontal do botão ao ser pressionado
                            jogarnovamente.meninocarrinho.setInteractive(true);
                            jogarnovamente.meninocarrinho.setPosition(730,320);
                            jogarnovamente.btplayagain.destroy();

                        });

                        jogarnovamente.btplayagain.on('pointerup', function () {
                            jogarnovamente.btplayagain.setScale(0.5, 0.5); // Retorna o tamanho do botão ao normal ao soltar
                            jogarnovamente.meninocarrinho.destroy();
                        });
                        

                        

                    } else if (total < melhorPagamento && total > 0) {
                        back.saveScore("-", "C");
                        obterDados();
                        txt.setVisible(true);
                        txt.setText('Pagamento \nmínimo não\n   atingido!');

                    } else if (total > melhorPagamento) {
                        back.saveScore("-", "C");
                        obterDados();
                        txt.setVisible(true);
                        txt.setText('Pagamento \n   mínimo \n superado!');
                        
                    } else {
                        txt.setVisible(false); // Oculta o texto se não houver nenhum valor na caixa
                    }
                });

                this.seta = this.add.image(200,580, "seta").setOrigin(0,0);
                this.seta.setDisplaySize(90, 60);//(+ estica, + comprime)
                this.wallet = this.add.image(50,550, "wallet").setOrigin(0,0);
                this.wallet.setDisplaySize(120,100);//(+ estica, + comprime)

                this.textocarrinho = this.add.text(150,500, "Paga com o mínimo possível.", {fontFamily: 'Arial', fontSize: '30px'}).setOrigin(0,0);

                // Configura o botão "bthome" na tela de compra
                this.bthome = this.add.image(20,410, "bthome").setOrigin(0,0);
                this.bthome.setDisplaySize(80,80);
                this.bthome.setInteractive();
                this.bthome.setScale(0.5);
                this.bthome.setInteractive();

                // Configura os eventos de interação para o botão "bthome" na tela de compra
                this.bthome.on('pointerover', () => {
                    if (this.menuInicial == false) {
                        this.tweens.add({
                            targets: this.bthome,
                            scale: { value: 0.6, duration: 100 }, // Aumenta para 5% em 200ms
                            ease: 'Linear' // Utiliza uma função de easing linear para uma transição suave
                        });
                    }
                });
                
                this.bthome.on('pointerout', () => {
                    if (this.menuInicial == false) {
                        this.tweens.add({
                            targets: this.bthome,
                            scale: { value: 0.5, duration: 100 }, // Retorna ao tamanho original em 200ms
                            ease: 'Linear'
                        });
                    }
                });

                // Configura o evento de clique para o botão "bthome" na tela de compra
                this.bthome.on("pointerup", (pointer) =>{
                    this.scene.restart(); // Inicia a cena do jogo
                    this.menuInicial = true; // Atualiza o estado do menu inicial
                });
                
                // imagem do produto:
                //const porque só pode ser chamado o random dentro desta função
                const randomIndex = Phaser.Math.Between(0, this.imageList.length - 1);
                const randomImageName = this.imageList[randomIndex];


                //const randomImageName =   "gelado_40a120centimos";
                // Adiciona a imagem carregada ao jogo
                var etiqueta;
                var randomImage;
                var valor;
                var preco_produto;
                var coords;


                // Definição das coordenadas e preços
                if (randomImageName === "banana_de10a20centimos") {
                    coords = { x: 570, y: 290 };//preço
                    preco_produto = Phaser.Math.RND.realInRange(0.10, 0.20).toFixed(2);
                    etiqueta = this.add.image(580, 300, "etiqueta").setOrigin(0,0);
                    randomImage = this.add.image(400, 150, randomImageName).setOrigin(0, 0);
                    //// Feita
                } else if (randomImageName === "chapeu_8a20euros") {
                    coords = { x: 430, y: 350 };
                    preco_produto = Phaser.Math.RND.realInRange(8.00, 20.00).toFixed(2);
                    etiqueta = this.add.image(430, 350, "etiqueta").setOrigin(0,0);
                    randomImage = this.add.image(370, 190, randomImageName).setOrigin(0, 0);
                    randomImage.setDisplaySize(300,300);
                } else if (randomImageName === "chavena_2a4euros") {
                    coords = { x: 410, y: 295 };
                    preco_produto = Phaser.Math.RND.realInRange(2.00, 4.00).toFixed(2);
                    etiqueta = this.add.image(415, 300, "etiqueta").setOrigin(0,0);
                    //esquerda/direita, cima/baixo
                    randomImage = this.add.image(400, 210, randomImageName).setOrigin(0, 0);
                } else if (randomImageName === "gelado_40a120centimos") {
                    coords = { x: 435, y: 275 };
                    preco_produto = Phaser.Math.RND.realInRange(0.40, 1.20).toFixed(2);
                    etiqueta = this.add.image(440, 280, "etiqueta").setOrigin(0,0);
                    randomImage = this.add.image(420, 160, randomImageName).setOrigin(0, 0);
                    randomImage.setDisplaySize(170,280);
                } else if (randomImageName === "pera_10a20centimos") {
                    coords = { x: 440, y: 325 };
                    preco_produto = Phaser.Math.RND.realInRange(0.10, 0.20).toFixed(2);
                    etiqueta = this.add.image(450, 330, "etiqueta").setOrigin(0,0);
                    randomImage = this.add.image(400, 150, randomImageName).setOrigin(0, 0);
                    randomImage.setDisplaySize(230,280);
                } else if (randomImageName === "tshirt_5a18euros") {
                    coords = { x: 430, y: 255 };
                    preco_produto = Phaser.Math.RND.realInRange(5.00, 18.00).toFixed(2);
                    etiqueta = this.add.image(430, 260, "etiqueta").setOrigin(0,0);
                    randomImage = this.add.image(400, 180, randomImageName).setOrigin(0, 0);
                }

                // Adiciona a etiqueta e o texto com base nas coordenadas e preço definidos
                etiqueta.setDisplaySize(280,150);
                etiqueta.angle += 180;
                
                this.etiqueta = etiqueta;
                var textoX = coords.x;
                var textoY = coords.y;
                valor = this.add.text(textoX, textoY, "Valor: " + preco_produto + "€", {
                    fontFamily: 'Arial',
                    fontSize: '30px'
                }).setOrigin(1.6, 1.2);
                valor.angle += 18;
                                

                var imagensValoresDinheiro = {
                    "centimo1": { valor: 0.01 },
                    "centimos2": { valor: 0.02 },
                    "centimos5": { valor: 0.05 },
                    "centimos10": { valor: 0.10 },
                    "centimos20": { valor: 0.20 },
                    "centimos50": { valor: 0.50 },
                    "euro1": { valor: 1.00 },
                    "euros2": { valor: 2.00 },
                    "euros5_completos": { valor: 5.00 },
                    "euros10_completos": { valor: 10.00 },
                    //"euros20_completos": { valor: 20.00 }
                };  
                
                // Lista de moedas disponíveis
                var moedasDisponiveis = Object.keys(imagensValoresDinheiro);

                // Inicializar variáveis
                var moedasEscolhidas = [];
                var valorTotalEscolhido = 0.00;

                //escolhe 5 moedas
                while (moedasEscolhidas.length < 5) {
                    // Escolher uma moeda aleatória
                    var moedaAleatoria = moedasDisponiveis[Math.floor(Math.random() * moedasDisponiveis.length)];
                    // Verificar se a moeda é uma nota e se o preço do produto é menor que 10€
                    if //((moedaAleatoria === "euros20_completos" || 
                        (moedaAleatoria === "euros10_completos" 
                        //|| moedaAleatoria === "euros5_completos"
                        && preco_produto < 10) {

                        continue; // Se for uma nota e o preço do produto for menor que 10€, continue para a próxima iteração
                        //fica muito facil se for notas e o preço do produto for inferior a 10 caso as moedas pequenas nao cheguem
                    }
                    // Adicionar a moeda escolhida à lista de moedas escolhidas
                    moedasEscolhidas.push(moedaAleatoria);
                    // Atualiza o valor total escolhido
                    valorTotalEscolhido += imagensValoresDinheiro[moedaAleatoria].valor;
                }
                
                // Verificar se o valor total escolhido é menor que o preço do produto
                if (valorTotalEscolhido < preco_produto) {
                    // Adiciona moedas/notas até que o valor total seja igual ou superior que o preço do produto
                    while (valorTotalEscolhido < preco_produto) {
                        var moedaAleatoria = moedasDisponiveis[Math.floor(Math.random() * moedasDisponiveis.length)];
                        moedasEscolhidas.push(moedaAleatoria);
                        valorTotalEscolhido += imagensValoresDinheiro[moedaAleatoria].valor;
                    }
                }
                //ordenação decrescente
                moedasEscolhidas.sort((a, b) => imagensValoresDinheiro[a].valor - imagensValoresDinheiro[b].valor);
                
                var moedasEscolhidasClone = moedasEscolhidas.slice();
        

                var total = 0;
                //contador para separar uma moeda/nota da anterior
                var count_cent1 = 0;
                var count_cent2 = 0;
                var count_cent5 = 0;
                var count_cent10 = 0;
                var count_cent20 = 0;
                var count_cent50 = 0;
                var count_euro1 = 0;
                var count_euros2 = 0;
                var count_euros5_completos = 0;
                var count_euros10_completos = 0;

                var count_5 = 0;
                var count_10 = 0


                //var count_euros20_completos = 0;
                var moedasCaixa = [];
                // Configurar moedas para serem arrastáveis e adicionar eventos de drag para cada moeda
                moedasEscolhidas.forEach(function(moeda) {
                    let novaMoeda;
                    switch (moeda) {
                        case "centimo1":
                            novaMoeda = this.add.image(750 + 5 * count_cent1, 620 - 5 * count_cent1, "centimo1").setOrigin(0, 0);
                            count_cent1++;
                            break;
                        case "centimos2":
                            novaMoeda = this.add.image(680 + 5 * count_cent2, 620 - 5 * count_cent2, "centimos2").setOrigin(0, 0);
                            count_cent2++;
                            break;
                        case "centimos5":
                            novaMoeda = this.add.image(610 + 5 * count_cent5, 620 - 5 * count_cent5, "centimos5").setOrigin(0, 0);
                            count_cent5++;
                            break;
                        case "centimos10":
                            novaMoeda = this.add.image(540 + 5 * count_cent10, 620 - 5 * count_cent10, "centimos10").setOrigin(0, 0);
                            count_cent10++;
                            break;
                        case "centimos20":
                            novaMoeda = this.add.image(750 + 5 * count_cent20, 550 - 5 * count_cent20, "centimos20").setOrigin(0, 0);
                            count_cent20++;
                            break;
                        case "centimos50":
                            novaMoeda = this.add.image(680 + 5 * count_cent50, 550 - 5 * count_cent50, "centimos50").setOrigin(0, 0);
                            count_cent50++;
                            break;
                        case "euro1":
                            novaMoeda = this.add.image(610 + 5 * count_euro1, 550 - 5 * count_euro1, "euro1").setOrigin(0, 0);
                            count_euro1++;
                            break;
                        case "euros2":
                            novaMoeda = this.add.image(540 + 5 * count_euros2, 550 - 5 * count_euros2, "euros2").setOrigin(0, 0);
                            count_euros2++;
                            break;
                        case "euros5_completos":
                            novaMoeda = this.add.image(300 + 5 * count_euros5_completos, 560 - 5 * count_euros5_completos, "euros5_completos").setOrigin(0, 0);
                            count_euros5_completos++;
                            break;
                        case "euros10_completos":
                            novaMoeda = this.add.image(380 + 5 * count_euros10_completos, 560 - 5 * count_euros10_completos, "euros10_completos").setOrigin(0, 0);
                            count_euros10_completos++;
                            break;
                    }

                    if (novaMoeda) {
                        if(moeda == "euros5_completos" ||
                        moeda == "euros10_completos"){
                            novaMoeda.setDisplaySize(65, 100);
                        }
                        //moeda != "euros20_completos")
                        else {
                            novaMoeda.setDisplaySize(50, 50);
                        }
                        novaMoeda.setInteractive({ draggable: true });

                        var initX;
                        var initY;
                        var originalScale;

                        //ao arrastar muda de cor
                        novaMoeda.on('dragstart', function(pointer) {
                            initX = novaMoeda.x;
                            initY = novaMoeda.y;
                            originalScale = novaMoeda.scaleX;
                        });

                        novaMoeda.on('dragend', function(pointer) {
                            function getRandomNumber(min, max) {
                                return Math.random() * (max - min) + min;
                            }
                            
                            // Adiciona um valor aleatório entre 0 e 30 para x e y
                            var randomOffsetX = getRandomNumber(0, 30);
                            var randomOffsetY = getRandomNumber(0, 30);
                            var randomXnotas = getRandomNumber(-10,10);
                            
                            // Verifica se a posição final está dentro das coordenadas especificadas
                            if (novaMoeda.x > 1020 && novaMoeda.x < 1430 && novaMoeda.y > 380 && novaMoeda.y < 580) {
                                moedasEscolhidas.pop(novaMoeda);
                                // Define a posição final e outras propriedades da moeda
                                if(moeda == "centimo1") {
                                    novaMoeda.setPosition(1025 + randomOffsetX, 578 - randomOffsetY);
                                    novaMoeda.setScale(0.2);
                                    total += 0.01;
                                } else if(moeda == "centimos2") {
                                    novaMoeda.setPosition(1115 + randomOffsetX, 575 - randomOffsetY);
                                    novaMoeda.setScale(0.2);
                                    total += 0.02;
                                } else if(moeda == "centimos5") {
                                    novaMoeda.setPosition(1210 + randomOffsetX, 571 - randomOffsetY);
                                    novaMoeda.setScale(0.20);
                                    total += 0.05;
                                } else if(moeda == "centimos10") {
                                    novaMoeda.setPosition(1310 + randomOffsetX, 569 - randomOffsetY);
                                    novaMoeda.setScale(0.19);
                                    total += 0.10;
                                } else if(moeda == "centimos20") {
                                    novaMoeda.setPosition(1410 + randomOffsetX, 567 - randomOffsetY);
                                    novaMoeda.setScale(0.18);
                                    total += 0.20;
                                } else if(moeda == "centimos50") {
                                    novaMoeda.setPosition(1410 + randomOffsetX, 500 - randomOffsetY);
                                    novaMoeda.setScale(0.17);
                                    total += 0.50;
                                } else if(moeda == "euro1") {
                                    novaMoeda.setPosition(1310 + randomOffsetX, 500 - randomOffsetY);
                                    novaMoeda.setScale(0.14);
                                    total += 1.0;
                                } else if(moeda == "euros2") {
                                    novaMoeda.setPosition(1210 + randomOffsetX, 500 - randomOffsetY);
                                    novaMoeda.setScale(0.15);
                                    total += 2.0;
                                } else if(moeda == "euros5_completos") {
                                    novaMoeda.setPosition(1127 + randomXnotas, 477);
                                    novaMoeda.setTexture('euros5');
                                    novaMoeda.setScale(0.3);
                                    total += 5.0;
                                    count_5++;
                                } else if(moeda == "euros10_completos") {
                                    novaMoeda.setPosition(1035 + randomXnotas, 477);
                                    novaMoeda.setTexture('euros10');
                                    novaMoeda.setScale(0.3);
                                    total += 10.0;
                                    count_10++;
                                }
                                // Adicionar a moeda arrastada ao array de moedas arrastadas
                                moedasCaixa.push({
                                    moeda: novaMoeda,
                                    x: initX,
                                    y: initY,
                                    scale: originalScale
                                });
                                novaMoeda.disableInteractive();
                                
                            } else {
                                // Caso contrário, retorna à posição original
                                novaMoeda.setPosition(initX, initY); 

                            }
                        });
                        //atualiza a posição
                        this.input.on('drag', function(pointer, gameObject, dragX, dragY) {
                            gameObject.x = dragX;
                            gameObject.y = dragY;

                        });
                    }
                }, this);
            

                var originalXseta = 1070;
                var originalYseta = 240;
                this.setaparatras = this.add.image(originalXseta, originalYseta, "setaparatras").setOrigin(0,0);
                this.setaparatras.setDisplaySize(130, 50); //(+ estica, + comprime)
                this.setaparatras.setScale(1.1, 0.9);
                this.setaparatras.setInteractive();

                // Configurar evento de clique para a seta para trás
                this.setaparatras.on('pointerdown', function () {
                    this.setScale(1.05, 0.85); // Diminui o tamanho horizontal do botão ao ser pressionado
                });

                this.setaparatras.on('pointerup', function () {
                    this.setScale(1.1, 0.9); // Retorna o tamanho do botão ao normal ao soltar
                    if (moedasCaixa.length > 0) {
                        // apaga o texto e o valor anteriormente escolhido, caso estejam visiveis
                        txt.setVisible(false);
                        textoTotal.setVisible(false);
                        //
                        var ultima = moedasCaixa.pop();
                        if (ultima.moeda.texture.key == "euros5") {
                            ultima.moeda.setScale(0.33, 0.28);
                            ultima.moeda.x = ultima.x;
                            ultima.moeda.y = ultima.y;
                            ultima.moeda.setTexture("euros5_completos");
                            total -= imagensValoresDinheiro[ultima.moeda.texture.key].valor;
                            count_5--;
                        }
                        else if (ultima.moeda.texture.key == "euros10") {
                            ultima.moeda.setScale(0.33,0.28);
                            ultima.moeda.x = ultima.x;
                            ultima.moeda.y = ultima.y;
                            ultima.moeda.setTexture("euros10_completos");
                            total -= imagensValoresDinheiro[ultima.moeda.texture.key].valor;
                            count_10--;
                        }
                        else {
                            ultima.moeda.x = ultima.x;
                            ultima.moeda.y = ultima.y;
                            ultima.moeda.setScale(ultima.scale); // Restaura a escala original
                            total -= imagensValoresDinheiro[ultima.moeda.texture.key].valor;
                        }
                        ultima.moeda.setInteractive(true);
                    }
                });
        });

        
            
        
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        // Personagem "homemcaixa" e sua interação
        this.homemcaixa = this.add.image(850,242,"homemcaixa").setOrigin(0,0);
        this.homemcaixa.setDisplaySize(sizes.width-1295, sizes.height-350);
        this.homemcaixa.setInteractive();
        if(this.menuInicial == true) this.homemcaixa.setScale(1); // Define a escala do personagem


        // Configuração do evento de clique para o personagem "homemcaixa"
        this.homemcaixa.on("pointerup", (pointer) => {
            // Atualiza o estado do menu inicial
            this.ola.setDepth(1);
            this.ola.setFontSize(15); // Define o tamanho da fonte para 24 pixels
            this.ola.setPosition(150,60);
            this.menuInicial = false;
            this.meninocarrinho.destroy();
            this.homemcaixa.disableInteractive();

            // Configura o layout para a tela de venda
            this.backgroundSQ2 = this.add.image(0,0, "backgroundSQ2").setOrigin(0,0);
            this.backgroundSQ2.setDisplaySize(sizes.width,sizes.height);
            this.homemcaixa2 = this.add.image(15,15, "homemcaixa").setOrigin(0,0);
            this.homemcaixa2.setDisplaySize(100,120);
            this.titulo = this.add.image(500,35, "titulo").setOrigin(0,0);
            this.titulo.setDisplaySize(sizes.width - 1000, sizes.height - 630);
            this.caixaregistadora = this.add.image(950,120, "caixaregistadora").setOrigin(0,0);
            /////////////////////////////////(+ vai para a direita, + vai para baixo)
            this.caixaregistadora.setDisplaySize(600,535);
            
            ///
            this.okbutton = this.add.image(1070, 295, "okbutton").setOrigin(0, 0);
            this.okbutton.setDisplaySize(130, 70); // (+ estica, + comprime)
            this.okbutton.setScale(1.1, 0.9);

            // Define as interações do mouse
            this.okbutton.setInteractive();

                        
            // Evento quando o botão é pressionado
            this.okbutton.on('pointerdown', function () {
                this.setScale(1.05, 0.85); // Diminui o tamanho horizontal do botão ao ser pressionado
            });

            var textoTotal = this.add.text(1305, 170, '', { fontFamily: 'Arial', fontSize: 24, color: '#000000' });
            var txt = this.add.text(1062, 160, '', { fontFamily: 'Arial', fontSize: 24, color: '#000000' });
            var total_troco = 0;

            this.btplayagain = this.add.image(730, 420, "btplayagain").setOrigin(0, 0);
            this.btplayagain.setDisplaySize(0, 0);
            this.btplayagain.setScale(0.5, 0.5);
            this.btplayagain.setVisible(false); // Define o botão como invisível inicialmente
            
            this.btplayagain.setDepth(1);

            var jogarnovamente = this;
            
            // Evento quando o botão é solto
            this.okbutton.on('pointerup', function () {
                this.setScale(1.1, 0.9); // Retorna o tamanho do botão ao normal ao soltar

                // Arredonda o valor total para duas casas decimais
                total_troco = Math.round(total_troco * 100) / 100;
                if(total_troco == 0.00){
                    textoTotal.setVisible(false);
                    txt.setVisible(false);
                }
                else {
                    textoTotal.setVisible(true);
                    textoTotal.setText('Troco: ' + total_troco.toFixed(2)); // Exibe o valor arredondado com duas casas decimais

                    if(total_troco === trocoCerto){
                        back.saveScore("+", "V");
                        obterDados();
                        txt.setText('Parabéns!!!');
                        txt.setVisible(true);
                        // jogar novamente aqui:
                        jogarnovamente.btplayagain.setVisible(true);
                        // Configurar evento de clique para a seta para trás
                        jogarnovamente.btplayagain.setInteractive();
                        jogarnovamente.btplayagain.on('pointerdown', function () {
                            jogarnovamente.btplayagain.setScale(0.48, 0.48); // Diminui o tamanho horizontal do botão ao ser pressionado
                            jogarnovamente.homemcaixa.setInteractive(true);
                            jogarnovamente.homemcaixa.setPosition(730,320);
                            jogarnovamente.btplayagain.destroy();

                        });

                        jogarnovamente.btplayagain.on('pointerup', function () {
                            jogarnovamente.btplayagain.setScale(0.5, 0.5); // Retorna o tamanho do botão ao normal ao soltar
                            jogarnovamente.homemcaixa.destroy();
                        });
                    }
                    else {
                        back.saveScore("-","V");
                        obterDados();
                        txt.setVisible(true);
                        txt.setText('Quase!!');
                    }
                }
                
            });
            ////////////////////(+ estica, + comprime)
            this.seta = this.add.image(200,580, "seta").setOrigin(0,0);
            this.seta.setDisplaySize(90, 60);
            
            this.wallet = this.add.image(50,550, "wallet").setOrigin(0,0);
            this.wallet.setDisplaySize(120,100);
        
            ///
            this.textocaixa = this.add.text(1170,445, "Dá o troco.", {fontFamily: 'Arial', fontSize: '30px'}).setOrigin(0,0);
            
            

            // Configura o botão "bthome" na tela de venda
            this.bthome = this.add.image(20,410, "bthome").setOrigin(0,0);
            this.bthome.setDisplaySize(80,80);
            this.bthome.setScale(0.5);
            this.bthome.setInteractive();

            // Configura os eventos de interação para o botão "bthome" na tela de venda
            this.bthome.on('pointerover', () => {
                if (this.menuInicial == false) {
                    this.tweens.add({
                        targets: this.bthome,
                        scale: { value: 0.6, duration: 200 }, // Aumenta para 5% em 200ms
                        ease: 'Linear' // Utiliza uma função de easing linear para uma transição suave
                    });
                }
            });
            
            this.bthome.on('pointerout', () => {
                if (this.menuInicial == false) {
                    this.tweens.add({
                        targets: this.bthome,
                        scale: { value: 0.5, duration: 200 }, // Retorna ao tamanho original em 200ms
                        ease: 'Linear'
                    });
                }
            });
            
            // Configura o evento de clique para o botão "bthome" na tela de venda
            this.bthome.on("pointerup", (pointer) =>{
                this.scene.restart(); // Inicia a cena do jogo
                this.menuInicial = true; // Atualiza o estado do menu inicial
            });

            // imagem do produto:
            //const porque só pode ser chamado o random dentro desta função
            const randomIndex = Phaser.Math.Between(0, this.imageList.length - 1);
            const randomImageName = this.imageList[randomIndex];
            var etiquetaCoords = {
                //x para esquerda/direita
                //y para cima/baixo
                "banana_de10a20centimos": { x: 560, y: 350 },
                "chapeu_8a20euros": { x: 450, y: 350 },
                "chavena_2a4euros": { x: 410, y: 300 },
                "gelado_40a120centimos": { x: 450, y: 300 },
                "pera_10a20centimos": { x: 470, y: 350 },
                "tshirt_5a18euros": { x: 450, y: 250 }
            };
            // Adiciona a imagem carregada ao jogo
            this.etiqueta = this.add.image(400, 210, "etiqueta").setOrigin(0,0);
            this.etiqueta.setDisplaySize(280,150);
            this.etiqueta.angle += 180;
            this.randomImage = this.add.image(400, 210, randomImageName).setOrigin(0, 0);
            this.randomImage.setDisplaySize(200, 200);
            
            // Verifica se o nome da imagem está na lista de coordenadas e define as coordenadas correspondentes
            if (randomImageName in etiquetaCoords) {
                var coords = etiquetaCoords[randomImageName];
                this.etiqueta.setPosition(coords.x, coords.y);
                //Calcula as coordenadas para o texto com base no centro da etiqueta
                var textoX = coords.x;
                var textoY = coords.y;
                //valor base do valor aleatorio
                var preco_produto = 0;
            
                if (randomImageName === "banana_de10a20centimos") {
                    preco_produto = Phaser.Math.RND.realInRange(0.10, 0.20).toFixed(2);
                } else if (randomImageName === "chapeu_8a20euros") {
                    preco_produto = Phaser.Math.RND.realInRange(8.00, 20.00).toFixed(2);
                } else if (randomImageName === "chavena_2a4euros") {
                    preco_produto = Phaser.Math.RND.realInRange(2.00, 4.00).toFixed(2);
                } else if (randomImageName === "gelado_40a120centimos") {
                    preco_produto = Phaser.Math.RND.realInRange(0.40, 1.20).toFixed(2);
                } else if (randomImageName === "pera_10a20centimos") {
                    preco_produto = Phaser.Math.RND.realInRange(0.10, 0.20).toFixed(2);
                } else if (randomImageName === "tshirt_5a18euros") {
                    preco_produto = Phaser.Math.RND.realInRange(5.00, 18.00).toFixed(2);
                }
            
                // Adiciona o texto com o valor aleatório dentro da etiqueta
                this.valor = this.add.text(textoX, textoY, "Valor: " + preco_produto + "€", {
                    fontFamily: 'Arial',
                    fontSize: '30px'
                }).setOrigin(1.6, 1.2);
                this.valor.angle += 19; 
                
                // Cálculo do pagamento do cliente
                var valorProduto = parseFloat(preco_produto);

                function getRandomNumber(min, max) {
                    return Math.random() * (max - min) + min;
                }
                
                // Adiciona um valor aleatório entre 0 e 30 para x e y
                var randomSoma = getRandomNumber(0, 5);

                var pagamentoCliente = Math.ceil(valorProduto + randomSoma); // arredonda para as unidades para ser facil dar troco para as crianças
                var textoCaixa = this.add.text(1300, 150, "Pagamento : " + pagamentoCliente.toFixed(2),  { fontFamily: 'Arial', fontSize: 15, color: '#000000' });
                
                var troco = (pagamentoCliente - valorProduto).toFixed(2);
                var moedasDisponiveis = {
                    "euros10_completos": { x: 1035, y: 477, valor : 10.00, escala : 0.28},
                    "euros5_completos": { x: 1127, y: 477 , valor: 5.00, escala : 0.28},
                    "euros2": { x: 1210, y: 500 , valor: 2.00, escala: 0.15},
                    "euro1": { x: 1310, y: 500 , valor: 1.00, escala: 0.14},
                    "centimos50": { x: 1410, y: 500 , valor: 0.50, escala: 0.17},
                    "centimos20": { x: 1410, y: 567, valor: 0.20, escala : 0.18},
                    "centimos10": { x: 1310, y: 569, valor: 0.10, escala : 0.19},
                    "centimos5": { x: 1210, y: 571, valor: 0.05, escala : 0.20},
                    "centimos2": { x: 1115, y: 575, valor: 0.02, escala: 0.20},
                    "centimo1": { x: 1025, y: 578 , valor: 0.01, escala: 0.20}};
                
                    
                var trocoCerto = 0.00; 
                var moedasEscolhidas = [];
                
                for (var chave in moedasDisponiveis) {
                    var moeda = moedasDisponiveis[chave];
                    var moedaValor = moedasDisponiveis[chave].valor;

                    while (moedaValor <= troco && troco > 0) {
                        moedasEscolhidas.push(moeda); // Adiciona a moeda ao troco
                        trocoCerto += moedaValor; // Atualiza o troco certo
                        troco -= moedaValor; // Subtrai o valor da moeda do troco restante
                        troco = parseFloat(troco.toFixed(2)); // Arredonda o troco para duas casas decimais
                        trocoCerto = parseFloat(trocoCerto.toFixed(2));
                    }
                }

                while (moedasEscolhidas.length < 11) {
                    var moedaAleatoria = moedasDisponiveis[Object.keys(moedasDisponiveis)[Math.floor(Math.random() * Object.keys(moedasDisponiveis).length)]];
                    moedasEscolhidas.push(moedaAleatoria);
                }

                for (var i = 0; i < moedasEscolhidas.length; i++) {
                    var moedaAtual = moedasEscolhidas[i]; // Acesse a moeda atual da lista
                    var valorMoeda = moedaAtual.valor; // Obtenha o valor da moeda atual
                    var posicaoX = moedaAtual.x; // Obtenha a posição X da moeda do objeto moedasDisponiveis
                    var posicaoY = moedaAtual.y; // Obtenha a posição Y da moeda do objeto moedasDisponiveis
                    var escalaMoeda = moedaAtual.escala; // Obtenha a escala da moeda do objeto moedasDisponiveis
                    
                    var randomOffsetX = getRandomNumber(0, 15);
                    var randomOffsetY = getRandomNumber(0, 15);
                    var randomXnotas = getRandomNumber(-10, 10);
                    let novaMoeda;
                    var moedasCarteira = [];
                
                    switch (valorMoeda) {
                        case 0.01:
                            novaMoeda = this.add.image(posicaoX + randomOffsetX, posicaoY - randomOffsetY, "centimo1").setOrigin(0, 0).setScale(escalaMoeda);
                            break;
                        case 0.02:
                            novaMoeda = this.add.image(posicaoX + randomOffsetX, posicaoY - randomOffsetY, "centimos2").setOrigin(0, 0).setScale(escalaMoeda);
                            break;
                        case 0.05:
                            novaMoeda = this.add.image(posicaoX + randomOffsetX, posicaoY - randomOffsetY, "centimos5").setOrigin(0, 0).setScale(escalaMoeda);
                            break;
                        case 0.10:
                            novaMoeda = this.add.image(posicaoX + randomOffsetX, posicaoY - randomOffsetY, "centimos10").setOrigin(0, 0).setScale(escalaMoeda);
                            break;
                        case 0.20:
                            novaMoeda = this.add.image(posicaoX + randomOffsetX, posicaoY - randomOffsetY, "centimos20").setOrigin(0, 0).setScale(escalaMoeda);
                            break;
                        case 0.50:
                            novaMoeda = this.add.image(posicaoX + randomOffsetX, posicaoY - randomOffsetY, "centimos50").setOrigin(0, 0).setScale(escalaMoeda);
                            break;
                        case 1.00:
                            novaMoeda = this.add.image(posicaoX + randomOffsetX, posicaoY - randomOffsetY, "euro1").setOrigin(0, 0).setScale(escalaMoeda);
                            break;
                        case 2.00:
                            novaMoeda = this.add.image(posicaoX + randomOffsetX, posicaoY - randomOffsetY, "euros2").setOrigin(0, 0).setScale(escalaMoeda);
                            break;
                        case 5.00:
                            novaMoeda = this.add.image(posicaoX + randomOffsetX, posicaoY, "euros5").setOrigin(0, 0).setScale(escalaMoeda);
                            break;
                        case 10.00:
                            novaMoeda = this.add.image(posicaoX + randomXnotas, posicaoY, "euros10").setOrigin(0, 0).setScale(escalaMoeda);
                            break;
                    }
                
                    if (novaMoeda) {
                        novaMoeda.setInteractive({ draggable: true });

                        // Variáveis para armazenar a posição inicial e a escala original da moeda
                        var initX;
                        var initY;
                        var originalScale;
                        var total = 0;

                        var posicaoFinal = {
                            "euros10_completos": { x: 380, y: 575, s: 5, valor : 10.00},
                            "euros5_completos": { x: 300, y: 575, s: 5, valor : 5.00},
                            "euros2": { x: 540, y: 550, s: 5, valor : 2.00},
                            "euro1": { x: 610, y: 550, s: 5, valor : 1.00},
                            "centimos50": { x: 680, y: 550, s: 5, valor : 0.50},
                            "centimos20": { x: 750, y: 550, s: 5, valor : 0.20},
                            "centimos10": { x: 540, y: 620, s: 5, valor : 0.10},
                            "centimos5": { x: 610, y: 620, s: 5, valor : 0.05},
                            "centimos2": { x: 680, y: 620, s: 5, valor : 0.02},
                            "centimo1": { x: 750, y: 620, s: 5, valor : 0.01}};       
                
                        // Evento 'dragstart' para iniciar o arrasto
                        novaMoeda.on('dragstart', function(pointer) {
                            // Salva a posição inicial e a escala original da moeda
                            initX = novaMoeda.x;
                            initY = novaMoeda.y;
                            originalScale = novaMoeda.scaleX;     
                        });
                
                        // Evento 'drag' para arrastar a moeda
                        novaMoeda.on('drag', function(pointer, dragX, dragY) {
                            // Define a nova posição da moeda com base na posição do arrasto
                            novaMoeda.x = dragX;
                            novaMoeda.y = dragY;
                        });
                        
                        // Evento 'dragend' para finalizar o arrasto
                        novaMoeda.on('dragend', function(pointer) {
                            // Verifica se a posição final está dentro das coordenadas especificadas
                            if (novaMoeda.x < 950 && novaMoeda.y > 480) {
                                // Define a nova posição das moedas
                                if(novaMoeda.texture.key === "euros5" || novaMoeda.texture.key === "euros5_completos"){
                                    novaMoeda.setTexture('euros5_completos');
                                    novaMoeda.setDisplaySize(65, 100);
                                }
                                else if (novaMoeda.texture.key === "euros10" || novaMoeda.texture.key === "euros10_completos"){
                                    novaMoeda.setTexture('euros10_completos');
                                    novaMoeda.setDisplaySize(65, 100);
                                }
                                    else {
                                        novaMoeda.setDisplaySize(50, 50);
                                    }
                                novaMoeda.setPosition(posicaoFinal[novaMoeda.texture.key].x + posicaoFinal[novaMoeda.texture.key].s * 5, posicaoFinal[novaMoeda.texture.key].y - posicaoFinal[novaMoeda.texture.key].s * 5);
                                posicaoFinal[novaMoeda.texture.key].s--;
                                total_troco += posicaoFinal[novaMoeda.texture.key].valor;

                                moedasCarteira.push({
                                    moeda: novaMoeda,
                                    valor: posicaoFinal[novaMoeda.texture.key].valor,
                                    x: initX,
                                    y: initY,
                                    scale: originalScale
                                });
                                novaMoeda.disableInteractive();

                            } else {
                                // Caso contrário, retorna à posição inicial e à escala original
                                novaMoeda.setPosition(initX, initY);
                                novaMoeda.setScale(originalScale);
                            }
                        });
                    }
                }
                };
                //
                var originalXseta = 1070;
                var originalYseta = 240;
                this.setaparatras = this.add.image(originalXseta, originalYseta, "setaparatras").setOrigin(0,0);
                this.setaparatras.setDisplaySize(130, 50);//(+ estica, + comprime)
                this.setaparatras.setScale(1.1,0.9);
                this.setaparatras.setInteractive();

                this.setaparatras.on('pointerdown', function(){
                    this.setScale(1.05, 0.85); // Diminui o tamanho horizontal do botão ao ser pressionado
                });
                this.setaparatras.on('pointerup', function () {
                    this.setScale(1.1, 0.9); // Retorna o tamanho do botão ao normal ao soltar
                    
                    if (moedasCarteira.length > 0){
                        var ultima =  moedasCarteira.pop();
                        if (ultima.moeda.texture.key == "euros5_completos") {
                            total_troco -= posicaoFinal[ultima.moeda.texture.key].valor;
                            ultima.moeda.x = ultima.x;
                            ultima.moeda.y = ultima.y;
                            ultima.moeda.setScale(0.3); // Restaura a escala original
                            ultima.moeda.setTexture("euros5");
                        }
                        else if (ultima.moeda.texture.key == "euros10_completos") {
                            total_troco -= posicaoFinal[ultima.moeda.texture.key].valor;
                            ultima.moeda.x = ultima.x;
                            ultima.moeda.y = ultima.y;
                            ultima.moeda.setScale(0.3); // Restaura a escala original
                            ultima.moeda.setTexture("euros10");
                        }
                        else {
                            ultima.moeda.x = ultima.x;
                            ultima.moeda.y = ultima.y;
                            ultima.moeda.setScale(ultima.scale); // Restaura a escala original
                            total_troco -= posicaoFinal[ultima.moeda.texture.key].valor;
                        }
                        ultima.moeda.setInteractive(true); // Torna a moeda interativa novamente
                    }
                });
        });

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        // Configura os eventos de interação para os botões "homemcaixa" e "meninocarrinho"
        // para aumentar de tamanho quando o cursor estiver sobre eles
        this.homemcaixa.setInteractive();
        this.meninocarrinho.setInteractive();

        this.homemcaixa.on('pointerover', () => {
            if (this.menuInicial == true) {
                this.tweens.add({
                    targets: this.homemcaixa,
                    scale: { value: 1.05, duration: 100 }, // Aumenta para 5% em 200ms
                    ease: 'Linear' // Utiliza uma função de easing linear para uma transição suave
                });
            }
        });
        
        this.homemcaixa.on('pointerout', () => {
            if (this.menuInicial == true) {
                this.tweens.add({
                    targets: this.homemcaixa,
                    scale: { value: 1, duration: 100 }, // Retorna ao tamanho original em 200ms
                    ease: 'Linear'
                });
            }
        });

        this.meninocarrinho.on('pointerover', () => {
            if (this.menuInicial == true) {
                this.tweens.add({
                    targets: this.meninocarrinho,
                    scale: { value: 1.05, duration: 200 }, // Aumenta para 5% em 200ms
                    ease: 'Linear' // Utiliza uma função de easing linear para uma transição suave
                });
            }
        });
        
        this.meninocarrinho.on('pointerout', () => {
            if (this.menuInicial == true) {
                this.tweens.add({
                    targets: this.meninocarrinho,
                    scale: { value: 1, duration: 200 }, // Retorna ao tamanho original em 200ms
                    ease: 'Linear'
                });
            }
        });
        
        // Configura os botões "btinfo" e "btcreditos" e o título do jogo
        this.btinfo = this.add.image(1450,490,"btinfo").setOrigin(0,0);
        this.btinfo.setDisplaySize(0,0);
        this.btinfo.setScale(0.5);
        this.btinfo.setInteractive();
        
        this.btinfo.on('pointerover', () => {
            if (this.menuInicial == true) {
                this.tweens.add({
                    targets: this.btinfo,
                    scale: { value: 0.6, duration: 200 }, // Aumenta para 5% em 200ms
                    ease: 'Linear' // Utiliza uma função de easing linear para uma transição suave
                });
            }
        });
        
        this.btinfo.on('pointerout', () => {
            if (this.menuInicial == true) {
                this.tweens.add({
                    targets: this.btinfo,
                    scale: { value: 0.5, duration: 200 }, // Retorna ao tamanho original em 200ms
                    ease: 'Linear'
                });
            }
        });
        this.btinfo.on('pointerdown', () => {
            if (this.menuInicial == true) {
                this.creditosMC2 = this.add.image(500, 15, "creditosMC").setOrigin(0, 0);
                this.creditosMC2.setDisplaySize(650, 650);
                this.meninocarrinho.disableInteractive();
                this.btlogin.disableInteractive();
                this.btinfo.visible = false;
                this.btcreditos.disableInteractive();
                this.homemcaixa.disableInteractive();
                
                this.btnotok = this.add.image(1050, 30, "btnotok").setOrigin(0, 0);
                this.btnotok.setScale(0.6);
                this.btnotok.setInteractive();
                
                // Adiciona evento de clique para btnotok
                this.btnotok.on('pointerdown', () => {
                    if (this.menuInicial == true) {
                        // Destroi os elementos de crédito
                        this.creditosMC2.destroy();
                        this.btnotok.destroy();
                        
                        // Restaura a interatividade dos personagens
                        this.meninocarrinho.setInteractive();
                        this.homemcaixa.setInteractive();
                        this.btlogin.setInteractive();
                        this.btinfo.visible = true;
                        this.btcreditos.setInteractive();
                    }
                });
            }
        });

        this.btcreditos = this.add.image(1450,580,"btcreditos").setOrigin(0,0);
        this.btcreditos.setDisplaySize(0,0);
        this.btcreditos.setScale(0.5);
        this.btcreditos.setInteractive();

        this.btcreditos.on('pointerover', () => {
            if (this.menuInicial == true) {
                this.tweens.add({
                    targets: this.btcreditos,
                    scale: { value: 0.6, duration: 200 }, // Aumenta para 5% em 200ms
                    ease: 'Linear' // Utiliza uma função de easing linear para uma transição suave
                });
            }
        });
        
        this.btcreditos.on('pointerout', () => {
            if (this.menuInicial == true) {
                this.tweens.add({
                    targets: this.btcreditos,
                    scale: { value: 0.5, duration: 200 }, // Retorna ao tamanho original em 200ms
                    ease: 'Linear'
                });
            }
        });
        this.btcreditos.on('pointerdown', () => {
            if (this.menuInicial == true) {
                this.creditosMC = this.add.image(500, 15, "creditosMC").setOrigin(0, 0);
                this.creditosMC.setDisplaySize(650, 650);
                this.meninocarrinho.disableInteractive();
                this.homemcaixa.disableInteractive();
                this.btlogin.disableInteractive();
                this.btinfo.disableInteractive();
                this.btcreditos.visible = false;
                
                this.btnotok = this.add.image(1050, 30, "btnotok").setOrigin(0, 0);
                this.btnotok.setScale(0.6);
                this.btnotok.setInteractive();
                
                // Adiciona evento de clique para btnotok
                this.btnotok.on('pointerdown', () => {
                    if (this.menuInicial == true) {
                        // Destroi os elementos de crédito
                        this.creditosMC.destroy();
                        this.btnotok.destroy();
                        
                        // Restaura a interatividade dos personagens
                        this.meninocarrinho.setInteractive();
                        this.homemcaixa.setInteractive();
                        this.btlogin.setInteractive();
                        this.btinfo.setInteractive();
                        this.btcreditos.visible = true;
                    }
                });
            }
        });
        
        this.titulo = this.add.image(500,100, "titulo").setOrigin(0,0);
        this.titulo.setDisplaySize(sizes.width - 1000, sizes.height - 630);

        this.btlogin = this.add.image(1450, 400, "btlogin").setOrigin(0,0);
        this.btlogin.setDisplaySize(0,0);
        this.btlogin.setScale(0.5);
        this.btlogin.setInteractive();

        // Criar btlogout por cima de btlogin
        this.btlogout = this.add.image(1450, 400, "btlogout").setOrigin(0, 0);
        this.btlogout.setScale(0.5);
        this.btlogout.setVisible(false);
        this.btlogout.setInteractive();

        if(this.btloginVisivel == true){
        this.btlogin.on('pointerdown', () => {
            if (this.menuInicial == true) {
                this.meninocarrinho.disableInteractive();
                this.homemcaixa.disableInteractive();

                // Tornar btlogin invisível e desativado
                this.btloginVisivel = false;
                //this.btlogoutVisivel = true;
                this.btlogin.setVisible(false);
                this.btlogin.disableInteractive();
                //this.showBtLogout();


                this.btlogout.on('pointerdown', () => {
                    if (this.menuInicial == true) {
                        // Desativar e tornar invisível o botão btlogout
                        this.btlogout.destroy();
                        this.login.destroy();
                        this.btok.destroy();
                        passwordText.destroy();
                        usernameText.destroy();
                        this.btnotok.destroy();


                        // Ativar e tornar visível o botão btlogin
                        this.btloginVisivel = true;
                        this.btlogoutVisivel = false;
                        this.btlogin.setVisible(true);
                        this.btlogin.setInteractive();
                    }
                });

                this.btlogout.on('pointerover', () => {
                    if (this.menuInicial == true) {
                        this.tweens.add({
                            targets: this.btlogout,
                            scale: { value: 0.6, duration: 200 }, // Aumenta para 5% em 200ms
                            ease: 'Linear' // Utiliza uma função de easing linear para uma transição suave
                        });
                    }
                });
                
                this.btlogout.on('pointerout', () => {
                    if (this.menuInicial == true) {
                        this.tweens.add({
                            targets: this.btlogout,
                            scale: { value: 0.5, duration: 200 }, // Retorna ao tamanho original em 200ms
                            ease: 'Linear'
                        });
                    }
                });
                
                this.btlogout.on('pointerdown', () => {
                    if (this.menuInicial == true) {
                        window.location.reload();
                    }
                });

                // Adiciona a imagem 'login' quando o botão 'btlogin' é clicado
                this.login = this.add.image(490, 180, "login").setOrigin(0,0);
                this.login.setDisplaySize(0,0);
                this.login.setScale(1);
                

                // Criar caixa de texto para o nome de usuário
                let usernameText = this.add.text(820, 320, '', { 
                    fontFamily: 'Arial', 
                    fontSize: '16px', 
                    color: '#ffffff',
                    backgroundColor: 'rgba(150, 100, 200, 0.25)',
                    padding: { 
                        top: 5, 
                        bottom: 5, 
                        left: 5, 
                        right: 5 
                    },
                    fixedWidth: 200,
                    fixedHeight: 30,
                    borderColor: '#ffffff',
                    borderWidth: 2,
                }).setOrigin(0.5);

                // Criar caixa de texto para a senha
                let passwordText = this.add.text(820, 440, '', { 
                    fontFamily: 'Arial', 
                    fontSize: '16px', 
                    color: '#ffffff',
                    backgroundColor: 'rgba(150, 100, 200, 0.25)',
                    padding: { 
                        top: 5, 
                        bottom: 5, 
                        left: 5, 
                        right: 5 
                    },
                    fixedWidth: 200,
                    fixedHeight: 30,
                    borderColor: '#ffffff',
                    borderWidth: 2,
                }).setOrigin(0.5);

                let originalPassword = '';

                // Adicionar ouvinte de eventos de teclado uma única vez
                this.input.keyboard.on('keydown', (event) => {
                    const key = event.key;

                    if (usernameText.active && /^[a-zA-Z0-9]$/.test(key) || (key === "Backspace" && usernameText.active)) {
                        if (key === 'Backspace' && usernameText.text !== '') {
                            usernameText.text = usernameText.text.slice(0, -1); // Apagar último caractere
                        } else if (key !== 'Backspace') {
                            usernameText.text += key;
                        }
                    }

                    if (passwordText.active) {
                        if (key === 'Backspace' && originalPassword !== '') {
                            originalPassword = originalPassword.slice(0, -1); // Apagar último caractere
                            passwordText.text = passwordText.text.slice(0, -1); // Atualizar asteriscos
                        } else if (/^[a-zA-Z0-9]$/.test(key)) {
                            originalPassword += key;
                            passwordText.text += '*'; // Adicionar asterisco
                        }
                    }
                });

                // Ativar entrada de texto para o nome de usuário
                usernameText.setInteractive();
                usernameText.on('pointerdown', () => {
                    passwordText.active = false;
                    usernameText.active = true;
                });

                // Ativar entrada de texto para a senha
                passwordText.setInteractive();
                passwordText.on('pointerdown', () => {
                    usernameText.active = false;
                    passwordText.active = true;
                }); 


                // Adicionar lógica para os botões de submissão
                this.btnotok = this.add.image(910, 180, "btnotok").setOrigin(0,0);
                this.btnotok.setDisplaySize(0,0);
                this.btnotok.setScale(0.4);
                this.btnotok.setInteractive();
                this.btnotok.on('pointerdown', () => {
                    if (this.menuInicial == true) {
                        this.login.destroy();
                        this.btnotok.destroy();
                        this.btok.destroy();
                        this.meninocarrinho.setInteractive(true);
                        this.homemcaixa.setInteractive(true);
                        // Remover os campos de texto
                        usernameText.destroy();
                        passwordText.destroy();
                        this.loginErrorMsg.setVisible(false);
                        this.loginErrorMsg2.setVisible(false);
                        this.btlogin.setDisplaySize(0,0);
                        this.btlogin.setScale(0.5);
                        // Tornar btlogin invisível e desativado
                        this.btloginVisivel = true;
                        this.btlogin.setVisible(true);
                        this.btlogin.setInteractive();
                        this.btlogin.on('pointerover', () => {
                            if (this.menuInicial == true) {
                                this.tweens.add({
                                    targets: this.btlogin,
                                    scale: { value: 0.6, duration: 200 }, // Aumenta para 5% em 200ms
                                    ease: 'Linear' // Utiliza uma função de easing linear para uma transição suave
                                });
                            }
                        });
                        
                        this.btlogin.on('pointerout', () => {
                            if (this.menuInicial == true) {
                                this.tweens.add({
                                    targets: this.btlogin,
                                    scale: { value: 0.5, duration: 200 }, // Retorna ao tamanho original em 200ms
                                    ease: 'Linear'
                                });
                            }
                        });
                    }
                });
    
        
                this.btok = this.add.image(730, 500, "btok").setOrigin(0,0);
                this.btok.setDisplaySize(0,0);
                this.btok.setScale(0.4);
                this.btok.setInteractive();
                this.btok.on('pointerdown', () => {
                    if (this.menuInicial == true) {
                        // Remover os campos de texto
                        username = usernameText.text.trim();
                        password = originalPassword;
                        back.login(username, password, this);
                        this.meninocarrinho.setInteractive(true);
                        this.homemcaixa.setInteractive(true);
                        this.login.destroy();
                        this.btnotok.destroy();
                        // Tornar btlogin invisível e desativado
                        this.btloginVisivel = false;
                        this.btlogoutVisivel = true;
                        this.btlogin.setVisible(false);
                        this.btlogin.disableInteractive();
                        this.showBtLogout();
                        this.btlogout.on('pointerover', () => {
                            if (this.menuInicial == true) {
                                this.tweens.add({
                                    targets: this.btlogout,
                                    scale: { value: 0.6, duration: 200 }, // Aumenta para 60% em 200ms
                                    ease: 'Linear' // Utiliza uma função de easing linear para uma transição suave
                                });
                            }
                        });
                        
                        this.btlogout.on('pointerout', () => {
                            if (this.menuInicial == true) {
                                this.tweens.add({
                                    targets: this.btlogout,
                                    scale: { value: 0.5, duration: 200 }, // Retorna ao tamanho original em 200ms
                                    ease: 'Linear'
                                });
                            }
                        });
                        
                        this.btlogout.on('pointerdown', () => {
                            if (this.menuInicial == true) {
                                window.location.reload();
                            }
                        });

                        this.btok.destroy();
                        usernameText.destroy();
                        passwordText.destroy();
                    
                    }
                });
                
                this.loginErrorMsg = this.add.text(1200, 0,"Utilizador ou Password Errados",{ fontFamily: 'font1',fontSize: 25,color: '#ff0000',align: 'center'});
                this.loginErrorMsg.visible = false;
        
                this.loginErrorMsg2 = this.add.text(1200, 0,"Está registado como professor!",{ fontFamily: 'font1',fontSize: 25,color: '#ff0000',align: 'center'});
                this.loginErrorMsg2.visible = false;
            }
        });
        
        
        this.btlogin.on('pointerover', () => {
            if (this.menuInicial == true) {
                this.tweens.add({
                    targets: this.btlogin,
                    scale: { value: 0.6, duration: 200 }, // Aumenta para 5% em 200ms
                    ease: 'Linear' // Utiliza uma função de easing linear para uma transição suave
                });
            }
        });
        
        this.btlogin.on('pointerout', () => {
            if (this.menuInicial == true) {
                this.tweens.add({
                    targets: this.btlogin,
                    scale: { value: 0.5, duration: 200 }, // Retorna ao tamanho original em 200ms
                    ease: 'Linear'
                });
            }
        });
    }
    else {
        this.showBtLogout();
        this.btlogout.on('pointerover', () => {
            if (this.menuInicial == true) {
                this.tweens.add({
                    targets: this.btlogout,
                    scale: { value: 0.6, duration: 200 }, // Aumenta para 60% em 200ms
                    ease: 'Linear' // Utiliza uma função de easing linear para uma transição suave
                });
            }
        });
        
        this.btlogout.on('pointerout', () => {
            if (this.menuInicial == true) {
                this.tweens.add({
                    targets: this.btlogout,
                    scale: { value: 0.5, duration: 200 }, // Retorna ao tamanho original em 200ms
                    ease: 'Linear'
                });
            }
        });
        this.btlogout.on('pointerover', () => {
            if (this.menuInicial == true) {
                this.tweens.add({
                    targets: this.btlogout,
                    scale: { value: 0.6, duration: 200 }, // Aumenta para 60% em 200ms
                    ease: 'Linear' // Utiliza uma função de easing linear para uma transição suave
                });
            }
        });
        
        this.btlogout.on('pointerout', () => {
            if (this.menuInicial == true) {
                this.tweens.add({
                    targets: this.btlogout,
                    scale: { value: 0.5, duration: 200 }, // Retorna ao tamanho original em 200ms
                    ease: 'Linear'
                });
            }
        });
        
        this.btlogout.on('pointerdown', () => {
            if (this.menuInicial == true) {
                window.location.reload();
            }
        });
    }
    }
    
    showBtLogout(){
        // Criar btlogout por cima de btlogin
        this.btlogout = this.add.image(1450, 400, "btlogout").setOrigin(0, 0);
        this.btlogout.setScale(0.5);
        this.btlogout.setVisible(true);
        this.btlogout.setInteractive();
    }
    

    update() {
        if (callOnce == 0) {
            back.sessionVerify();
            callOnce = 1000;
        }
    } // Função de atualização do jogo, chamada automaticamente pelo Phaser em cada frame

} 

// Configuração do jogo
const config = {
    type: Phaser.AUTO, // Tipo de renderização WebGL
    width: sizes.width, // Largura do jogo
    height: sizes.height, // Altura do jogo
    scene: [GameScene], // Array de cenas do jogo, neste caso, apenas uma cena (GameScene)
    scale: {
        mode: Phaser.Scale.FIT, // Ajusta o jogo para caber na janela do navegador
        autoCenter: Phaser.Scale.CENTER_BOTH // Centraliza o jogo na janela do navegador
    },
    backgroundColor: "#ffffff",
    parent: 'divId',
    fullscreenTarget: 'divId',
    scene: [GameScene],
}

// Criação do objeto de jogo com base na configuração definida
const game = new Phaser.Game(config);
let infoUser = new loginInfo();