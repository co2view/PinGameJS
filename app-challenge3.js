/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// samo definisanje globalnih varijabli
var scores, roundScore, activePlayer, gamePlaying,  scoreForWin;
// pozivanje funkcije na pocetku za inicijalizaciju podataka.
initFunction();

// document.querySelector('#current-'+activePlayer).textContent = dice;
// ubacivanje html kod u sadrzaj nekog elementa
// document.querySelector('#current-'+activePlayer).innerHTML = '<em>'+dice+'</em>';

// event lisener  dugmeta za random broj
document.querySelector('.btn-roll').addEventListener('click', function() {
  if (gamePlaying) {

    var dice = Math.floor(Math.random() * 6) + 1; // ceo broj izmedju 1 - 6
    var dice2 = Math.floor(Math.random() * 6) + 1; // ceo broj izmedju 1 - 6
    var diceDom = document.querySelector('.dice');
    var diceDom2 = document.querySelector('.dice2');
    diceDom.style.display = 'block';
    diceDom2.style.display = 'block';
    diceDom.src = 'resource/img/dice-' + dice + '.png';
    diceDom2.src = 'resource/img/dice-' + dice2 + '.png';
    if (!(dice === 6 && dice2 === 6) && dice !== 1 && dice2 !== 1) {
      roundScore += dice;
      roundScore += dice2;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
      nextPlayer();
    }
  }
});

// event lisener za hold dugne kojim dodajemo zbir u ukupan zbir igraca
document.querySelector('.btn-hold').addEventListener('click', function() {
  if (gamePlaying) {
    scores[activePlayer] += roundScore;
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    if (scores[activePlayer] >= scoreForWin) {
      document.querySelector('#name-' + activePlayer).textContent = 'WINER';
      document.querySelector('.dice').style.display = 'none';
      document.querySelector('.dice2').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gamePlaying = false;
    } else {
      nextPlayer();
    }
  }
})

// funkcija koja menja igraca koji igra
function nextPlayer() {
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  // document.querySelector('.player-0-panel').classList.remove('active');
  // document.querySelector('.player-1-panel').classList.add('active');

  // togle sluzi umesto add remoce klasa, ako klasa postoji onda ce je ukloniit, ako ne postoji onda ce je dodati
  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.dice2').style.display = 'none';
}

// ovde stavljamo funkciju u lisener, ne kreiramo je u liseneru posto se koristi na dva mesta
document.querySelector('.btn-new').addEventListener('click', initFunction);

document.querySelector('.score-for-win').addEventListener('keypress', function(e) {
  var key = e.which || e.keyCode;
  if (key === 13) { // 13 is enter
    if (document.querySelector('.score-for-win').value < 1) {
      alert("Score for win must be larger then 0!")
    } else {
      scoreForWin = document.querySelector('.score-for-win').value;
      initFunction();
    }
  }
})

// funkcija za inicijalizaciju koja se poziva na pocetku ucitavanja stranice, i kada kreirano NEW GAME
function initFunction() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  // kada se trazi po ID-u element onda je ovo brzi nacina.
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.querySelector('#name-0').textContent = 'Player 1';
  document.querySelector('#name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');

  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.dice2').style.display = 'none';

  document.querySelector('.score-for-win').value = scoreForWin === undefined ? scoreForWin=100 : scoreForWin;

}
