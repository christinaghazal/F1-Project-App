import { formulaNewsContainer } from "../constants.js";
import { formulaContent } from "../constants.js";

// Display Formula One News
const displayFormulaOneNews = (news) => {
    // Looping On News
    news.forEach((newsItem) => {
    //console.log(newsItem);
     const card = `<div class="card">
              <img
                src="${newsItem.urlToImage || ""}"
                alt="${newsItem.urlToImage || "no image found"}"
              />
              <div class="card-body">
                <h3 class="title">${newsItem.title}</h3>
                <a href=${
                  newsItem.url
                } target="_blank" class="show_more">show more</a>
              </div>
            </div>`;
  
      formulaNewsContainer.innerHTML += card;
    });
  }
  export { displayFormulaOneNews };

  //?===================================================

//  Display Card With Data
 
export const displayCardWithData = (category, item) => {
    let card;
  
    if (category === "drivers") {
      const { driver, points, position } = item;
  
      card = `<div class="card">
              <img
                src="${driver.image}"
                alt="${driver.name}"
              />
              <div class="card-body">
                <h3 class="title">${driver.name}</h3>
                <p class="description">Points: ${points || "0"}</p>
                <p class="description">Position: ${position}</p>
              </div>
            </div>`;
    }
  
    if (category === "teams") {
      const { team, points, position } = item;
  
      card = `<div class="card">
              <img
                src="${team.logo}"
                alt="${team.name}"
              />
              <div class="card-body">
                <h3 class="title">${team.name}</h3>
                <p class="description">Points: ${points}</p>
                <p class="description">Position: ${position}</p>
              </div>
            </div>`;
    }
  
    if (category === "races") {
      const { circuit, competition, laps } = item;
  
      card = `<div class="card">
              <img
                src="${circuit.image}"
                alt="${circuit.name}"
              />
              <div class="card-body">
                <h3 class="title">${circuit.name}</h3>
                <h4>${competition.location.city}</h4>
                <p class="description">Total Laps: ${laps.total}</p>
              </div>
            </div>`;
    }
  
    if (category === "competitions") {
      const {
        location: { country, city },
        name,
      } = item;
  
      card = `<div class="card">
              <div class="card-body">
                <h3 class="title">${name}</h3>
                <ul class="location">
                  <h4>location:</h4>
                  <li>${country}</li>
                  <li>${city}</li>
                </ul>
              </div>
            </div>`;
    }
  
    formulaContent.innerHTML += card;
  };
  