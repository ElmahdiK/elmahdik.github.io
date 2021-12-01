/**
 * @author Elmahdi KORFED <elmahdi.korfed@gmail.com>
 */

//--- for JS selection
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const _pathJSON = `./assets/json/cv.json`;
let _data;

window.onload = _ => {
    _loadData().then(d => {
        // header
        $(`#p_name`).innerHTML = `${d.about.firstname} ${d.about.lastname.toUpperCase()}`;
        $(`#p_job`).innerHTML = d.about.job_position;
        // aside
        $(`#img_bio`).src = d.about.photo;
        $(`#p_resume_title`).innerHTML = d.about.bio_web_title;
        $(`#p_resume`).innerHTML = d.about.bio_web;
        // aside links
        $(`#email_link`).href = `mailto:${d.about.contact.email}`;
        $(`#facebook_link`).href = d.about.contact.facebook;
        $(`#linkedin_link`).href = d.about.contact.linkedin;
        // aside download CV
        $(`#a_download_cv`).href = d.about.contact.resume;
        // aside footer
        $(`footer p`).innerHTML = d.about.footer;
        // portfolio
        $(`#ul_portfolio`).innerHTML = _renderULPortfolio();
    });
}

/** 
 * @function _renderULPortfolio
 * @returns {string}
 */
let _renderULPortfolio = _ => {
    let _html = ``;
    for (const key in _data) _html += _renderLI(key);
    return _html;
}

/** 
 * @function _renderLI
 * @param {number} key 
 * @returns {string}
 */
let _renderLI = (key = null) => {
    return `
    <li id="li_${key}" class="animateUp box" style="animation-delay:${key / 6}s">
    <a href="${_data[key].link}" target="_blank" rel="noreferrer noopener">
    <div class="div_portfolio">
    <div class="square"><img src="${_data[key].src}" alt="${_data[key].title}" onerror="this.onerror=null; this.src='./assets/images/notfound.jpg'"></div>
    <p class="p_title">${_data[key].title}</p>
    <p class="p_des">${_data[key].description}</p>
    </div>
    </a>
    </li>`;
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
                const _portfolioEntreprise = _json.portfolio[0].projects.filter(project => project.visible);
                const _portfolioPersonnal = _json.portfolio[1].projects.filter(project => project.visible);
                const _portfolioGame = _json.portfolio[2].projects.filter(project => project.visible);

                _data = [
                    ..._portfolioGame,
                    ..._portfolioEntreprise,
                    ..._portfolioPersonnal
                ];
                resolve({
                    about: _json.about,
                    portfolio: _data
                });
            })
            .catch(error => {
                throw new Error(`HTTP error ${error}`);
            })
    });
}