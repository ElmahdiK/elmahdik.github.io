/**
 * @author Elmahdi KORFED <elmahdi.korfed@gmail.com>
 */

//--- for JS selection
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const today = new Date();
let vip;

window.onload = () => {
    vip = new Vipborntoday(today.getMonth() + 1, today.getDate());
    loadVIPsCards();

    setMonthOptions($(`#select_month`), today.getMonth());
    setDayOptions($(`#select_date`), today.getMonth(), today.getDate());

    // listeners
    $(`#select_month`).onchange = (_evt) => setDayOptions($(`#select_date`), _evt.target.selectedIndex, $(`#select_date`).value);
    $(`#bt_search`).onclick = () => {
        vip._month = `${$(`#select_month`).selectedIndex + 1}`;
        vip._date = $(`#select_date`).value;
        loadVIPsCards();
    }
}

const setMonthOptions = (_selector, _month) => {
    _selector.innerHTML = "";
    const nameOfMonths = [`january`, `february`, `march`, `april`, `may`, `june`, `july`, `august`, `september`, `october`, `november`, `december`];
    for (const [i, month] of nameOfMonths.entries()) _selector.insertAdjacentHTML('beforeEnd', `<option ${i === _month && 'selected'}>${month}</option>`);
}

const setDayOptions = (_selector, _month, _date) => {
    _selector.innerHTML = "";
    Array.from({ length: getDaysFromMonth(_month + 1) }, (_, i) => i + 1).map(d => _selector.insertAdjacentHTML('beforeEnd', `<option ${d == _date && 'selected'}>${d}</option>`))
}

const getDaysFromMonth = _month => new Date(2000, _month, 0).getDate();

// Display loading ... & load VIPs card to display them
const loadVIPsCards = () => {
    $(`#p_result`).innerText = `Loading ...`;
    vip.getVIPs().then(json => {
        $(`#p_result`).innerText = `${json.length} results found`;
        $(`#plateau`).innerHTML = "";
        json.map((_vip, index) => $(`#plateau`).insertAdjacentHTML('beforeEnd', templateCardVIP(_vip, index)));
    });
};

const templateCardVIP = ({ url, photo, nameBirth, birthDate, abstract }, _num) => ` 
<div style="animation-delay:${_num / 12}s">
<a href="${url.value}" target="_blank" rel="noreferrer">
<img src="${photo.value}" title="${nameBirth.value}" alt="${nameBirth.value}" onerror="this.onerror=null; this.src='./assets/images/notfound.jpg'">
<p><span>${nameBirth.value}</span><span>${new Date(birthDate.value).getFullYear()}</span><br /><small>${abstract.value.slice(0, 80)} ...</small></p>
</a>
</div>`;

class Vipborntoday {

    constructor(_month, _date) {
        const today = new Date();
        const url = new URL(window.location.href);
        this._month = `${_month || url.searchParams.get("month") || today.getUTCMonth() + 1}`;
        this._date = `${_date || url.searchParams.get("date") || today.getUTCDate()}`;
    }

    getDateSearch() {
        return `${this._month.padStart(2, '0')}-${this._date.padStart(2, '0')}`;
    }

    getVIPs() {
        return new Promise(resolve => {
            // we create an SPARQL query to get some information about VIPs
            let _query = `PREFIX dbpedia-owl:<http://dbpedia.org/ontology/>
                    SELECT DISTINCT ?star ?abstract ?nameBirth ?birthDate ?photo ?url
                    WHERE {
                        ?film a dbpedia-owl:Film ;
                        dbpedia-owl:starring ?star .
                        ?star dbpedia-owl:abstract ?abstract .
                        ?star dbpedia-owl:birthDate ?birthDate .
                        ?star dbpedia-owl:thumbnail ?photo . 
                        ?star dbpedia-owl:birthName ?nameBirth .
                        ?star foaf:name ?name .
                        ?star foaf:isPrimaryTopicOf ?url
                        FILTER regex(?birthDate,"-${this.getDateSearch()}")
                        FILTER langMatches(lang(?abstract),"en")
                    }
                    ORDER BY DESC(?birthDate)
                    LIMIT 200`;
            // we ask DBpedia
            fetch(`https://dbpedia.org/sparql?default-graph-uri=http%3A%2F%2Fdbpedia.org&query=${encodeURIComponent(_query)}&format=application%2Fsparql-results%2Bjson`)
                .then(response => {
                    if (!response.ok) throw new Error(`HTTP error ${response.status}`);
                    return response.json();
                })
                .then(_json => resolve(_json.results.bindings));
        });
    }
}