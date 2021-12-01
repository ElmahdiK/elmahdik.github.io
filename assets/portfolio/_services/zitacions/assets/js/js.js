/**
 * @author Elmahdi KORFED <elmahdi.korfed@gmail.com>
 */

//--- for JS selection
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const _pathJSON = `./assets/json/data.json`;
let _data;

window.onload = _ => {
    console.log(`page loaded`);

    let _ul_citations = $(`#ul_citations`);

    _loadData().then(d => {
        console.log(d);
        let _html = ``;
        for (let i = 0, j = d.length; i < j; i++) {
            for (let x = 0, y = d[i].quotes.length; x < y; x++) {
                _html += `<li><p>« ${d[i].quotes[x]} »<br><br><span>- ${d[i].author} -</span></p></li>`;
            }
        }
        _ul_citations.insertAdjacentHTML(`beforeEnd`, _html);
    });

    $(`#bt_sendmail`).onclick = _ => sendMail();

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
                resolve(_json);
            })
            .catch(error => {
                throw new Error(`HTTP error ${error}`);
            })
    });
}