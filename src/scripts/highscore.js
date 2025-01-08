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
                <p>Jogador: <span id="highscorePlayer">${highscore.name}</span></p>
                <p>Movimentos: <span id="highscoreScore">${highscore.movements}</span></p>
                <p>Tempo: <span id="highscoreTime">${highscore.time} segundos</span></p>
                 <p>Nº<span class="tryN">${getNumberOfTries()}</span></p>
            </li>
        `);
        const nameList = document.getElementById(`${highscore.name}`);
        nameList.innerHTML += oldHtml;

    } else {
        verificationName.push([highscore.name])
        const newHtml = (`
            <ol class="playerScore ${verificationName.length}" id="${highscore.name}" data-position="">
                <li data-score="${highscore.time}" class="li">
                    <p>Jogador: <span id="highscorePlayer">${highscore.name}</span></p>
                    <p>Movimentos: <span id="highscoreScore">${highscore.movements}</span></p>
                    <p>Tempo: <span id="highscoreTime">${highscore.time} segundos</span></p>
                    <p>Nº<span class="tryN">${getNumberOfTries()}</span></p>
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

    function getNumberOfTries() {
        const positionFound = findPosition(verificationName, `${highscore.name}`)
        const numberOfTries = verificationName[`${positionFound[0]}`].length;
        return numberOfTries;
    }

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
       
            //encontrar menores valores
            const lowerValues = Math.min(...onlyNumericValues)
            
            return [onlyString, lowerValues];
        });
    }


    const lowerArray = findLowerScoreOfEachArray(verificationName);

    console.log('Menores valores de cada submatriz:', lowerArray);

    
    setDataPosition(lowerArray)
    
    //sort highscore list
    const outerOl = document.getElementById('highscoreElements')
    const outerItems = Array.from(outerOl.getElementsByClassName('playerScore'))
    
    outerItems.sort((a, b) => a.getAttribute('data-position') - b.getAttribute('data-position'));

    console.log(outerItems)
    
    outerOl.innerHTML = '';
    
    outerItems.forEach(item => outerOl.appendChild(item));

    function getResults (matrizOl) {
        for (let i = 0; i < matrizOl.length; i++) {
            const outerItemsIndex = matrizOl.indexOf(matrizOl[i]);
            outerItems[i].dataset.results = outerItemsIndex + 1;
        };
    } 
    getResults(outerItems)

    function placePostionResults(matriz) {
        for (let i = 0; i < matriz.length; i++) {
            const element = matriz[i]
            const verification = element.querySelector('div');
            if (verification) {
                verification.remove();
            }
            const resultDiv = document.createElement('div');
            resultDiv.classList.add('results');
            if (element.getAttribute('data-results') < 4) {
                resultDiv.id = '#'+element.getAttribute('data-results')
            } else {
                resultDiv.id = '#badResults'
            }
            resultDiv.innerHTML = (`
                <h3><span>#${element.getAttribute('data-results')}º</span></h3>
            `)
            element.insertBefore(resultDiv, element.firstChild);
        }
    };
    placePostionResults(outerItems);
};

function setHiddenClass () {
    const element = document.getElementById('highscoreElements');
    const elementChildren = element.children;

    for (let i = 0; i < elementChildren.length; i++) {
        const elementGrandChildren = elementChildren[i].children;

        for (let j = 0; j < elementGrandChildren.length; j++) {
            elementGrandChildren[j].classList.remove('hidden');
        }

        for (let l = 2; l < elementGrandChildren.length; l++) {
            elementGrandChildren[l].classList.add('hidden');
        }
    }

    const hiddenElements = document.getElementsByClassName('hidden');
    if (hiddenElements.length > 0) { 
        for (let i = 0; i < hiddenElements.length; i++) { 
            hiddenElements[i].addEventListener('transitionend', () => { 
                if (hiddenElements[i].classList.contains('hidden')) { 
                    hiddenElements[i].style.display = 'none'; 
                } else { 
                    hiddenElements[i].style.display = '';
                } 
            }); 
        } 
    } else { 
        console.error("Elementos com a classe 'hidden' não foram encontrados"); 
    }
}

let hiddenClassId
function setIntervalHiddenClass() {
    hiddenClassId = setInterval(setHiddenClass, 1)
}

function clearHiddenClass () {
    clearInterval(hiddenClassId)
    const element = document.getElementById('highscoreElements');
    const elementChildren = element.children;

    for (let i = 0; i < elementChildren.length; i++) {
        const elementGrandChildren = elementChildren[i].children;

        for (let j = 0; j < elementGrandChildren.length; j++) {
            elementGrandChildren[j].classList.remove('hidden');
            elementGrandChildren[j].style.display = '';
        }
    }
}

function setDataPosition (matriz) {
    for (let i = 0; i < matriz.length; i++) {
        const submatriz = matriz[i];
        const element = document.getElementById(submatriz[0])
        element.dataset.position = submatriz[1]
    }
}


//Botão para início da contagem de tempo
let timerId
document.addEventListener('DOMContentLoaded', () => {
    
    //Start timer button
    startButton.addEventListener('click', () => {
        clearInterval(timerId);    
        timerId = setInterval(Timer, 1000)
    });
});    
