"use strict";

/**
 * @author Elmahdi KORFED <elmahdi.korfed@gmail.com>
 */

//--- for JS selection
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// https://enigmatik.epikurieu.com/enigmes/Le-gardien-du-pont/3464/enigme.fhtm
import d from './data.js';
let _numEnigma = -1;

window.onload = _ => {
    initGame();
    $(`#bt_newEnigma`).onclick = _ => initGame();
}

const initGame = _ => {
    const { title, text, solution } = d[++_numEnigma];
    $(`#details_solution`).removeAttribute(`open`);
    $(`#h1_title`).innerHTML = `${_numEnigma + 1}/${d.length} : ${title}`;
    $(`#p_text`).innerHTML = text;
    $(`#p_solution`).innerHTML = solution;
    if (_numEnigma >= d.length - 1) _numEnigma = -1;
}