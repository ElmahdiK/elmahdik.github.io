/**
 * @author Elmahdi KORFED <elmahdi.korfed@gmail.com>
 */

//--- for JS selection
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
import d from "./data.js";

window.onload = _ => d.forEach((e, index) => $('#ul_animals').insertAdjacentHTML('beforeEnd', templateCardAnimal(e, index)));

window.playAudio = animal => {
    let _audio = $(`audio`);
    _audio.src = `https://www.google.com/logos/fnbx/animal_sounds/${animal}.mp3`;
    _audio.play();
}

const templateCardAnimal = (_element, _num) => `<li id="li_${_num}" data-name="${_element.name}" onclick="playAudio('${_element.name}')">
<div class="square">
<img src="${_element.img}" alt="${_element.name}" onerror="this.onerror=null; this.src='./assets/images/notfound.jpg'">
<p>${_element.name}</p>
</div>
</li>`;