/**
 * @author Elmahdi KORFED <elmahdi.korfed@gmail.com>
 */

//--- for JS selection
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

window.onload = _ => {
    fetch(new Request(`./assets/json/json.json`, {
        method: `GET`,
        headers: new Headers(),
        mode: `cors`,
        cache: `default`
    })).then(response => {
        if (!response.ok) throw new Error(`HTTP error ${response.status}`);
        return response.json();
    }).then(d => {
        let _html = ``;
        for (const key in d) _html += `<li id="li_${key}" data-name="${d[key].name}">
        <div class="square">
        <img src="${d[key].img}" alt="${d[key].name}" onerror="this.onerror=null; this.src='./assets/images/notfound.jpg'">
        <p>${d[key].name}</p>
        </div>
        </li>`;

        $(`#ul_animals`).innerHTML = _html;
        $$(`#ul_animals li`).forEach(li => li.onclick = _ => playAudio(li));
    });
}

const playAudio = _li => {
    let _audio = $(`audio`);
    _audio.src = `https://www.google.com/logos/fnbx/animal_sounds/${_li.dataset.name}.mp3`;
    _audio.play();
}