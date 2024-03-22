/**
 * @author Elmahdi KORFED <elmahdi.korfed@gmail.com>
 */

//--- for JS selection
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

import d from '../data/citations.js';
window.onload = _ => d.map(e => e.quotes.forEach(q => $(`#ul_citations`).insertAdjacentHTML(`beforeEnd`, `<li><div><p><q> ${q} </q><br><br>- ${e.author} -</p></div></li>`)));