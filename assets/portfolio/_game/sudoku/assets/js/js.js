/**
 * @author Elmahdi KORFED <elmahdi.korfed@gmail.com>
 */

//--- for JS selection
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const _pathJSON = `./assets/json/json.json`;
const numSudoku=1;
let _data;

window.onload = _ => {
    _loadData().then(d => {
        _data = d;
        // console.log(d);
        let _class = ``;
        let _html = ``;
        for (let i = 0, j = d.length; i < j; i++) {
            _html += `<li class="animateUp" style="animation-delay:${i / 8}s">`;
            for (let a = 0, b = d[i].length; a < b; a++) {
                if (displayNumber(d[i][a]) == 0) _class = `empty`;
                else _class = ``;
                _html += `<p onclick=caseNumbers(${i}) data-id="${i}" data-num="${a}" class=${_class}>${displayNumber(d[i][a])}</p>`;
            }
            _html += `</li>`;
        }

        // ul_sudoku
        $(`#ul_sudoku`).innerHTML = _html;
    });

    $(`#bt_solution`).onclick = () => getSolutions();
}

const getSolutions = _ => {
    while (dataContainsZero()) {
        for (let i = 0, j = _data.length; i < j; i++) {
            for (let a = 0, b = _data[i].length; a < b; a++) {
                findNumbers(i, a);
            }
        }
    }
}

const dataContainsZero = _ => {
    let _containsZero = false;
    for (let i = 0, j = _data.length; i < j; i++) {
        for (let a = 0, b = _data[i].length; a < b; a++) {
            if (_data[i][a] == 0) {
                _containsZero = true;
                break;
            }
        }
    }
    return _containsZero;
}

const caseNumbers = _id_tab => {
    for (let a = 0, b = _data[_id_tab].length; a < b; a++) {
        findNumbers(_id_tab, a);
    }
}

const findNumbers = (_id_tab, _num_tab) => {
    let _elem = $(`p[data-id="${_id_tab}"][data-num="${_num_tab}"]`);
    let _foundNumber = false;
    if (!_elem.innerText) {
        let _tabFinalRes = [];
        let _tabSolutions = [];

        let _tabLine = getDataLine(_id_tab, _num_tab);
        let _tabCol = getDataCol(_id_tab, _num_tab);
        let _tabArray = getDataArray(_id_tab);

        // console.log(`line`, _tabLine);
        // console.log(`col`, _tabCol);
        // console.log(`array`, _tabArray);

        // concat
        _tabSolutions = _tabSolutions.concat(_tabLine, _tabCol, _tabArray);
        // remove 0
        _tabSolutions = _tabSolutions.filter(value => value > 0);
        // set unique
        _tabSolutions = [...new Set(_tabSolutions)];
        // sort
        _tabSolutions = _tabSolutions.sort();

        // console.log(_tabSolutions);

        for (let i = 1; i <= 9; i++) {
            if (_tabSolutions.indexOf(i) == -1) _tabFinalRes.push(i);
        }

        console.log(_tabFinalRes);

        if (_tabFinalRes.length == 1) {
            _data[_id_tab][_num_tab] = _tabFinalRes[0];
            _elem.innerHTML = _tabFinalRes[0];
            _foundNumber = true;
        }
    }
    return _foundNumber;
}

const getDataLine = (_id_tab, _num_tab) => {
    let _tabRes = [];
    let x = 0, y = 0;

    if (_num_tab < 3) x = 0;
    else if (_num_tab < 6) x = 3;
    else x = 6;

    if (_id_tab < 3) y = 0;
    else if (_id_tab < 6) y = 3;
    else y = 6;

    for (let i = y; i < (y + 3); i++) {
        for (let j = x; j < (x + 3); j++) _tabRes.push(_data[i][j]);
    }
    return _tabRes;
}

const getDataCol = (_id_tab, _num_tab) => {
    let _tabRes = [];
    let tab_1 = [];
    let tab_2 = [];
    let tab_a = [0, 3, 6];
    let tab_b = [1, 4, 7];
    let tab_c = [2, 5, 8];

    if (tab_a.includes(_id_tab)) tab_1 = tab_a;
    if (tab_b.includes(_id_tab)) tab_1 = tab_b;
    if (tab_c.includes(_id_tab)) tab_1 = tab_c;

    if (tab_a.includes(_num_tab)) tab_2 = tab_a;
    if (tab_b.includes(_num_tab)) tab_2 = tab_b;
    if (tab_c.includes(_num_tab)) tab_2 = tab_c;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            _tabRes.push(_data[tab_1[i]][tab_2[j]]);
        }
    }
    return _tabRes;

}

const getDataArray = _id_tab => {
    let _tabArray = [];
    for (let i = 0; i < 9; i++) _tabArray.push(_data[_id_tab][i]);
    return _tabArray;
}

const displayNumber = _num => (_num > 0) ? _num : ``;

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
                resolve(_json[numSudoku]);
            })
            .catch(error => {
                throw new Error(`HTTP error ${error}`);
            })
    });
}