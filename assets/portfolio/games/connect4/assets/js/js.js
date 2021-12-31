"use strict";

/**
 * @author Elmahdi KORFED <elmahdi.korfed@gmail.com>
 */

//--- for JS selection
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

var _bt_play, _plateau, _result, matrice, player;

window.onload = () => {
	_plateau = $(`#plateau`);
	_result = $(`#p_title`);

	_bt_play = $(`#bt_play`);
	_bt_play.onclick = () => playAgain();

	player = 1;
	initGame();
	resizePlateau();
}
window.onresize = _ => resizePlateau();

/**
 * Init the game
 */
const initGame = _ => {
	_result.innerText = `Connect 4`;
	// matrice 6x7 for the connect 4 game - https://stackoverflow.com/questions/8301400/how-do-you-easily-create-empty-matrices-javascript/41815396#41815396
	matrice = Array(6).fill(null).map(() => Array(7).fill(0));
	// render HTML
	let html = ``;
	for (let i = 0; i < 6; i++) for (let k = 0; k < 7; k++) html += `<div data-row="${i}" data-col="${k}"></div>`;
	_plateau.innerHTML = html;
	// listener
	$$(`#plateau div`).forEach(_div => _div.onclick = () => putJeton(parseInt(_div.dataset.col)));
}

/**
 * Autoresize Plateau game
 */
const resizePlateau = _ => _plateau.style.height = `${_plateau.getBoundingClientRect().width * (6 / 7)}px`;

/**
 * Put jeton in the right column
 * @param {number} _col - chosen column position
 */
const putJeton = _col => {
	// from bottom of the row 5 to top 0
	for (let _row = 5; _row >= 0; _row--) {
		// check if it's empty (=0)
		if (matrice[_row][_col] === 0) {
			// set color
			matrice[_row][_col] = (player == 1) ? 1 : 2;
			$(`div[data-row="${_row}"][data-col="${_col}"]`).dataset.color = getColor(player);
			// check if win for all directions: column, row, diagonal
			Promise.all([checkC(_col), checkR(_row), checkDL(_row, _col), checkDR(_row, _col)]).then(values => {
				if (values[0] || values[1] || values[2] || values[3]) {
					_result.innerText = `${getColor(player)} WIN!!!`;
					viewButton();
				} else if (!matrice.some(row => row.includes(0))) {
					_result.innerText = `MATCH NULL`;
					viewButton();
				} else player *= -1;
			});
			break;
		}
	}
}

/**
 * Check column
 * @param {*} _num - column (1 column have 6 rows: 0 to 5)
 */
const checkC = _num => {
	let _html = ``;
	for (let i = 0; i <= 5; i++) {
		_html += matrice[i][_num];
		if (i == 5) return (checkIfWin(_html));
	}
}

/**
 * Check row
 * @param {*} _num - row (1 row have 7 columns: 0 to 6)
 */
const checkR = _num => {
	let _html = ``;
	for (let i = 0; i <= 6; i++) {
		_html += matrice[_num][i];
		if (i == 6) return (checkIfWin(_html));
	}
}

/**
 * Check diagonal left to right
 * @param {number} _row - row
 * @param {number} _col - column
 */
const checkDL = (_row, _col) => {
	let limR = 5;
	let limC = _col - (5 - _row);
	if (limC < 0) {
		limR = limR + limC;
		limC = 0;
	}
	// we don't verify because result is less than 4 values
	if ((limC == 0 && limR <= 2) || (limR == 5 && limC >= 4)) return false;
	else return new Promise(resolve => {
		let _html = ``;
		for (let i = limR; i >= 0; i--) {
			_html += matrice[i][limC++]
			if (limC > 6) break;
		}
		resolve(checkIfWin(_html));
	})
}

/**
 * Check diagonal right to left
 * @param {number} _row - row
 * @param {number} _col - column
 */
const checkDR = (_row, _col) => {
	let limR = 5;
	let limC = _col + (5 - _row);
	if (limC > 6) {
		limR = limR - (limC - 6);
		limC = 6;
	}
	// we don't verify because result is less than 4 values
	if ((limR == 5 && limC <= 2) || (limC == 6 && limR <= 2)) return false;
	else return new Promise(resolve => {
		let _html = ``;
		for (let i = limR; i >= 0; i--) {
			_html += matrice[i][limC--]
			if (limC < 0) break;
		}
		resolve(checkIfWin(_html));
	})
}

/**
 * Check if elements contains 4 successives color from player 1 (1111) or player 2 (2222) 
 * Return true if yes or false if not
 * @param {string} _elements - concat elements from array checked (column, row, diagonal left, diagonal right)
 */
const checkIfWin = _elements => (_elements.includes(`1111`) || _elements.includes(`2222`));

/**
 * Return color of the player (yellow or red)
 * @param {number} _player - 1 or -1 (2)
 */
const getColor = _player => (_player == 1) ? `yellow` : `red`;

/**
 * Clear plateau
 */
const clearPlateau = _ => {
	return new Promise(resolve => {
		while (_plateau.firstChild) {
			_plateau.removeChild(_plateau.firstChild);
			if (_plateau.firstChild == null) resolve(true);
		}
	})
}

/**
 * Hide the button "play again", clear the plateau and relaunch the game
 */
const playAgain = _ => {
	// hide button
	viewButton();
	// clear plateau & initGame
	clearPlateau().then(_ => initGame());
}

/**
 * View the button "play again" or not
 */
const viewButton = _ => {
	_bt_play.classList.toggle(`hidden`);
	_plateau.classList.toggle(`filter`);
}