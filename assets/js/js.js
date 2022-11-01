"use strict";

/**
 * @author Elmahdi KORFED <elmahdi.korfed@gmail.com>
 */

//--- for JS selection
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
let _data = [];

window.onload = (_) => {
  // load & set json data
  fetch(
    new Request(`./assets/cv/json/cv.json`, {
      method: `GET`,
      headers: new Headers(),
      mode: `cors`,
      cache: `default`,
    })
  )
    .then((response) => {
      if (!response.ok) throw new Error(`HTTP error ${response.status}`);
      return response.json();
    })
    .then((d) => {
      // header
      $(`#p_name`).innerHTML = `${
        d.about.firstname
      } ${d.about.lastname.toUpperCase()}`;
      $(`#p_job`).innerHTML = d.about.job_position;
      // footer
      $(`footer p`).innerHTML = d.about.footer;
      // aside
      $(`#img_bio`).src = d.about.photo;
      $(`#p_resume_title`).innerHTML = d.about.bio_web_title;
      $(`#p_resume`).innerHTML = d.about.bio_web;
      // - links
      $(`#email_link`).href = `mailto:${d.about.contact.email}`;
      //$(`#facebook_link`).href = d.about.contact.facebook;
      // $(`#codepen_link`).href = d.about.contact.codepen;
      $(`#github_link`).href = d.about.contact.github;
      $(`#linkedin_link`).href = d.about.contact.linkedin;
      // - download CV
      $(`#a_download_cv`).href = d.about.contact.resume;
      // portfolio
      _data = [
        ...d.portfolio[0].projects.filter((project) => project.visible), // games
        ...d.portfolio[1].projects.filter((project) => project.visible), // games
        ...d.portfolio[2].projects.filter((project) => project.visible), // services
      ];
      let _html = ``;
      for (const key in _data)
        _html += `
            <li id="li_${key}" class="animateUp box" style="animation-delay:${key / 6}s" data-title="${_data[key].title}">
                <a href="${_data[key].link}" target="_blank" rel="noreferrer noopener">

                <div class="div_portfolio">
                    <div class="square">
                        <img src="${_data[key].src}" alt="${_data[key].title}" onerror="this.onerror=null; this.src='./assets/images/notfound.jpg'">
                    </div>
                    <div class="div_des">
                        <div>
                            <p class="p_title">${_data[key].title}</p>
                            <p class="p_des">${_data[key].description}</p>
                        </div>
                        <ul>${_data[key].skills.map((s) => `<li>${s}</li>`).join("")}</ul>
                    </div>
                </div>

                </a>
            </li>`;
      $(`#ul_portfolio`).innerHTML = _html;
    })
    .catch((error) => {
      throw new Error(`HTTP error ${error}`);
    });

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
  };

  // set dark/light mode
  if (
    window.matchMedia &&
    window.matchMedia(`(prefers-color-scheme: dark)`).matches
  )
    _setDarkMode();
  $(`#in_darkmode`).onclick = (_evt) => _setDarkMode(_evt.target.checked);
};
window
  .matchMedia(`(prefers-color-scheme: dark)`)
  .addEventListener(`change`, (e) => _setDarkMode(e.matches));

const _setDarkMode = (_mode = true) => {
  $(`#lb_darkmode`).className = `far ${_mode ? `fa-sun` : `fa-moon`}`;
  $(`body`).dataset.theme = _mode ? `dark` : ``;
  $(`#in_darkmode`).checked = _mode;
};
