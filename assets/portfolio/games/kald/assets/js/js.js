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
let _plateau, _bt_play, _numClick, _numFINAL;

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
const initGame = (_num = 1) => {
	// update score level
	$(`#p_title span`).innerText = _num;
	// reset _numClick to 1 & update final number
	_numClick = 1;
	_numFINAL = _num;
	// render the plateau
	_plateau.innerHTML = renderPlateau();

	addNumbers();
}

/**
 * Return 25 HTML divs
 */
const renderPlateau = _ => {
	let _html = ``;
	for (let i = 0; i <= _nbCASES; i++) _html += `<div id="div_${i}"></div>`;
	return _html;
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
	let _random;
	let _tabS = [];
	while (_tabS.length < _numFINAL) {
		_random = getRandom(0, _nbCASES);
		if (!_tabS.includes(_random)) {
			_tabS.push(_random);
			setNumber(_random, _tabS.length);
		}
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
		if (_num == _numFINAL) {
			// last number of the game = 9? => game: win
			if (_num == _nbPARTIE) gameOver();
			// game: continue to next level
			initGame(_numFINAL += 1);
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