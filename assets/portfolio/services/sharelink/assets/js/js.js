/**
 * @author Elmahdi KORFED <elmahdi.korfed@gmail.com>
 */

//--- for JS selection
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const _sn = [`facebook`, `twitter`, `linkedin`, `pinterest`];

window.onload = () => {
    let _html = ``;
    for (const key in _sn) _html += _render(_sn[key], key);
    $(`#ul_sn`).innerHTML = _html;


    $$(`#ul_sn button`).forEach(_b => {
        _b.onclick = () => copyLink(_b.getAttribute(`data-sn`));
    })

    $(`#input-link`).onkeyup = (_e) => convertLink(encodeURI(_e.target.value.trim()));
}

let _render = (_sn, key) => {
    return `<li><img src='./assets/images/sn/${_sn}.png'><input id='input-${_sn}' type='text' placeholder='Your new link will be appear here'><button data-sn='${_sn}'>share this link</button></li>`;
}

let convertLink = (_linkSN) => {
    $(`#input-facebook`).value = `https://www.facebook.com/sharer/sharer.php?u=${_linkSN}`;
    $(`#input-twitter`).value = `https://twitter.com/home?status=${_linkSN}`;
    $(`#input-linkedin`).value = `https://www.linkedin.com/shareArticle?mini=true&url=${_linkSN}`;
    $(`#input-pinterest`).value = `https://pinterest.com/pin/create/button/?url=${_linkSN}`;
}

let copyLink = (_linkSN) => {
    let copyText = $(`#input-${_linkSN}`);
    window.location.href = copyText.value;
    /*
    copyText.select();
    document.execCommand(`copy`);

    alert(`Copied the text: ${copyText.value}`);
    */
}