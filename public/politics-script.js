const API_KEY = "1ec911196da74dff8ab1c3501aa78368";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fecthNews("Political"));

function reload() {
  window.location.reload();
}

async function fecthNews(query) {
  const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
  const data = await res.json();
  bindData(data.articles);
  console.log(data.articles);
}

function bindData(articles) {
  const cardsContainer = document.getElementById("politics-cards-container");
  const newsCardTemplate = document.getElementById("politics-template-news-card");

  cardsContainer.innerHTML = "";

  articles.forEach((article) => {
    if (!article.urlToImage) return;
    const cardClone = newsCardTemplate.content.cloneNode(true);
    fillDataInCard(cardClone, article);
    cardsContainer.appendChild(cardClone);
  });

  function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector(`#politics-news-img`);
    const newsTitle = cardClone.querySelector(`#politics-news-title`);
    const newsSrc = cardClone.querySelector(`#politics-news-src`);
    const newsDesc = cardClone.querySelector(`#politics-news-desc`);
    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;
    const date = new Date(article.publishedAt).toLocaleString("en-US", {
      timeZone: "Asia/Jakarta",
    });

    newsSrc.innerHTML = `${article.source.name} | ${date}`;
    cardClone.firstElementChild.addEventListener("click", () => {
      window.open(article.url, "_blank");
    });
  }
  function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
  }
}
