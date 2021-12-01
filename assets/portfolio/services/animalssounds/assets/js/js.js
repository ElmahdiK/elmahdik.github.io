/**
 * @author Elmahdi KORFED <elmahdi.korfed@gmail.com>
 */

//--- for JS selection
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const _pathJSON = `./assets/json/json.json`;
let _data;

window.onload = _ => {
    _loadData().then(d => {
        _data = d;
        let _html = ``;
        for (const key in d) _html += _renderLI(key);
        $(`#ul_animals`).innerHTML = _html;
    });

    let _links = $$(`#nav_menu a`);
    for (let i = 0, j = _links.length; i < j; i++) {
        _links[i].onclick = evt => {
            console.log(evt.target.dataset.num);
            $(`main`).style.transform = `translateX(${-(evt.target.dataset.num) * 100}vw)`;
        }
    }
}

/** 
 * @function _renderULPortfolio
 * @returns {string}
 */
let _renderULPortfolio = _ => {
    let _html = ``;
    for (const key in _data) _html += _renderLI(key);
    return _html;
}

/** 
 * @function _renderLI
 * @param {number} key 
 * @returns {string}
 */
let _renderLI = (key = null) => {
    return `
    <li id="li_${key}" onclick="playAudio(this)">
        <img src="${_data[key].img}" alt="${_data[key].name}" onerror="this.onerror=null; this.src='./assets/images/notfound.jpg'">
        <p class="p_title">${_data[key].name}</p>
        <audio id="jp_audio_${key}" controls src="https://www.google.com/logos/fnbx/animal_sounds/${_data[key].name}.mp3"></audio>
    </li>`;
}

/** 
 * @function _loadData
 * @returns {Promise} Promise object
 */
let _loadData = _ => {
    return new Promise((resolve, reject) => {
        fetch(_pathJSON)
            .then(response => {
                if (!response.ok) throw new Error(`HTTP error ${response.status}`);
                return response.json();
            })
            .then(_json => {
                resolve(_json)
            })
            .catch(error => {
                throw new Error(`HTTP error ${error}`);
            })
    });
}

const playAudio = _li => {
    let _audio = _li.querySelector(`audio`);
    let _img = _li.querySelector(`img`);
    _img.classList.add(`imgMove`);
    _audio.play();
    _audio.onended = _ => _img.classList.remove(`imgMove`);
}