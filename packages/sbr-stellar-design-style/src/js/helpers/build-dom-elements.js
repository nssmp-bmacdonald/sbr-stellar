export const buildList = (sportsbooksList, region) => {
    let html = '';
    let counter = 0;
    //console.log(sportsbooksList);
    for (let item of sportsbooksList) {
        let filterOptions = item.rating?.grade.toLowerCase()+";";
        for (let filter of item?.filters)
        {
            if (filter == item.filters[item.filters.length - 1])
            {
                filterOptions += filter.toLowerCase();
            }
            else
            {
                filterOptions += filter.toLowerCase()+";";
            }
        }
        //Setting up sportsbook url to pull svg or png
        let sportsbookURL = item.playbook.icon + "?fm=webp&auto=compress&auto=format&h=auto&w=120px";

        if (item.playbook.iconColor?.fileName != null) {
            sportsbookURL = environmentConfig.cdnUrl + environmentConfig.cdnFolder + "/" + item.playbook.iconColor.fileName;
        }


        html += `<div id="fsl-item-${counter}" class="fsl-item mb-2 d-lg-flex flex-nowrap bg-white" data-attributes="${filterOptions}">`;
            html += `<div class="fsl-sportsbook d-flex flex-column">
                        <div class="fsl-itemHeading d-flex">
                            <div class="fsl-itemHeading-bookRating"><p>${item.rating?.grade}</p></div>
                            <h2 class="h6 pt-3">${item.playbook?.titleH1}</h2>
                        </div>
                        <div class="fslItem-Logo d-flex justify-content-center">
                            <a href="${item?.affiliateLink}" target="_blank" rel="nofollow" data-aatracker="Toplist - Partner Logo - ${item?.name}">
                                <img src="${sportsbookURL}" alt="${item.playbook?.titleH1} Logo" width="120" height="40" style="height:auto" />
                            </a>
                        </div>
                    </div>`;
            html += `<div class="fsl-rating d-flex justify-content-center align-items-center">
                        <img src="${environmentConfig.cdnUrl}${item.rating.gradeIcon}?fm=webp&w=45&h=45&auto=compress&auto=format" width="45" height="45" alt="Icon rating ${item.rating.gradeIcon.toLowerCase()}">
                    </div>`;
            
                html += `<div class="fsl-bonus d-flex flex-column justify-content-center align-items-center">`;
                    if (region.toLowerCase() == "on") {
                        html += `<p>${item.prosCons?.pros[0]}</p>`;
                    }else {
                        if (item.prosCons) {
                            html += `<p>${(item.bonus?.primaryPromo?.headline) ? item.bonus?.primaryPromo.headline : (item.prosCons && item.prosCons?.pros) ? item.prosCons?.pros[0] : ''}</p>`;
                        }
                    }
                html += `</div>`;
            
            html += `<div class="fsl-banking d-flex">`;
                    if (item.banking) {
                        for (let paymentProvider of item.banking?.top3ProviderLogos)
                        {
                            html += `<img src="${environmentConfig.cdnUrl}${paymentProvider?.url}?fm=webp&auto=compress&auto=format&h=45" alt="${paymentProvider?.alt} logo" height="45" style="width:auto;">`;
                        }
                    }
            html += `</div>`;
            html += `<div class="fsl-review d-flex flex-column justify-content-center align-items-center">
                        <a class="fsl-reviewCTA btn btn-primary external-sportsbook-link" target="_blank" rel="nofollow" href="${item?.affiliateLink}" data-aatracker="Toplist - Visit Site CTA - ${item?.name}">Visit <span class="visually-hidden">${item?.name} </span> &nbsp; Site</a>
                        <a class="fsl-reviewLink" href="/betting-sites/${item?.slug}">${item?.playbook.titleH1}</a>
                    </div>`;
        
        html += '</div>';
        counter++;
    }
    
    return html;
}

export const buildFilters = (jsonSportsbooksFilters, region) => {
    let html = ''
    for (let filter of jsonSportsbooksFilters) {
    {
        if (filter?.items.length > 0)
        {
            if ( filter.header == "Sign Up Bonus" && region == "ontario")
            {
            }else
            {
                html += `<div id="${filter.header.toLowerCase().replace(" ", "-")}" class="filter-form-group">
                            <div class="labelAndClear-Wrapper">
                                <span>${filter.header}</span>
                                <button class="no-button" data-toggle="clear" data-target="${filter.header.toLowerCase().replace(" ", "-")}">Clear</button>
                            </div>
                        <div class="checkbox-list">`;
                            let counter = 0; 
                            for (let item of filter.items)
                            {
                                html += `<div class="checkbox ${item.name.replace(" ", "-").toLowerCase()}-${counter}">
                                        <input data-filter-key="${item.name.toLowerCase()}" id="${item.name.toLowerCase()}" type="checkbox" />
                                    <label for="${item.name.toLowerCase()}" class="checkbox-label">${item.name.replace("_", " ")}</label>
                                </div>`;
                                counter++;
                            }
                        }
                html += `</div>
                         </div>`;
                    
            }
        }
    }
    return html;
}


export const searchList = (sportsbooksList, region) => {
    let html = '';

    html += `<div class="search-results-container">`;
        html += `<div class="search-results-header">Sportsbooks <span>Rating</span></div>`;
        html += `<ol class="list-unstyled">`;  
        let counter = 0;    
        for (let item of sportsbooksList) {         
            html += `<li id="result-item-${counter}" class="search-results-item ${ (counter < 5) ? ' show' : ' hide'}">`;
                html += `<a href="/betting-sites/${item?.slug}" class="review-link">
                    <strong>${item.playbook?.titleH1}</strong>
                    <div class="search-results-rating">
                        <img src="${environmentConfig.cdnUrl}${item.rating.gradeIcon}" width="32" height="32" alt="Icon rating ${item.rating.gradeIcon.toLowerCase()}" />
                    </div>
                </a>
            </li>`;
            counter++;
        }
        html += `</ol>`; 
        html += `<div class="search-results-item">
                    <a class="search-visit-link" href="/betting-sites${(region == 'us') ? '' : '-' + region}/">Visit Betting Sites Guide</a>
                </div>`;
    html += `</div>`;
    return html;

}


export const buildArticleList = (articles) => {
    let html = '';
    let counter = 0;
        for (let article of articles)
        {
            const url = `/${article.section}/${article.section == 'picks' ? article.urlPath.path + '/' : ''}${article.slug}/`;
            html += `<div id="article-${counter}" class="row my-4">`;
            html += `<a class="col-md-2 text-center text-md-start" href="${url}" data-aatracker="Page Link - Article Page - ${article.title}">`;
                    if (article.imageDetail !== null)
                    {
                        html += `<picture>`;
                            html += `<source media="(min-width: 1366px)" srcset="https://img.sportsbookreview.com/uploads/${article.imageDetail.fileName}?fm=webp&auto=format&auto=compress&w=150&h=150&fit=crop&crop=faces,top,left" width="150" height="150" />`;
                            html += `<source media="(min-width: 768px)" srcset="https://img.sportsbookreview.com/uploads/${article.imageDetail.fileName}?fm=webp&auto=format&auto=compress&w=120&h=120&fit=crop&crop=faces,top,left" width="120" height="120" />`;
                            html += `<img src="https://img.sportsbookreview.com/uploads/${article.imageDetail.fileName}?fm=webp&auto=format&auto=compress&w=${article.imageDetail.width * 0.5}&h={article.imageDetail.height * 0.5}&fit=crop&crop=faces,top,left" width="${article.imageDetail.width * 0.5}" height="${article.imageDetail.height * 0.5}" alt="${(article.imageDetail.alt !== null) ? article.imageDetail.alt : article.imageDetail.title}" />`;
                        html += `</picture>`;
                    }
                    html += `</a>`;
                    html += `<div class="col-md-8 text-center text-md-start">`;
                    html += `<div class="">`;
                        if (article.section == "picks")
                        {
                            html += `<div class="ribbon mt-3 mt-md-0 mt-lg-0 mt-xl-0">${article.section}</div>`;
                        }
                        html += `<a href="${url}" data-aatracker="Page Link - Article Page - ${article.title}"><h3 class="mt-3 ms-2">${article.title}</h3></a>`;
                        html += `<p class="small opacity-75 ms-2"><b>&nbsp;${article.publishedDateRelativeTime}</b></p>`;
                        html += `</div>`;
                    html += `</div>`;
                html += `<hr class="my-3 bg-blue col-lg-10 opacity-25" />`;
            html += `</div>`;
            counter++;
        }
    return html;
}