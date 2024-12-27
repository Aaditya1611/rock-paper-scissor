let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0
}

UpdateScoreElement();

function ComputerMove() {
    const randomNumber = Math.random();
    let computerMov = "";

    if (randomNumber >= 0 && randomNumber < 1 / 3) {
        computerMov = 'rock'
    }
    if (randomNumber < 2 / 3 && randomNumber > 1 / 3) {
        computerMov = 'paper'
    }
    if (randomNumber > 2 / 3 && randomNumber < 1) {
        computerMov = 'scissor'
    }

    return computerMov;
}
function UpdateScoreElement() {
    const scoreElements = document.querySelector('.js-score')
    scoreElements.innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}
let isAutoPlaying = false;
let intervalId

function AutoPlay() {
    if (!isAutoPlaying) {
       intervalId =  setInterval(() => {
            const playermov = ComputerMove();
            PlayGame(playermov);
        },1000);
        isAutoPlaying = true;
    } else {
        clearInterval(intervalId)
        isAutoPlaying = false
    }
}

document.querySelector('.js-rock-button').addEventListener('click', () => {
    PlayGame('rock')
})

document.querySelector('.js-paper-button').addEventListener('click', () => {
    PlayGame('paper')
})

document.querySelector('.js-scissor-button').addEventListener('click', () => {
    PlayGame('scissor')
})

document.body.addEventListener('keydown', (event) => {
    if(event.key === 'r'){
        PlayGame('rock')
    }else if(event.key === 'p'){
        PlayGame('paper')
    } else if(event.key === 's'){
        PlayGame('scissor')
    }
})


function PlayGame(playermov) {
    let computerMov = ComputerMove();
    let result = "";

    if (playermov === 'scissor' && computerMov === 'rock') {
        result = 'You lose'
    } else if (playermov === 'scissor' && computerMov === 'paper') {
        result = 'You win'
    } else if (playermov === 'scissor' && computerMov === 'scissor') {
        result = 'Tie'
    }

    if (playermov === 'rock' && computerMov === 'paper') {
        result = 'You lose'
    } else if (playermov === 'rock' && computerMov === 'scissor') {
        result = 'You win'
    } else if (playermov === 'rock' && computerMov === 'rock') {
        result = 'Tie'
    }

    if (playermov === 'paper' && computerMov === 'scissor') {
        result = 'You lose'
    } else if (playermov === 'paper' && computerMov === 'rock') {
        result = 'You win'
    } else if (playermov === 'paper' && computerMov === 'paper') {
        result = 'Tie'
    }

    if (result === 'You win') {
        score.wins += 1
    } else if (result === 'You lose') {
        score.losses += 1
    } else if (result === 'Tie') {
        score.ties += 1
    }

    localStorage.setItem('score', JSON.stringify(score))

    UpdateScoreElement();

    document.querySelector('.js-result').innerHTML = result;
    document.querySelector('.js-moves').innerHTML = `You 
    <img src="/resources/${playermov}-emoji.png" class="move-icon"> 
    <img src="/resources/${computerMov}-emoji.png" class="move-icon">
    Computer`;

}
