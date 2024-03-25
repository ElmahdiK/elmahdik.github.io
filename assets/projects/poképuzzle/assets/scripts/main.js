/**
* @author Elmahdi KORFED <elmahdi.korfed@gmail.com>
*/

const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const NB_ELEMENTS = 4;

window.onload = _ => setUpNewGame();

const setUpNewGame = _ => {
    const arrayN = getArrayNElements(Math.pow(NB_ELEMENTS, 2));
    const shuffleArray = setShuffleArray(arrayN);
    const shuffleArrayWithZero = setZeroToArray([...shuffleArray]);
    let index = 0;
    $(`#app`).innerHTML = '';
    shuffleArrayWithZero.forEach((nb, i) => {
        $(`#app`).insertAdjacentHTML(`beforeEnd`,
            renderCase({
                id: `num-${i}`,
                row: i % NB_ELEMENTS === (NB_ELEMENTS - 1) ? index++ : index,
                col: i % NB_ELEMENTS,
                nb: nb
            })
        );
    });
}

const getArrayNElements = (nbElements) => [...Array(nbElements).keys()].map(x => x + 1);

const setZeroToArray = (array) => {
    array.splice(getRandomNumber(0, array.length - 1), 1, 0);
    return array;
}

const renderCase = ({ id, row, col, nb }) => `<div id='${id}' data-row="${row}" data-col="${col}" data-content="${nb}" onclick="handleClick(this)">${nb !== 0 ? nb : ''}</div>`;

const handleClick = case_clicked => {
    let case_empty = $(`div[data-content="0"]`);
    if (case_clicked.id === case_empty.id) return;
    if ((case_clicked.dataset.col !== case_empty.dataset.col) && (case_clicked.dataset.row !== case_empty.dataset.row)) return;
    if (case_clicked.dataset.col === case_empty.dataset.col) {
        if (case_empty.dataset.row < case_clicked.dataset.row) {
            for (let i = Number(case_empty.dataset.row); i < Number(case_clicked.dataset.row); i++) {
                swap({
                    from: {
                        row: i,
                        col: case_empty.dataset.col
                    },
                    to: {
                        row: i + 1,
                        col: case_empty.dataset.col
                    }
                });
            };
        } else {
            for (let i = Number(case_empty.dataset.row); i > Number(case_clicked.dataset.row); i--) {
                swap({
                    from: {
                        row: i,
                        col: case_empty.dataset.col
                    },
                    to: {
                        row: i - 1,
                        col: case_empty.dataset.col
                    }
                });
            };
        }
    }
    if (case_clicked.dataset.row === case_empty.dataset.row) {
        if (case_empty.dataset.col < case_clicked.dataset.col) {
            for (let i = Number(case_empty.dataset.col); i < Number(case_clicked.dataset.col); i++) {
                swap({
                    from: {
                        row: case_empty.dataset.row,
                        col: i
                    },
                    to: {
                        row: case_empty.dataset.row,
                        col: i + 1
                    }
                });
            };
        } else {
            for (let i = Number(case_empty.dataset.col); i > Number(case_clicked.dataset.col); i--) {
                swap({
                    from: {
                        row: case_empty.dataset.row,
                        col: i
                    },
                    to: {
                        row: case_empty.dataset.row,
                        col: i - 1
                    }
                });
            };
        }
    }
}

const swap = ({ from, to }) => {
    let _from = $(`div[data-row='${from.row}'][data-col='${from.col}']`);
    let _to = $(`div[data-row='${to.row}'][data-col='${to.col}']`);
    _from.dataset.row = Number(to.row);
    _from.dataset.col = Number(to.col);
    _to.dataset.row = Number(from.row);
    _to.dataset.col = Number(from.col);
}

const getRandomNumber = (_min, _max /* (included) */) => Math.floor(Math.random() * (_max - _min + 1) + _min);

let setShuffleArray = (array) => {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}