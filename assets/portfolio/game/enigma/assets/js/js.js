"use strict";

/**
 * @author Elmahdi KORFED <elmahdi.korfed@gmail.com>
 */

//--- for JS selection
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const _pathJSON = `./assets/json/data.json`;
var _data, _nbEnigma;
var _tabEnigma = [];

window.onload = _ => {

    // LOAD JSON & CONTENT
    // Src: https://enigmatik.epikurieu.com/enigmes/Le-gardien-du-pont/3464/enigme.fhtm
    fetch(_pathJSON)
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error ${response.status}`);
            return response.json();
        })
        .then(_json => {
            _data = _json;
            _nbEnigma = Object.keys(_data).length;
            initGame();

            $(`#bt_newEnigma`).onclick = _ => initGame();
        })
}

/**
 * Init the game
 */
const initGame = _ => {
    // if it's full, reset _tabEnigma
    if (_tabEnigma.length == _nbEnigma) _tabEnigma = [];

    // always close the solution before loading enigma
    $(`#details_solution`).removeAttribute(`open`);

    // get a random number which is not already include in _tabEnigma
    let _random;
    do (_random = getRandom(0, _nbEnigma - 1))
    while (_tabEnigma.includes(_random));
    _tabEnigma.push(_random);

    // render Enigma HTML
    $(`#h1_title`).innerHTML = _data[_random].title;
    $(`#p_text`).innerHTML = _data[_random].text;
    $(`#p_solution`).innerHTML = _data[_random].solution;
}

/**
 * Return a number between _min & _max (included)
 * @param {number} _min 
 * @param {number} _max 
 */
const getRandom = (_min, _max) => Math.floor(Math.random() * (_max - _min + 1) + _min);