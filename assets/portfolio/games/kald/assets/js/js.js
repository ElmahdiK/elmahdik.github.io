"use strict";

/**
 * @author Elmahdi KORFED <elmahdi.korfed@gmail.com>
 */

//--- for JS selection
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// https://www.youtube.com/watch?v=ravykEih1rE
const _nbPARTIE = 9;
const _nbCASES = 24;
let _plateau, _bt_play, _numClick;
let TAB_NB = [];
let _k = 1;

window.onload = _ => {
	_plateau = $(`#plateau`);
	_bt_play = $(`#bt_play`);
	_bt_play.onclick = () => playAgain();

	initGame();
}

/**
 * Init the game
 * @param {number} _num - max number of case to fill
 */
const initGame = _ => {
	// update score level
	$(`#p_title span`).innerText = _k;
	// reset _numClick to 1 & update final number
	_numClick = 1;
	// render the plateau
	_plateau.innerHTML = '';
	for (let i = 0; i <= _nbCASES; i++) _plateau.insertAdjacentHTML('beforeEnd', `<div id="div_${i}"></div>`)

	TAB_NB = [];
	addNumbers();
}

/**
 * Return a number between _min & _max (included)
 * @param {number} _min 
 * @param {number} _max 
 */
const getRandom = (_min, _max) => Math.floor(Math.random() * (_max - _min + 1) + _min);

/**
 * Add numbers to the game in randomly position
 */
const addNumbers = _ => {
	if (TAB_NB.length < _k) {
		let _random = getRandom(0, _nbCASES);
		if (!TAB_NB.includes(_random)) {
			TAB_NB.push(_random);
			setNumber(_random, TAB_NB.length);
		}
		addNumbers();
	}
}

/**
 * Set _num in the right _idNum div
 * @param {number} _idNum - id of the div
 * @param {number} _num - num to insert to the div
 */
const setNumber = (_idNum, _num) => {
	let _divRandom = $(`#div_${_idNum}`);
	// insert _num
	_divRandom.innerHTML = _num;
	// make it not visible
	_divRandom.dataset.visible = false;

	// listener
	_divRandom.onclick = () => checkIfWin(event.target);
}

/**
 * Check if the game is: win, continue to next level, continue or loose
 * @param {string} _div - div html cliked
 */
const checkIfWin = _div => {
	// make the div visible and unbind it
	_div.dataset.visible = true;
	_div.onclick = () => false;

	let _num = parseInt(_div.innerHTML);
	// correct number expected?
	if (_num == _numClick) {
		// highest number of the plateau?
		if (_num == _k) {
			// last number of the game = 9? => game: win
			if (_num == _nbPARTIE) gameOver();
			// game: continue to next level
			_k++;
			initGame();
			return;
		}
		// game: continue
		_numClick++;
		return;
	}
	// incorrect => game: loose
	_div.classList.add('red');
	gameOver();
}

/**
 * Game over: make all the last elements visible
 */
const gameOver = _ => {
	_k = 1;
	$(`#p_ss_title span`).innerHTML = `🙉`;
	$$('div[data-visible=false]').forEach(_s => _s.dataset.visible = true);
	viewButton();
	return;
}

/**
 * Clear plateau
 */
const clearPlateau = _ => {
	const parent = _plateau;
	while (parent.firstChild) parent.firstChild.remove();
}

/**
 * Hide the button "play again", clear the plateau and relaunch the game
 */
const playAgain = _ => {
	$(`#p_ss_title span`).innerHTML = `🙈`;
	// hide button
	viewButton();
	// clear plateau
	clearPlateau();
	// init game
	initGame();
}

/**
 * View the button "play again" or not
 */
const viewButton = _ => {
	_bt_play.classList.toggle(`hidden`);
	_plateau.classList.toggle(`filter`);
}