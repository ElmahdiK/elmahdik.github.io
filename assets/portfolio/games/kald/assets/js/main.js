"use strict";

/**
 * @author Elmahdi KORFED <elmahdi.korfed@gmail.com>
 */

//--- for JS selection
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// rules = https://www.youtube.com/watch?v=ravykEih1rE
const NB_GAME = 9;
const NB_CASES = 24;
let div_boardGame, button_play;
let level, nbClicks, arrayNumbers;
level = nbClicks = 1;

window.onload = _ => {
	div_boardGame = $(`#plateau`);
	button_play = $(`#bt_play`);
	button_play.onclick = () => playAgain();

	initGame();
}

const setScoreLevel = _level => $(`#p_title span`).innerText = _level;

const resetBoard = _ => {
	div_boardGame.innerHTML = '';
	for (let i = 0; i <= NB_CASES; i++) div_boardGame.insertAdjacentHTML('beforeEnd', `<div id="div_${i}"></div>`)
}

const initGame = _ => {
	setScoreLevel(level);

	resetBoard();

	arrayNumbers = [];
	addNumbers();
}

const getRandom = (_min, _max) => Math.floor(Math.random() * (_max - _min + 1) + _min);

const addNumbers = _ => {
	if (arrayNumbers.length < level) {
		const RANDOM = getRandom(0, NB_CASES);
		if (!arrayNumbers.includes(RANDOM)) {
			arrayNumbers.push(RANDOM);
			let CASE = $(`#div_${RANDOM}`);
			CASE.innerHTML = arrayNumbers.length;
			CASE.dataset.visible = false;
			CASE.onclick = () => checkIfWin(event.target);
		}
		addNumbers();
	}
}

const checkIfWin = _case => {
	_case.dataset.visible = true;
	_case.onclick = () => false;

	const numCase = parseInt(_case.innerHTML);
	// correct number expected?
	if (numCase == nbClicks) {
		// highest number of the plateau?
		if (numCase == level) {
			// last number of the game = 9? => game: win
			if (numCase == NB_GAME) gameOver();
			// game: continue to next level
			level++;
			nbClicks = 1;
			initGame();
			return;
		}
		// game: continue
		nbClicks++;
		return;
	}
	// incorrect => game: loose
	_case.classList.add('red');
	gameOver();
}

const gameOver = _ => {
	nbClicks = 1;
	level = 1;
	$(`#p_ss_title span`).innerHTML = `🙉`;
	$$(`div[data-visible=false]`).forEach(_s => _s.dataset.visible = true);
	viewButton();
	return;
}

const playAgain = _ => {
	$(`#p_ss_title span`).innerHTML = `🙈`;
	viewButton();
	clearPlateau();
	initGame();
}

const clearPlateau = _ => {
	const parent = div_boardGame;
	while (parent.firstChild) parent.firstChild.remove();
}

const viewButton = _ => {
	button_play.classList.toggle(`hidden`);
	div_boardGame.classList.toggle(`filter`);
}