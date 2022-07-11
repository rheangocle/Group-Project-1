// global variable declaration
var englishTitleField = document.getElementById('title-english');
var japaneseTitleField = document.getElementById('title-jp');
var ageRatingField = document.getElementById('age-rating');
var userRatingField = document.getElementById('user-rating');
var descriptionField = document.getElementById('description');
var posterImageField = document.getElementById('poster');
var idField = document.getElementById("anime-id");
var pageTitleField = document.getElementById("anime-title");


// anime search feature
var searchAnime = function () {
    // user input from a search field
    var search = "jujutsu kaisen";
    // replacing spaces with %20 for the api call
    var title = search.replace(/ /g, "%20");
    // fetching data from the api, limiting to top 3 options during the search
    fetch(
        'https://kitsu.io/api/edge/anime?filter[text]=' + title + '&page[limit]=3&page[offset]=0'
    )
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            // for (i = 0; i < 3; i++) {
            //     var searchTitleEnglish = document.createElement('h3');
            //     searchTitleEnglish.textContent = data.data[i].attributes.titles.en;
            //     console.log(searchTitleEnglish);
            //     searchContainer.append(searchTitleEnglish);
            //     var searchUserRating = document.createElement('p');
            //     searchUserRating.textContent = data.data[i].attributes.averageRating;
            //     console.log(searchUserRating);
            //     searchContainer.append(searchUserRating);
            //     var searchPosterImage = document.createElement('a');
            //     searchPosterImage.textContent = data.data[i].attributes.posterImage.original;
            //     console.log(searchPosterImage);
            // }
            idField.textContent = data.data[0].id;
            populatePage();
        });
}
searchAnime();

// animeButton is a dummy variable. assign the real one later
// animeButton.addEventListener("click", changePages);

var populatePage = function () {
    // fetching data from the api
    var id = localStorage.getItem("id");
    getFoodList(id);
    console.log(id);
    fetch(
        'https://kitsu.io/api/edge/anime/' + id
    )
        .then(function (response) {
            return response.json();
        })
        // putting anime info onto the page
        .then(function (data) {
            // setting anime attributs to the page
            // setting the english title
            var titleEnglish = data.data.attributes.titles.en;
            // setting the japanese title
            // var camelizedName = camelize(titleEnglish);
            // getFoodList(camelizedName);
            var titleJP = data.data.attributes.titles.en_jp;
            // checking if either title is not listed and putting info on the page based on which titles exist
            if (titleEnglish == undefined) {
                japaneseTitleField.textContent = "Japanese Title: " + titleJP;
                englishTitleField.textContent = "English Title: " + titleJP;
                pageTitleField.textContent = "Animame | " + titleJP;
            } else if (titleJP == undefined) {
                japaneseTitleField.textContent = "Japanese Title: " + titleEnglish;
                englishTitleField.textContent = "English Title: " + titleEnglish;
                pageTitleField.textContent = "Animame | " + titleEnglish;
            } else {
                japaneseTitleField.textContent = "Japanese Title: " + titleJP;
                englishTitleField.textContent = "English Title: " + titleEnglish;
                pageTitleField.textContent = "Animame | " + titleEnglish;
            }
            // setting the age rating and checking if certain fields are empty before putting info on the page
            var ageRating = data.data.attributes.ageRating;
            var ageRatingGuide = data.data.attributes.ageRatingGuide;
            if (ageRatingGuide == null) {
                ageRatingField.textContent = "Age Rating: " + ageRating;
            } else {
                ageRatingField.textContent = "Age Rating: " + ageRating + " - " + ageRatingGuide;
            }
            // setting the average user rating and putting it on the page
            var userRating = data.data.attributes.averageRating;
            userRatingField.textContent = "Average User Rating: " + userRating;
            // setting the description and poster image and putting them on the page
            var description = data.data.attributes.description;
            descriptionField.textContent = description;
            var posterImage = data.data.attributes.posterImage.original;
            posterImageField.src = posterImage;
        });
}


//Tasty API

var foodObj = {
    45398: ['butter cookies', 'strawberry shortcake', 'omurice', 'marinade', 'nut pancake', 'parfait', 'bloody orange juice', 'ice cocoa', 'stew'],
    41370: ['tempura', 'bento box', 'onigiri', 'udon', 'gyunabe', 'miso', 'kabayaki', 'sake', 'daikon', 'konpeito'],
    11: ['ramen', 'dango', 'yakiniku', 'curry', 'fish on a stick', 'onigiri', 'bento', 'fried rice'],
    199: ['beans', 'fruit', 'egg', 'pudding', 'takoyaki'],
    6452: ['boiled egg', 'coconut milk', 'curry', 'instant noodles', 'lava cookie', 'rice balls', 'stew', 'poffins', 'muffins', 'mini cake', 'masaladas', 'ketchup'],
    12: ['boiled chicken', 'seafood pasta', 'lobster', 'sashimi', 'seafood risotto', 'takoyaki', 'fried rice', 'seafood fried rice', 'roz bel laban', 'bread', 'lasagna', 'cotton candy', 'chocolate', 'ice cream', 'donuts', 'manju', 'tarts', 'croquembouche', 'biscuits', 'chiffon cake', 'spongecake', 'mochi', 'shiruko', 'semla', 'dango'],
    7442: ['omelette', 'hamburger steak', 'baked potato', 'chicken okonomiyaki', 'strawberry bread', 'stew'],
    42765: ['crepe', 'nabe', 'rice ball', 'soy beans', 'sandwich', 'chicken meatballs'],
    11469: ['tart', 'truffles', 'fried ice cream', 'fries', 'katsudon', 'macarons', 'spicy kaarage', 'mapo tofu'],
    4676: ['gyoza', 'tiny sausage', 'tempura', 'maki', 'stir fried veggies', 'fish', 'fish pizza', 'bento'],
    7158: ['caprese salad', 'lamb chops', 'pudding', 'katsu', 'squid ink spaghetti', 'vento aureo'],
    10740: ['egg over rice', 'omurice', 'hot pot', 'soup'],
    99: ['natto', 'soumen', 'soba', 'onigiri', 'sukiyaki', 'food spread'],
    13209: ['potatoes', 'meatloaf', 'sandwich'],
    6448: ['hot dog', 'pizza', 'fried chicken', 'donuts', 'fries', 'pie', 'burgers', 'cream stew'],
    9967: ['roast pork', 'risotto', 'gyoza', 'ramen', 'tempura don', 'steak don', 'gohan', 'kaarage', 'eggs benedict', 'fried rice', 'omelette', 'katsu curry', 'katsudon', 'okiakage', 'frittata', 'bento', 'pork curry', 'bourguignon', 'omurice', 'pineapple rice', 'shoyu ramen'],
}

var recipeCardEl = $('.recipe-card');

//Fetching from Tasty API
const options = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': '38e4e688e1msh156d88e5c5adfc2p101e84jsn7d1ccb27e81d',
        'X-RapidAPI-Host': 'tasty.p.rapidapi.com'
    }
};

//Convert anime titles to camelcase
// function camelize(str) {
//     return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
//         return index === 0 ? word.toLowerCase() : word.toUpperCase();
//     }).replace(/\s+/g, '');
// };

//Getting recipe card images for anime
function getFoodList(anime) {
    if (!foodObj.hasOwnProperty(anime)) {
        $('.recipe-header').text('🍙 Sorry, no recipes for this anime. 🍙');
        return;
    } else {
        $('.recipe-header').text('Recipes: ');
    }

    for (var i = 0; i < foodObj[anime].length; i++) {
        fetch(`https://tasty.p.rapidapi.com/recipes/list?from=0&size=3&q=${foodObj[anime][i]}`, options)

            // fetch(`https://tasty.p.rapidapi.com/recipes/list?from=0&size=20&q=${foodObj.spyFamily[1]}`, options)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                //console.log(data.results[0].name);
                // console.log(data.results[2].instructions);
                // console.log(data.results[2].nutrition);
                // console.log(data.results[0].thumbnail_url);
                // console.log(data.results[2].original_video_url);
                var dataResults = data.results;
                console.log(dataResults);
                for (var i = 0; i < dataResults.length; i++) {
                    var recipeCard = `
                  <div class="card column is-2-widescreen is-2-desktop is-8-mobile is-3-tablet recipe-card-cont">
                      <div class="card-image">
                          <figure class="image">
                          <a><img id="recipe-img-link" data-id="${data.results[i].id}" src="${data.results[i].thumbnail_url}" alt="Placeholder image">
                          </a>
                          </figure>
                          <div class="card-header-title">
                          <div class="card-title">
                              <a><p class="title is-6">${data.results[i].name}</p>
                              </a>
                          </div>
                          </div>
                      </div>
                  </div>`
                    recipeCardEl.append(recipeCard);
                }
                var recipeLink = $("#recipe-img-link");
                recipeLink.addEventListener('click', cardClickHandler);
            })
            .catch(err => console.error(err));
    }
}

var cardClickHandler = function (e) {
    var recipeIdAttr = e.target.attr('data-id');
    console.log(recipeIdAttr);
    localStorage.setItem("recipe-id", recipeIdAttr);
    if (recipeIdAttr) {
        getRecipe(recipeIdAttr);
    }
    document.location = './recipe.html';
}

getFoodList();
