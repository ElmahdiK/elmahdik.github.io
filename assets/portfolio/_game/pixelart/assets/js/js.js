"use strict";

/**
 * @author Elmahdi KORFED <elmahdi.korfed@gmail.com>
 */

//--- for JS selection
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const dimension = 16;
const pixelSize = 30;

let _plateau, input_color, input_pickup, div_tools, body;
// let isPickupChecked;

window.onload = () => {
    console.log(`page loaded`);

    body= $('body');
    _plateau = $('#ul_pixel');
    _plateau.style = `width:${pixelSize * dimension}px;height:${pixelSize * dimension}px`;

    input_color = $('#input_color');

    input_pickup = $('#input_pickup');

    div_tools= $('#div_tools');

    setPlateau();

    // listeners;
    _plateau.querySelectorAll('li').forEach(li => {
        li.onclick = function () {
            if (input_pickup.checked) {
                input_color.value = this.dataset.color;
                input_pickup.checked = false;
            } else colorIt(this);
        };
    })

    input_pickup.onchange = (evt) => {
        if (evt.target.checked) {
            // body.style.cursor = 'crosshair';
            evt.target.classList.add(`active`);
        } else {
            // body.style.cursor = 'default';
            evt.target.classList.remove(`active`);
        }
    }

    
    input_color.onchange = (evt) => {
        console.log(evt.target.value);
        // body.style.backgroundColor = evt.target.value;
    }
}

const setPlateau = _ => {
    let _html = ``;
    for (let i = 0; i < dimension; i++)
        for (let j = 0; j < dimension; j++)
            _html += renderLI(i, j);
    _plateau.insertAdjacentHTML('beforeEnd', _html);
}

const renderLI = (_row, _col) => {
    return `<li id='lol_${_row}_${_col}' data-row='${_row}' data-col='${_col}' style='width:${pixelSize}px;height:${pixelSize}px'></li>`
}

const colorIt = _li => {
    //console.log(_ev.id);
    _li.dataset.color = input_color.value;
    _li.style.backgroundColor = input_color.value;
}

/**
 * Return a number between _min & _max (included)
 * @param {number} _min 
 * @param {number} _max 
 */
const getRandom = (_min, _max) => Math.floor(Math.random() * (_max - _min + 1) + _min);

/**
 * Clear plateau
 */
const clearPlateau = _ => {
    const parent = _plateau;
    while (parent.firstChild) parent.firstChild.remove();
}