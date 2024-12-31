class HighscoreModel {
    name;
    movements;
    time;
}

//constantes
const highscoreList = document.getElementById('highscoreElements');
const playerName = document.getElementById('nameInput');
const startButton = document.getElementById('start');

//elemento de highscore
function newHighscoreElement () {
    const highscore = new HighscoreModel()
    highscore.name = playerName.value;
    highscore.movements = state.values.currentScore;
    highscore.time = state.values.currentTime; 

    const newHtml = (`
        <ol>
            <li>
                <p>Jogador: <span id="highscorePlayer">${highscore.name}</span></p>
                <p>Movimentos: <span id="highscoreScore">${highscore.movements}</span></p>
                <p>Tempo: <span id="highscoreTime">${highscore.time} segundos</span></p>
            </li>
        </ol>
    `);
    highscoreList.innerHTML += newHtml;
};

//imprime o HTML na lista de highscore
/* 
function loadHighscoreTable() {  
    const newHtml = (`
            <li>
                <p>Jogador: <span id="highscorePlayer">${playerName.value}</span></p>
                <p>Movimentos: <span id="highscoreScore">${state.values.currentScore}</span></p>
                <p>Tempo: <span id="highscoreTime">${state.values.currentTime} segundos</span></p>
            </li>
        `);
        highscoreList.innerHTML += newHtml;
    } */

//Botão para início da contagem de tempo
let timerId
document.addEventListener('DOMContentLoaded', () => {

    startButton.addEventListener('click', () => {
        clearInterval(timerId);    
        timerId = setInterval(Timer, 1000)
    });
});    
