/**
 * @author Elmahdi KORFED <elmahdi.korfed@gmail.com>
 */

//--- for JS selection
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

// http://www.nationalanthems.info/ma.htm + https://flagpedia.net/download/api
const _pathCND = `https://flagcdn.com`;
const _lang=`en`;

window.onload = _ => {
    // load & set json data
    fetch(new Request(`${_pathCND}/${_lang}/codes.json`, {
        method: `GET`,
        headers: new Headers(),
        mode: `cors`,
        cache: `default`
    })).then(response => {
        if (!response.ok) throw new Error(`HTTP error ${response.status}`);
        return response.json();
    }).then(object => {
        let _html = ``;
        for (const property in object) {
            if (Object.keys(property).length < 3) _html += `<li data-acode="${property}" onclick="playAnthem(this)">
                <img src="${_pathCND}/${property}.svg" alt="${object[property]}" onerror="this.onerror=null; this.src='./assets/images/notfound.jpg'">
                <a href="https://${_lang}.wikipedia.org/wiki/${object[property]}" target="_blank">${object[property]}</a>
                </li>`;
        }
        $(`#ul_flags`).innerHTML = _html;
    });
}

/** 
 * @function playAnthem
 * @param {string} _country 
 */
const playAnthem = (_country = null) => {
    if ($(`#ul_flags li.active`)) $(`#ul_flags li.active`).classList.remove(`active`);
    let audio = $(`audio`);
    audio.src = `http://www.nationalanthems.info/${_country.dataset.acode}.mp3`;
    audio.play();
    _country.classList.add(`active`);
}