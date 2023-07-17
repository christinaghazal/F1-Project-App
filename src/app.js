import { section, divContainer, selectForm, selectContainer, selectBox, seasons, categories, categoriesOptions, messagesDiv, validationError, loadingElement, submitButton, httpErrorMsg, formulaContent, formulaNewsDiv, newsTitle, formulaNewsContainer } from "./constants.js";
import { scrollButtonFn } from "./views/welcomeView.js";
import { displayFormulaOneNews, displayCardWithData } from "./pages/welcomePage.js";
import { createHeader } from  "./views/header.js";



// Formula One Api
const url = "https://api-formula-1.p.rapidapi.com/seasons";
let baseUrl = "https://api-formula-1.p.rapidapi.com/";
const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "92a78f9457msh194f086dba7a0e7p1e95d6jsnc74693522574",
    "X-RapidAPI-Host": "api-formula-1.p.rapidapi.com",
  },
};

// News Api
const newsUrl =
  "https://newsapi.org/v2/everything?q=formula-1&apiKey=7ccaa4a39a07436baf0b366060f7a97c";

//?=====================================================================

section.id = "formula-block";


divContainer.className = "container";


selectBox.className = "select_box";


selectForm.id = "select_form";


selectContainer.className = "select_container";

// Seasons & Categories Select 

seasons.id = "seasons";
categories.id = "categories";

// Default Seasons & Categories Option


function createDefaultOption(textContent) {
  const option = document.createElement("option");
  option.textContent = textContent;
  option.disabled = false;
  option.selected = true;
  return option;
}

seasons.appendChild(createDefaultOption("select season"));
categories.appendChild(createDefaultOption("select category"));

//!=====================================================================


// Looping On categoriesOptions And Create Options
categoriesOptions.forEach((option) => {
  const optionEle = document.createElement("option");
  optionEle.value = option;
  optionEle.textContent = option;

  // Append optionEle To categories
  categories.appendChild(optionEle);
});

selectContainer.appendChild(seasons);
selectContainer.appendChild(categories);
//!=====================================================================

messagesDiv.className = "messages";

validationError.className = "validation_error";

loadingElement.className = "loading_element";

messagesDiv.append(validationError, loadingElement);
//!==============================================================

submitButton.type = "submit";
submitButton.id = "submit_btn";
submitButton.textContent = "submit";

//!==============================================================

selectForm.append(selectContainer, messagesDiv, submitButton);


selectBox.appendChild(selectForm);


httpErrorMsg.className = "http_error_msg";


formulaContent.className = "formula-content";


formulaNewsDiv.className = "formula-news";


newsTitle.className = "news_title";
newsTitle.textContent = "formula one news";


formulaNewsContainer.classList.add("news_container");

formulaNewsDiv.append(newsTitle, formulaNewsContainer);



function appendChildren(container, ...elements) {
  elements.forEach(element => {
    container.appendChild(element);
  });
}

appendChildren(divContainer, selectBox, httpErrorMsg, formulaContent, formulaNewsDiv);

section.appendChild(divContainer);

// prepend Formula Block Section To The Body
document.body.prepend(section);


createHeader();

//?=====================================================================
// Fetch Formula One News
fetch(newsUrl)
  .then((res) => res.json())
  .then((newsData) => {
    
    const filteredNews = newsData.articles.filter(
      (item) =>
         
        item.title.includes("Formula One") ||
        item.title.includes("Formula 1") ||
        item.title.includes("F1") &&
        item.urlToImage 
     );

    displayFormulaOneNews(filteredNews);
  })
  .catch((error) => {
    console.log(error);
  });

// Display Formula One News

//?=========================================================================
//  Fetch Seasons Data
fetch(url, options)
  .then((res) => res.json())
  .then((results) => {
    //console.log(results);
    const data = results.response;
    createSeasonsOptions(data);
  });

//  Create And Display Seasons Options
function createSeasonsOptions(options) {
  // Looping On Options
  options.forEach((option) => {
    const optionEle = `<option value="${option}">${option}</option>`;
    seasons.innerHTML += optionEle;
  });
}

//  Handle Form Submit
selectForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Read selectedSeason And selectedCategory
  const selectedSeason = seasons.value;
  const selectedCategory = categories.value;

  // Call validateSelectedValues function
  if (validateSelectedValues(selectedSeason, selectedCategory)) {
    return; //=> False boolean => don't show the result/fetch
  }

  // Check Selected Category
  if (selectedCategory === "drivers" || selectedCategory === "teams") {
    baseUrl = `https://api-formula-1.p.rapidapi.com/rankings/${selectedCategory}?season=${selectedSeason}`;
  } else if (selectedCategory === "races") {
    baseUrl = `https://api-formula-1.p.rapidapi.com/${selectedCategory}?season=${selectedSeason}`;
  } else {
    baseUrl = `https://api-formula-1.p.rapidapi.com/${selectedCategory}`;
  }

  // Send Request And Fetch The Data
  fetch(baseUrl, options)
    .then((res) => {
      //console.log(res.json());
      loadingElement.innerText = "loading...";
      return res.json();//=>promise
    })
    .then((results) => {
     //copy from original array =>let = reasign
      let loadedData = [...results.response];
       //console.log(results);
      if (results.get === "races") {
        // Filter Races Data
        //console.log(results.response);
        loadedData = results.response.filter((race) => {
          const {
            fastest_lap: { driver },
          } = race;

          return driver.id;
        });
      }

      //console.log(loadedData);

      // Reset loadingElement and httpErrorMsg
      loadingElement.innerText = "";
      httpErrorMsg.innerText = "";

      const selectedData = {
        results: loadedData,
        category: selectedCategory,
      };

      displayFormulaData(selectedData);
    })
    .catch((error) => {
      console.log(error);
      // Reset loadingElement And formulaContent
      loadingElement.innerText = "";
      formulaContent.innerHTML = "";
      httpErrorMsg.innerText = `${error.message}!`;
    });
});

//  Validate Selected Values
function validateSelectedValues(selectedSeason, selectedCategory) {
  if (
    selectedSeason === "select season" ||
    selectedCategory === "select category"
  ) {
    validationError.innerText = "please select season and category!";
    return true;
  }

  // Reset
  validationError.innerText = "";
  return false;
}

//  Display Formula Data
function displayFormulaData(formulaData) {
  const { category, results } = formulaData;

  // Reset Formula Content
  formulaContent.innerHTML = "";

  // Looping On formula Items And Create The Cards
  for (let i in results) {
    const item = results[i];

    // Show item(data) in console.log
     //console.log(item);

    displayCardWithData(category, item);
  }
}

// ?=================================================


window.addEventListener("scroll", scrollButtonFn);

  