// build query string and navigate to search results
// NOTE: lists in the query string are in comma-separated form
function searchCards() {
    var form = document.forms['search'];

    // begin to build query string
    var queryString = "";

    // basic search terms
    // NAME
    if (form['name'].value !== undefined && form['name'].value !== null && form['name'].value !== "") {
        queryString += `name=${form['name'].value}`;
    }
    // COLOR(S)
    let colors = [];
    for (let i = 0; i < 5; i++) {
        if (form['colors[]'][i].checked) colors.push(form['colors[]'][i].value);
    }
    if (colors.length !== 0) {
        queryString += `&colors=${colors.join(',')}`;
    }

    // advanced search terms
    if (form['search_type'].value === "advanced") {
        // EXPANSION
        if (form['expansion'].value !== undefined && form['expansion'].value !== null && form['expansion'].value !== "") {
            queryString += `&expansion=${form['expansion'].value}`;
        }
        // TYPE(S)
        let types = [];
        for (let i = 0; i < 8; i++) {
            if (form['types[]'][i].selected) types.push(form['types[]'][i].value);
        }
        if (types.length !== 0) {
            queryString += `&types=${types.join(',')}`;
        }
        // SUPERTYPE(S)
        let supertypes = [];
        for (let i = 0; i < 6; i++) {
            if (form['supertypes[]'][i].selected) supertypes.push(form['supertypes[]'][i].value);
        }
        if (supertypes.length !== 0) {
            queryString += `&supertypes=${supertypes.join(',')}`;
        }
        // SUBTYPE(S)
        if (form['subtypes[]'].value !== undefined && form['subtypes[]'].value !== null && form['subtypes[]'].value !== "") {
            queryString += `&subtypes=${form['subtypes[]'].value}`;
        }
        // CMC
        if (form['cmc'].value !== undefined && form['cmc'].value !== null && form['cmc'].value !== "") {
            queryString += `&cmc=${form['cmc'].value}`;
        }
        // POWER
        if (form['power'].value !== undefined && form['power'].value !== null && form['power'].value !== "") {
            queryString += `&power=${form['power'].value}`;
        }
        // TOUGHNESS
        if (form['toughness'].value !== undefined && form['toughness'].value !== null && form['toughness'].value !== "") {
            queryString += `&toughness=${form['toughness'].value}`;
        }
    }
    // scrub the first character if it's an ampersand
    if (queryString.startsWith('&')) queryString = queryString.substring(1);
    // redirect to results
    window.location.href = `./results.html?${queryString}`;
}

// make an API call and send data to "displayResults()"
function fetchCards(url) {
    // get URL to API call
    var endpoint = buildEndpoint(url);
    console.log('Making API call to ' + endpoint);

    // make new AJAX
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            // on success display results
            displayResults(JSON.parse(xhttp.responseText).cards);
        } else if (this.status >= 400) {
            console.log('Error trying to make request...');
        }
    }
    xhttp.open("GET", endpoint, true);
    // this header will limit the results if someone types something
    // inspecific like 'Forest' that might return 100s of results
    xhttp.setRequestHeader('Page-Size', '25');
    // send AJAX
    xhttp.send();
}

// rip the current query string and stitch it to the API endpoint
function buildEndpoint(url) {
    var query = url.split('results.html?')[1];
    var endpoint = `https://api.magicthegathering.io/v1/cards?${query}`;
    return endpoint;
}

// display the results of the API call
function displayResults(results) {
    /***** TEMPLATE
    <li>
        <ul>
            <li><p><strong>${card.name}</strong> - &#40;${card.setName}#41;</p></li>
            <li><img alt="${card.name}" src="${card.imageUrl}"></li>
        </ul>
    </li>
    *****/

   // build results elements
    var items = results.map(card => {
        var listItem = document.createElement('li');
        listItem.innerHTML = `<ul><li><p><strong>${card.name}</strong> - &#40;${card.setName}&#41;</p></li><li><img alt="${card.name}" src="${card.imageUrl}"></li></ul>`;
        return listItem;
    });

    // delete loading bar
    document.getElementById('loading').remove();
    // display results
    var list = document.getElementById('results');
    items.forEach(i => list.appendChild(i));
}