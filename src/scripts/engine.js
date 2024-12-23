// Const com conteúdo das cartas
const powerUps = [
    "<img src='./src/images/Super_Mushroom.png'>",
    "<img src='./src/images/Super_Mushroom.png'>",
    "<img src='./src/images/Fire_Flower.png'>",
    "<img src='./src/images/Fire_Flower.png'>",
    "<img src='./src/images/1UP_Mushroom.png'>",
    "<img src='./src/images/1UP_Mushroom.png'>",
    "<img src='./src/images/Boomerang_Flower.png'>",
    "<img src='./src/images/Boomerang_Flower.png'>",
    "<img src='./src/images/Super_Leaf.png'>",
    "<img src='./src/images/Super_Leaf.png'>",
    "<img src='./src/images/Stone_Leaf.png'>",
    "<img src='./src/images/Stone_Leaf.png'>",
    "<img src='./src/images/Super_Bell.png'>",
    "<img src='./src/images/Super_Bell.png'>",
    "<img src='./src/images/Super_Star.png'>",
    "<img src='./src/images/Super_Star.png'>",
];

//const com as cartas abertas/viradas
let openCards = [];

//embaralha as cartas
let shufflePowers = powerUps.sort(() => (Math.random() > 0.5 ? 2 : -1));

//adiciona as cartas à tela
for (let i = 0; i < powerUps.length; i++) {
let box = document.createElement("div");
box.className = "item";
box.innerHTML = shufflePowers[i];
box.onclick = handleClick;
document.querySelector(".game").appendChild(box);
}

//
function handleClick() {
if (openCards.length < 2) {
    this.classList.add("boxOpen");
    openCards.push(this);
}

if (openCards.length == 2) {
    //determina o tempo que a função leva para executar, e consequentemente o tempo que as cartas ficam viradas para o jogador
    state.values.currentScore++;
    setTimeout(checkMatch, 500);
}

console.log(openCards);
}

//verifica se as cartas são iguais
function checkMatch() {
if (openCards[0].innerHTML === openCards[1].innerHTML) {
    openCards[0].classList.add("boxMatch");
    openCards[1].classList.add("boxMatch");
} else {
    openCards[0].classList.remove("boxOpen");
    openCards[1].classList.remove("boxOpen");
}

openCards = [];

if (document.querySelectorAll(".boxMatch").length === powerUps.length) {
    clearInterval(state.actions.timerId);
    alert(`Você venceu! Seu tempo foi de ${state.values.currentTime} segundos, e você terminou em ${state.values.currentScore} jogadas.`);
    clearInterval(state.actions.scoreId);
    }
}

//menu

const state = {
    view: {
        time: document.querySelector("#time"),
        score: document.querySelector("#score"),
    },

    values: {
        currentTime: 0,
        currentScore: 0,
    },

    actions: {
        timerId: setInterval(Timer, 1000),
        scoreId: setInterval(Score, 100),
    }
}

//menu-timer
function formatNumber(number) { 
    return number.toString().padStart(3, '0');     
} 

function Timer() {
    state.values.currentTime++;
    state.view.time.textContent = formatNumber(state.values.currentTime);
}

(function () {state.view.time.textContent = formatNumber(state.values.currentTime);})()

//menu-score
function Score () {
    state.view.score.textContent = state.values.currentScore;
}