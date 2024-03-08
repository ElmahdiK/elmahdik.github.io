/**
 * @author Elmahdi KORFED <elmahdi.korfed@gmail.com>
 */

//--- for JS selection
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
import d from "./data.js";
let _audio = $(`audio`);

window.onload = _ => d.map((e, index) => $('#ul_animals').insertAdjacentHTML('beforeEnd', templateCardAnimal(e, index)));

window.playAudio = animal => {
    _audio.src = `https://www.google.com/logos/fnbx/animal_sounds/${animal}.mp3`;
    _audio.play();
}

const templateCardAnimal = ({ name, img }) => `<li onclick="playAudio('${name}')">
<div class="square">
<img src="${img}" alt="${name}" onerror="this.onerror=null; this.src='./assets/images/notfound.jpg'">
<p>${name}</p>
</div>
</li>`;