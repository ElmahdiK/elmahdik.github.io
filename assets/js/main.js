"use strict";

/**
 * @author Elmahdi KORFED <elmahdi.korfed@gmail.com>
 */

//--- for JS selection
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

window.onload = (_) => {
  fetch('./assets/json/cv.json')
    .then(response => response.json())
    .then(data => {
      const d = data[0];
      // header
      $(`#p_name`).innerHTML = `${d.about.firstname} ${d.about.lastname.toUpperCase()}`;
      $(`#p_job`).innerHTML = d.about.job_position;
      // footer
      $(`footer p`).innerHTML = d.about.footer;
      // aside
      $(`#img_bio`).src = d.about.photo;
      $(`#p_resume_title`).innerHTML = d.about.bio_web_title;
      $(`#p_resume`).innerHTML = d.about.bio_web;
      // links
      $(`#email_link`).href = `mailto:${d.about.contact.email}`;
      $(`#github_link`).href = d.about.contact.github;
      $(`#linkedin_link`).href = d.about.contact.linkedin;
      // resume
      $(`#a_download_cv`).href = d.about.contact.resume;
      // portfolio
      const dataPortfolio = [
        ...d.portfolio[0].projects, // enterprise
        ...d.portfolio[1].projects, // services
        ...d.portfolio[2].projects, // games
      ].filter(project => project.visible);
      dataPortfolio.map((d, index) => $(`#ul_portfolio`).insertAdjacentHTML(`beforeEnd`, displayPortfolio(index, d)));
    })
    .catch(err => console.log(err))

  // set dark/light mode
  if (window.matchMedia && window.matchMedia(`(prefers-color-scheme: dark)`).matches) _setDarkMode();
  $(`#lb_darkmode`).onchange = ({ target }) => _setDarkMode(target.value);
};

const displayPortfolio = (_num, { title, link, src, description, skills }) => `
<li class="animateUp box" style="animation-delay:${_num / 6}s" data-title="${title}">
  <a href="${link}" target="_blank" rel="noreferrer noopener">
    <div class="div_portfolio">
        <div class="square">
            <img src="${src}" alt="${title}" onerror="this.onerror=null; this.src='./assets/images/notfound.jpg'">
        </div>
        <div class="div_des">
            <div>
                <p class="p_title">${title}</p>
                <p class="p_des">${description}</p>
            </div>
            <ul>${skills.map((s) => `<li>${s}</li>`).join("")}</ul>
        </div>
    </div>
  </a>
</li>`;

window.matchMedia(`(prefers-color-scheme: dark)`).addEventListener(`change`, ({ matches }) => _setDarkMode(matches));

const _setDarkMode = (_mode = true) => $(`body`).dataset.theme = _mode ? `dark` : ``;