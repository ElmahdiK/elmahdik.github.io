"use strict";

/**
 * @author Elmahdi KORFED <elmahdi.korfed@gmail.com>
 */

//--- for JS selection
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const _pathJSON = `./assets/json/data.json`;
var _currentMaxLevel = 0;
var _data, _audioSong, _audioVoice;
var _plateau, _bt_play;

window.onload = _ => {
	_plateau = $(`#plateau`);
	_audioSong = $(`#audio-song`);
	_audioVoice = $(`#audio-voice`);

	_bt_play = $(`#bt_play`);
	_bt_play.onclick = () => playAgain();

	// listeners
	$(`body`).addEventListener(`keydown`, e => {
		switch (e.keyCode) {
			case 37: { moveTo(`L`); break; }
			case 38: { moveTo(`U`); break; }
			case 39: { moveTo(`R`); break; }
			case 40: { moveTo(`D`); break; }
		}
	})

	// JOYSTICK options : https://github.com/bobboteck/JoyStick
	const options = { width: 160, height: 160, internalFillColor: "#333", externalLineWidth: 10, internalStrokeColor: "#111", externalStrokeColor: "#000" }

	let Joy1 = new JoyStick('joystick1', options, function (stickData) {
		if (stickData.x < -70) moveTo(`L`);
		if (stickData.y > 70) moveTo(`U`);
		if (stickData.x > 70) moveTo(`R`);
		if (stickData.y < -70) moveTo(`D`);
	});

	// LOAD JSON & CONTENT
	fetch(_pathJSON)
		.then(response => {
			if (!response.ok) throw new Error(`HTTP error ${response.status}`);
			return response.json();
		})
		.then(_json => {
			_data = _json;
			initGame();
			resizePlateau();
		})
}

window.onresize = _ => resizePlateau();
const resizePlateau = _ => {
	_plateau.style.height = `${_plateau.getBoundingClientRect().width}px`;
}
const initGame = _ => {
	_currentMaxLevel = 0;
	nextLevel();

	putImg();
	putImg();
}

const putImg = (_row, _col, _niveau) => {
	let _level = (_niveau != null) ? _niveau : getRandom(0, 1);
	if (_row && _col) {
		_plateau.insertAdjacentHTML(`beforeEnd`, `<img src="${_data[_level].avatar}" data-row="${_row}"  data-col="${_col}"  data-niveau="${_level}" class="deZoom" />`);
	} else {
		let _row, _col;
		do {
			_row = getRandom(1, 4);
			_col = getRandom(1, 4);
		}
		while (!isEmpty(getCASE(_row, _col)));
		_plateau.insertAdjacentHTML(`beforeEnd`, `<img src="${_data[_level].avatar}" data-row="${_row}"  data-col="${_col}"  data-niveau="${_level}" class="deZoom" />`);
	}

	if (isGameOver()) viewButton();
}

const setBG = _ => $(`main`).style.backgroundImage = `url(${_data[_currentMaxLevel].img})`;
const setSOUND = _voice => {
	if (_voice) {
		_audioSong.volume = 0.3;
		_audioVoice.querySelector(`source`).src = _data[_currentMaxLevel].voice;
		_audioVoice.load();
		_audioVoice.play();
		_audioVoice.onended = _ => _audioSong.volume = 1;
	} else {
		_audioSong.querySelector(`source`).src = _data[_currentMaxLevel].song;
		_audioSong.load();
		_audioSong.play();
	}
}
const setSECOUSS = _ => {
	_plateau.classList.add(`secousse`);
	setTimeout(_ => _plateau.classList.remove(`secousse`), 1000);
}
/**
 * Return a number between _min & _max (included)
 * @param {number} _min 
 * @param {number} _max 
 */
const getRandom = (_min, _max) => Math.floor(Math.random() * (_max - _min + 1) + _min);
const getCASE = (_row, _col) => $(`[data-row="${_row}"][data-col="${_col}"]`);
const getNbImg = _ => _plateau.querySelectorAll(`img`).length;
const isEmpty = _elem => _elem == null;
const isSameLevel = (_caseA, _caseB) => (!isEmpty(_caseA) && !isEmpty(_caseB)) && (_caseA.dataset.niveau == _caseB.dataset.niveau);
const isGameOver = _ => {
	if (getNbImg() != 16) return false;
	else {
		let _isIssues = false;
		for (let _row = 1; _row <= 4; _row++) {
			for (let _col = 2; _col <= 4; _col++) {
				// s'il y a des solutions dans les lignes ou colonnes = si on peut encore fusionner
				if (isSameLevel(getCASE(_row, _col - 1), getCASE(_row, _col)) || isSameLevel(getCASE(_col - 1, _row), getCASE(_col, _row))) {
					_isIssues = true;
					break;
				}
			}
			if (_isIssues) break;
		}
		return (_isIssues == false);
	}
}

/* ---------- CONTROllERS MOVES ---------- */
// MOVE
// - vide = déplacement
// - non vide + différent = tout le monde se déplace ou pas
// - non vide + même card = se déplace + fusionne
// - mur (déjà positionné sur la dernière case) = rien
const moveTo = _direction => {
	let deplacement = false;
	for (let i = 1; i <= 4; i++) if (updatePositions(i, _direction)) deplacement = true;
	for (let i = 1; i <= 4; i++) if (doFusion(i, _direction)) updatePositions(i, _direction);
	if (deplacement) setTimeout(_ => putImg(), 200);
}

const updatePositions = (_num, _direction) => {
	let deplacement = false;
	let _tabIMG = [];
	let _nbIMG = 0;
	let _img;

	if (_direction == `L` || _direction == `R`) {
		for (let i = 1; i <= 4; i++) {
			_img = getCASE(_num, i);
			if (_img) _tabIMG.push(_img);
		}
	} else if (_direction == `U` || _direction == `D`) {
		for (let i = 1; i <= 4; i++) {
			_img = getCASE(i, _num);
			if (_img) _tabIMG.push(_img);
		}
	}
	_nbIMG = _tabIMG.length;

	switch (_direction) {
		case `L`: {
			for (let i = 0; i < _nbIMG; i++) {
				if (parseInt(_tabIMG[i].dataset.col) != i + 1) {
					_tabIMG[i].dataset.col = i + 1;
					deplacement = true;
				}
			}
			break;
		}
		case `R`: {
			for (let i = 0; i < _nbIMG; i++) {
				if (parseInt(_tabIMG[_nbIMG - i - 1].dataset.col) != 4 - i) {
					_tabIMG[_nbIMG - i - 1].dataset.col = 4 - i;
					deplacement = true;
				}
			}
			break;
		}
		case `U`: {
			for (let i = 0; i < _nbIMG; i++) {
				if (parseInt(_tabIMG[i].dataset.row) != i + 1) {
					_tabIMG[i].dataset.row = i + 1;
					deplacement = true;
				}
			}
			break;
		}
		case `D`: {
			for (let i = 0; i < _nbIMG; i++) {
				if (parseInt(_tabIMG[_nbIMG - i - 1].dataset.row) != 4 - i) {
					_tabIMG[_nbIMG - i - 1].dataset.row = 4 - i;
					deplacement = true;
				}
			}
			break;
		}
	}

	return deplacement;
}

const doFusion = (_num, _direction) => {
	let _currentLevel = _currentMaxLevel;
	let _fusion = false;
	if ($$(`img[data-row="${_num}"]`).length >= 2) {
		if (_direction == `L`) for (let i = 1; i <= 4; i++) if (fusion(getCASE(_num, i), getCASE(_num, i + 1))) _fusion = true;
		if (_direction == `R`) for (let i = 4; i >= 1; i--) if (fusion(getCASE(_num, i), getCASE(_num, i - 1))) _fusion = true;
	}
	if ($$(`img[data-col="${_num}"]`).length >= 2) {
		if (_direction == `U`) for (let i = 1; i <= 4; i++) if (fusion(getCASE(i, _num), getCASE(i + 1, _num))) _fusion = true;
		if (_direction == `D`) for (let i = 4; i >= 1; i--) if (fusion(getCASE(i, _num), getCASE(i - 1, _num))) _fusion = true;
	}
	if (_currentLevel < _currentMaxLevel) nextLevel();
	return _fusion;
}

const fusion = (_caseA, _caseB) => {
	if (_caseA && _caseB) {
		if (parseInt(_caseA.dataset.niveau) == parseInt(_caseB.dataset.niveau)) {
			let level = parseInt(_caseA.dataset.niveau) + 1;
			_caseB.remove();
			_caseA.remove();
			putImg(_caseA.dataset.row, _caseA.dataset.col, level);

			if (level > _currentMaxLevel) _currentMaxLevel = level;
			return true;
		}
	}
	return false;
}

/**
 * Set the rights assets for the next level
 */
const nextLevel = _ => {
	if (_data[_currentMaxLevel].img) setBG();
	if (_data[_currentMaxLevel].secouss) setSECOUSS();
	if (_data[_currentMaxLevel].song) setSOUND(false);
	if (_data[_currentMaxLevel].voice) setSOUND(true);
}

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
	// clear plateau
	clearPlateau().then(_ => {
		// init game
		initGame();
	})
}

/**
 * View the button "play again" or not
 */
const viewButton = _ => {
	_bt_play.classList.toggle(`hidden`);
	_plateau.classList.toggle(`filter`);
}