let searchInputEle = document.getElementById("searchInput");
let searchResultsEle = document.getElementById("searchResults");
let spinnerEle = document.getElementById("spinner");

function createAndAppendSearchResults(results) {
    let resultItem = document.createElement("div");
    resultItem.classList.add("result-item");
    searchResultsEle.appendChild(resultItem);

    let { link, title, description } = results;

    let titleEle = document.createElement("a");
    titleEle.href = link;
    titleEle.target = "_blank";
    titleEle.textContent = title;
    titleEle.classList.add("result-title");
    resultItem.appendChild(titleEle);

    resultItem.appendChild(document.createElement("br"));

    let urlEle = document.createElement("a");
    urlEle.classList.add("result-url");
    urlEle.href = link;
    urlEle.target = "_blank";
    urlEle.textContent = link;
    resultItem.appendChild(urlEle);

    resultItem.appendChild(document.createElement("br"));

    let descEle = document.createElement("p");
    descEle.classList.add("link-description");
    descEle.textContent = description;
    resultItem.appendChild(descEle);
}

function displayResults(results) {
    searchResultsEle.textContent = "";
    if (!Array.isArray(results) || results.length === 0) {
        let noResults = document.createElement("p");
        noResults.textContent = "No results found.";
        searchResultsEle.appendChild(noResults);
        return;
    }
    spinnerEle.classList.toggle("d-none"); 
    for (let item of results) {
        createAndAppendSearchResults(item);
    }
}

function searchWiki(event) {
    if (event.key === "Enter") {
        spinnerEle.classList.toggle("d-none");
        let searchInpVal = searchInputEle.value.trim();

        if (!searchInpVal) {
            spinnerEle.classList.toggle("d-none");
            searchResultsEle.textContent = "";
            let msg = document.createElement("p");
            msg.textContent = "Please type something to search.";
            searchResultsEle.appendChild(msg);
            return;
        }

        let url = "https://apis.ccbp.in/wiki-search?search=" + encodeURIComponent(searchInpVal);
        let options = { method: 'GET' };

        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let { search_results } = jsonData;
                displayResults(search_results);
            })
            
    }
}

searchInputEle.addEventListener("keydown", searchWiki);
