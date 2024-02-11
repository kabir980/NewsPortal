const API_KEY = "b797f5929b8140b285a710ffb7fae8a9"; 
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchnews("Technology"));

async function fetchnews(query){
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
  //console.log(data.articles);
  bindData(data.articles);
}

function bindData(articles){
    const cardsContainer = document.getElementById("cardscontainer");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";
    articles.forEach((article)=> {
        if(!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article){
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = `${article.title.slice(0, 60)}...`;
    newsDesc.innerHTML = `${article.description.slice(0, 150)}...`;
    const date = new Date(article.publishedAt).toLocaleString("en-us", {timeZone: "Asia/Jakarta"});
    newsSource.innerHTML = `${article.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", ()=>{
        window.open(article.url,"_blank")
    });
}

let curSelectedNav = null;
function onNavItemClick(id){    
    fetchnews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");
searchButton.addEventListener("click", ()=>{
    const query = searchText.value;
    if(!query) return;
    fetchnews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;  
})