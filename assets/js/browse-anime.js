// global variable declaration
var browseAnimeCards = $('#browse-anime-cards');
console.log(browseAnimeCards.children()[0]);

// setting up the initial call function
var browseAnime = function () {
    fetch(
        // fetching data from kitsu based on anime popularity, max 12 items per page, first page
        // maybe sort by alphabetical order? My hero academia seasons 1-3 show up as different anime
        'https://kitsu.io/api/edge/anime?sort=popularityRank&page[limit]=12&page[offset]=0'
    )
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            // looping through all 12 results
            for (i = 0; i < 12; i++) {
                // creating the title element and putting text in it
                var browseAnimeTitle = $('<h2 class="title is-6"></h2>');
                var englishTitle = data.data[i].attributes.titles.en;
                var japaneseTitle = data.data[i].attributes.titles.en_jp;
                if (englishTitle == undefined) {
                    browseAnimeTitle.text(japaneseTitle);
                } else {
                    browseAnimeTitle.text(englishTitle);
                }
                console.log(browseAnimeTitle);
                // creating the image element and putting a src in it
                var browseAnimeImage = $('<img class="anime-browse-img is-12-mobile is-3-desktop"></img>');
                browseAnimeImage.attr('src', data.data[i].attributes.coverImage.original);
                console.log(browseAnimeImage);
                // grabbing the anime id from the api and adding it to the existing anchor
                var browseID = data.data[i].id;
                var anchor = browseAnimeCards.children()[i];
                console.log(anchor);
                anchor.setAttribute('id', browseID);
                // appending the cover image and title to the anchors
                browseAnimeTitle.appendTo(anchor);
                browseAnimeImage.appendTo(anchor);
            }
        });
}

var cardsReal = browseAnimeCards.children();
var id;
function swapPage(event) {
    event.preventDefault();
    var btnClicked = $(this);
    id = btnClicked.attr('id');
    console.log(id);
    localStorage.setItem("id", id);
    var redirectUrl = './anime.html';
    document.location = redirectUrl;
}

cardsReal.on('click', swapPage);

browseAnime();