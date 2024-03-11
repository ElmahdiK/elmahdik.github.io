"use strict";

/**
 * @author Elmahdi KORFED <elmahdi.korfed@gmail.com>
 */

//--- for JS selection
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

window.onload = (_) => {
  fetch('./assets/data/cv.json')
    .then(response => response.json())
    .then(data => {
      const d = data[0];
      // header
      $(`#p_name`).innerHTML = `${d.about.name.first} ${d.about.name.last.toUpperCase()}`;
      $(`#p_job`).innerHTML = d.about.job;
      // aside
      $(`#img_bio`).src = d.about.url.img;
      $(`#p_resume_title`).innerHTML = d.about.bio.title;
      $(`#p_resume`).innerHTML = d.about.bio.text;
      // links
      $(`#email_link`).href = `mailto:${d.about.url.email}`;
      $(`#github_link`).href = d.about.url.github;
      $(`#linkedin_link`).href = d.about.url.linkedin;
      // resume
      $(`#a_download_cv`).href = d.about.url.resume;
      // projects
      d.projects.map((project, index) => $(`#ul_portfolio`).insertAdjacentHTML(`beforeEnd`, displayProject(project, index)));
    })
    .catch(err => console.log(err))

  // set dark/light mode
  if (window.matchMedia && window.matchMedia(`(prefers-color-scheme: dark)`).matches) _setDarkMode();
  $(`#isDarkMode`).onchange = ({ target }) => _setDarkMode(target.checked);
};

const displayProject = ({ label, url, description, skills }, num) => `
<li class="animateUp box" style="animation-delay:${num / 6}s" data-title="${label}">
  <a href="${url ?? './assets/projects/' + label.split(' ').join('')}" target="_blank" rel="noreferrer noopener">
    <div class="div_portfolio">
        <div class="square">
            <img src="./assets/projects/${label.split(' ').join('')}/assets/images/image.webp" alt="${label}" onerror="this.onerror=null; this.src='./assets/images/notfound.avif'">
        </div>
        <div class="div_des">
            <div>
                <p class="p_title">< ${label} /></p>
                <p class="p_des">${description}</p>
            </div>
            <ul><li>html</li><li>css</li>${skills.map((s) => `<li>${s}</li>`).join("")}</ul>
        </div>
    </div>
  </a>
</li>`;

window.matchMedia(`(prefers-color-scheme: dark)`).addEventListener(`change`, ({ matches }) => _setDarkMode(matches));

const _setDarkMode = (_mode = true) => {
  $(`#img_mode`).src = `./assets/images/${_mode ? 'dark.svg' : 'light.svg'}`;
  $(`body`).dataset.theme = _mode ? `dark` : ``;
}