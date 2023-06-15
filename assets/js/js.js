"use strict";

/**
 * @author Elmahdi KORFED <elmahdi.korfed@gmail.com>
 */

//--- for JS selection
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
import d from "./cv.js";

window.onload = (_) => {
  // header
  $(`#p_name`).innerHTML = `${d.about.firstname
    } ${d.about.lastname.toUpperCase()}`;
  $(`#p_job`).innerHTML = d.about.job_position;
  // footer
  $(`footer p`).innerHTML = d.about.footer;
  // aside
  $(`#img_bio`).src = d.about.photo;
  // $(`#p_resume_title`).innerHTML = d.about.bio_web_title;
  $(`#p_resume`).innerHTML = d.about.bio_web;
  // links
  $(`#email_link`).href = `mailto:${d.about.contact.email}`;
  $(`#github_link`).href = d.about.contact.github;
  $(`#linkedin_link`).href = d.about.contact.linkedin;
  // resume
  $(`#a_download_cv`).href = d.about.contact.resume;
  // portfolio
  const dataPortfolio = [
    ...d.portfolio[0].projects.filter((project) => project.visible), // enterprise
    ...d.portfolio[1].projects.filter((project) => project.visible), // services
    ...d.portfolio[2].projects.filter((project) => project.visible), // games
  ];
  dataPortfolio.map((d, index) => $(`#ul_portfolio`).insertAdjacentHTML(`beforeEnd`, displayPortfolio(index, d)));

  // search a projet
  $(`#in-search`).oninput = (_event) => {
    let _searchTerm = _event.target.value;
    $$(`#ul_portfolio > li`).forEach((item) => {
      if (
        _searchTerm === "" ||
        item
          .getAttribute("data-title")
          .toLowerCase()
          .includes(_searchTerm.toLowerCase())
      ) {
        if (item.classList.contains(`hidden`)) item.classList.remove(`hidden`);
      } else {
        if (!item.classList.contains(`hidden`)) item.classList.add(`hidden`);
      }
    });

    if ($$(`#ul_portfolio > li.hidden`).length === dataPortfolio.length) {
      if ($('#div_results').classList.contains(`hidden`)) $('#div_results').classList.remove(`hidden`);
    } else if (!$('#div_results').classList.contains(`hidden`)) $('#div_results').classList.add(`hidden`);
  };

  // set dark/light mode
  if (
    window.matchMedia &&
    window.matchMedia(`(prefers-color-scheme: dark)`).matches
  )
    _setDarkMode();
  $(`#in_darkmode`).onclick = (_evt) => _setDarkMode(_evt.target.checked);
};


const displayPortfolio = (_num, _element) => {
  return `
<li id="li_${_num}" class="animateUp box" style="animation-delay:${_num / 6}s" data-title="${_element.title}">
  <a href="${_element.link}" target="_blank" rel="noreferrer noopener">
    <div class="div_portfolio">
        <div class="square">
            <img src="${_element.src}" alt="${_element.title}" onerror="this.onerror=null; this.src='./assets/images/notfound.jpg'">
        </div>
        <div class="div_des">
            <div>
                <p class="p_title">${_element.title}</p>
                <p class="p_des">${_element.description}</p>
            </div>
            <ul>${_element.skills.map((s) => `<li>${s}</li>`).join("")}</ul>
        </div>
    </div>
  </a>
</li>`
}

window
  .matchMedia(`(prefers-color-scheme: dark)`)
  .addEventListener(`change`, (e) => _setDarkMode(e.matches));

const _setDarkMode = (_mode = true) => {
  $(`#lb_darkmode`).className = `${_mode ? `fa-brands fa-first-order-alt` : `far fa-moon`}`;
  $(`body`).dataset.theme = _mode ? `dark` : ``;
  $(`#in_darkmode`).checked = _mode;
};