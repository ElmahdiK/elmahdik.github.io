/**
 * @author Elmahdi KORFED <elmahdi.korfed@gmail.com>
 */

//--- for JS selection
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
var vip;

window.onload = () => {
    vip = new Vipborntoday();
    loadVIPsCards();

    // select date & month
    $(`#select_date`).insertAdjacentHTML(`beforeEnd`, getHTMLOptions());
    $(`#select_month`).insertAdjacentHTML(`beforeEnd`, getHTMLOptions(true));

    // bt_search
    $(`#bt_search`).onclick = () => loadVIPsCards();
}

/**
 * Display loading ..., get month & date values and load VIPs card to display them in the renderResults
 */
const loadVIPsCards = () => {
    $(`#p_result`).innerText = `Loading ...`;

    if ($(`#select_month`).value && $(`#select_date`).value) {
        vip._month = $(`#select_month`).value;
        vip._date = $(`#select_date`).value;
    }
    vip.getVIPs().then(json => _renderResults(json));
}

/**
 * Return a list of HTML options
 * @param {boolean} _month - is a month or a day
 * @return {string}
 */
const getHTMLOptions = (_month = false) => {
    let _html = ``;
    // is a month
    if (_month) {
        const _tabMonths = [`january`, `february`, `march`, `april`, `may`, `june`, `july`, `august`, `september`, `october`, `november`, `december`];
        for (let i = 0; i <= 11; i++) _html += `<option value="${(i + 1)}" ${(i == vip._month - 1) ? `selected` : ``}>${_tabMonths[i]}</option>`;
    }
    // is a day
    else for (let i = 1; i <= 31; i++) _html += `<option value="${i}" ${(i == vip._date) ? `selected` : ``}>${i}</option>`;
    return _html;
}

/**
 * Set the number of results found in #p_result and display VIPs cards in #plateau 
 * @param {object} json - contains vip birthday informations in json object
 */
const _renderResults = (json) => {
    // display number of results found
    $(`#p_result`).innerText = `${vip.nbResults} results found`;

    // display VIPs cards
    let _html = ``;
    for (const key in json) _html += ` 
    <div class="animateOne">
    <a href="${json[key].url.value}" target="_blank" rel="noreferrer">
    <img src="${json[key].photo.value}" title="${json[key].nameBirth.value}" alt="${json[key].nameBirth.value}" onerror="this.onerror=null; this.src='./assets/images/notfound.jpg'">
    <p>${json[key].nameBirth.value}</p>
    </a>
    </div>`;
    $(`#plateau`).innerHTML = _html;

    // to animate cards
    $$(`.animateOne`).forEach((_e, _index) => _e.style.animationDelay = `${_index / 10}s`);
}

class Vipborntoday {

    constructor(_month, _date) {
        const url = new URL(window.location.href);
        const today = new Date();
        this._month = _month || url.searchParams.get("month") || today.getUTCMonth() + 1;
        this._date = _date || url.searchParams.get("date") || today.getUTCDate();
        this.nbResults = 0;
    }

    convertToTen(_nb) {
        return (_nb < 10) ? `0${_nb}` : _nb;
    }

    getVIPs() {
        return new Promise(resolve => {
            // we create an SPARQL query to get some information about VIPs
            let _query = `PREFIX dbpedia-owl:<http://dbpedia.org/ontology/>
                    SELECT DISTINCT ?star ?nameBirth ?dateNaissance ?photo ?url
                    WHERE {
                        ?film a dbpedia-owl:Film ;
                        dbpedia-owl:starring ?star .
                        ?star dbpedia-owl:birthDate ?dateNaissance .
                        ?star dbpedia-owl:thumbnail ?photo . 
                        ?star dbpedia-owl:birthName ?nameBirth .
                        ?star foaf:name ?name .
                        ?star foaf:isPrimaryTopicOf ?url
                        FILTER regex(?dateNaissance,"-${this.convertToTen(this._month)}-${this.convertToTen(this._date)}")
                    } 
                    GROUP BY ?star`;
            // we ask DBpedia
            fetch(`https://dbpedia.org/sparql?default-graph-uri=http%3A%2F%2Fdbpedia.org&query=${encodeURIComponent(_query)}&format=application%2Fsparql-results%2Bjson`)
                .then(response => {
                    if (!response.ok) throw new Error(`HTTP error ${response.status}`);
                    return response.json();
                })
                .then(_json => {
                    // we update the number of results found
                    this.nbResults = Object.keys(_json.results.bindings).length;

                    // we resolve VIPs informations to use them
                    resolve(_json.results.bindings);
                });
        });
    }
}