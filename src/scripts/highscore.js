class HighscoreModel {
    name;
    movements;
    time;
}

class TimesPlayedModel {
    name;
    plays;
}

//constantes
const highscoreList = document.getElementById('highscoreElements');
const playerName = document.getElementById('nameInputText');
const startButton = document.getElementById('start');
let verificationName = []

//elemento de highscoregit add .
function newHighscoreElement () {
    const highscore = new HighscoreModel()
    highscore.name = playerName.value;
    highscore.movements = state.values.currentScore;
    highscore.time = state.values.currentTime; 
    
    //função para verificar o player consta dentro da matriz
    function findPlayer(matriz, nameWanted) {
        return matriz.some(submatriz => submatriz.includes(nameWanted));
    } 

    const nameFound = findPlayer(verificationName, `${highscore.name}`);


    if (nameFound) {
        const oldHtml = (`
            <li data-score="${highscore.time}" class="li">
                <span><p>Tentativa Nº <span id="recordLength"></span></p></span>
                <p>Jogador: <span id="highscorePlayer">${highscore.name}</span></p>
                <p>Movimentos: <span id="highscoreScore">${highscore.movements}</span></p>
                <p>Tempo: <span id="highscoreTime">${highscore.time} segundos</span></p>
            </li>
        `);
        const nameList = document.getElementById(`${highscore.name}`);
        nameList.innerHTML += oldHtml;

    } else {
        verificationName.push([highscore.name])
        const newHtml = (`
            <ol class="playerScore ${verificationName.length}" id="${highscore.name}" data-position="">
                <li data-score="${highscore.time}" class="li">
                    <span><p>Tentativa Nº <span id="recordLength"></span></p></span>
                    <p>Jogador: <span id="highscorePlayer">${highscore.name}</span></p>
                    <p>Movimentos: <span id="highscoreScore">${highscore.movements}</span></p>
                    <p>Tempo: <span id="highscoreTime">${highscore.time} segundos</span></p>
                </li>
            </ol>
        `);
        highscoreList.innerHTML += newHtml;
        const dataPlacer = document.getElementById(`${highscore.name}`);
        dataPlacer.dataset.position = Number(highscore.time);
    }

    //função para encontrar a posição do jogador dentro da matriz de armazenamento de dados
    function findPosition(matriz, nameWanted) {
        for (let i = 0; i < matriz.length; i++) {
          const submatriz = matriz[i];
          const index = submatriz.indexOf(nameWanted);
          if (index !== -1) {
            return [i, index];
          }
        }
        return null;
    }

    const positionFound = findPosition(verificationName, `${highscore.name}`)

    console.log(`${highscore.name} foi encontrado na posição [${positionFound[0]}, ${positionFound[1]}]`);

    verificationName[`${positionFound[0]}`].push(Number(highscore.time));
    
    //tentativa de fazer uma gravação de tentativas
    const recordOfNumber =  verificationName[`${positionFound[0]}`]
    const recordLength = recordOfNumber.length
    const modifyRecord = document.getElementById('recordLength')
    modifyRecord.textContent = recordLength

    console.log(verificationName)
    console.log(verificationName.length)

    // Obtenha o último valor do array 
    const ultimaPalavra = verificationName[verificationName.length - 1]; 
    // Use o último valor como necessário 
    console.log(`A última palavra do array é: ${ultimaPalavra}`)


    //Sort individual player scores
    // Obtenha a lista e os itens `li`
    const innerOl = document.getElementById(`${highscore.name}`);
    const items = Array.from(innerOl.getElementsByClassName('li'))

    // Organize os itens `li` com base na pontuação
    items.sort((a, b) => a.getAttribute('data-score') - b.getAttribute('data-score'));

    // Limpe a lista original
    innerOl.innerHTML = '';

    // Adicione os itens `li` organizados de volta na lista
    items.forEach(item => innerOl.appendChild(item));

    // Função para encontrar o menor valor de cada submatriz
    function findLowerScoreOfEachArray(matriz) {
        return matriz.map(submatriz => {
            // Filtre os elementos numéricos da submatriz
            const onlyNumericValues = submatriz.filter(item => typeof item === 'number');
            const onlyString = submatriz.find(item => typeof item === 'string');
            
            // Encontre o menor valor na submatriz atual
            /* if (onlyNumericValues.length > 0) {
                return Math.min(...onlyNumericValues);
                } else {
                    return null; // Caso a submatriz não tenha valores numéricos
            } */

            //encontrar menores valores
            const lowerValues = Math.min(...onlyNumericValues)
            
            return [onlyString, lowerValues];
        });
    }


    const lowerArray = findLowerScoreOfEachArray(verificationName);

    console.log('Menores valores de cada submatriz:', lowerArray);

    //sort highscore list
    const outterOl = document.getElementById('highscoreElements')
    const outterItems = Array.from(outterOl.getElementsByClassName('playerScore'))

    function setDataPosition (matriz) {
        for (let i = 0; i < matriz.length; i++) {
            const submatriz = matriz[i];
            const element = document.getElementById(submatriz[0])
            element.dataset.position = submatriz[1]
            }
    }
    setDataPosition(lowerArray)
    
};



//Botão para início da contagem de tempo
let timerId
document.addEventListener('DOMContentLoaded', () => {
    
    //Start timer button
    startButton.addEventListener('click', () => {
        clearInterval(timerId);    
        timerId = setInterval(Timer, 1000)
    });
});    
