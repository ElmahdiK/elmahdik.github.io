"use strict";

/**
 * @author Elmahdi KORFED <elmahdi.korfed@gmail.com>
 */

//--- for JS selection
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const _pathCARDS = `./assets/images/cards`;
const _nbCARDS = 8;
var _plateau, _bt_play, _nbCARDSfound, _tabCHOICES;

window.onload = _ => {
	_plateau = $(`#plateau`);
	_bt_play = $(`#bt_play`);
	_bt_play.onclick = () => playAgain();

	initGame();
}

/**
 * Init the game
 */
const initGame = _ => {
	_nbCARDSfound = 0;
	_tabCHOICES = [];
	setPlateauElements();

	// listeners
	for (const card of $$(`.memory-card`)) card.onclick = () => flipCard(card);
}

/**
 * Flip the card to be visible
 * @param {string} _card - HTML card
 */
const flipCard = _card => {
	if (_card.dataset.visible == "false" && _tabCHOICES.length <= 1) {
		// make the card visible
		_card.dataset.visible = true;
		// update nb choice
		_tabCHOICES.push(parseInt(_card.dataset.numcard));
		// for the second choice only
		if (_tabCHOICES.length == 2) checkIfMatch(_tabCHOICES[0], _tabCHOICES[1]);
	}
}

/**
 * Check if _choice1 is similar to _choice2:
 * if NO - unflip cards after 800ms
 * if YES - init _tabCHOICES & check if there is one last card to found 
 * @param {number} _choice1 - first num card chosen
 * @param {number} _choice2 - second num card chosen
 */
const checkIfMatch = (_choice1, _choice2) => {
	if (_choice1 != _choice2) setTimeout(() => unflipCards(_choice1, _choice2), 800);
	else {
		_tabCHOICES = [];
		// make cards visible if they are the last
		if ((_nbCARDSfound++) === _nbCARDS - 2) {
			$$(`.memory-card[data-visible=false]`).forEach(c => flipCard(c));
			viewButton();
		}
	}
}

/**
 * Unflip cards to hidden them & init _tabCHOICES
 * @param {number} _choice1 - first num card chosen
 * @param {number} _choice2 - second num card chosen
 */
const unflipCards = (_choice1, _choice2) => {
	$(`[data-visible=true][data-numcard="${_choice1}"]`).dataset.visible = false;
	$(`[data-visible=true][data-numcard="${_choice2}"]`).dataset.visible = false;
	_tabCHOICES = [];
}

/**
 * Return an shuffle array between 1 to 16
 */
const getShuffleArray = _ => {
	// create an array 1 to 16
	let array = [];
	for (let i = 1, j = _nbCARDS * 2; i <= j; i++) array.push(i);
	// set shuffle
	var currentIndex = array.length, temporaryValue, randomIndex;
	while (0 !== currentIndex) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;
		temporaryValue = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temporaryValue
	}
	return array;
}

/**
 * Set cards elements to the plateau
 */
const setPlateauElements = _ => {
	let _html = ``;
	let _tabArray = getShuffleArray();
	for (let e in _tabArray) _html += _renderCARD(_tabArray[e]);
	_plateau.insertAdjacentHTML(`beforeEnd`, _html);
}

/**
 * Return an HTML back/front card
 * @param {number} _nb - between 1 to 16
 */
const _renderCARD = _nb => {
	_nb = (_nb > _nbCARDS) ? _nb - _nbCARDS : _nb;
	return `
	<div class="memory-card" data-numcard="${_nb}" data-visible="false">
		<div class="memory-card-back"><img src="${_pathCARDS}/back.png" alt="back"></div>
		<div class="memory-card-front"><img src="${_pathCARDS}/${_nb}.png" alt="front"></div>
	</div>`;
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