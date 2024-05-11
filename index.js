const gamePartent = document.getElementById("game_wrapper");
const searchPartent = document.getElementById("searchBox"); 
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");
const categoryGroup = document.getElementById("categoryGroup");

let page = 1;

const getDataGame = async (query, name) => {
  let url = `https://steam-api-dot-cs-platform-306304.et.r.appspot.com/games?page=${page}&limit=10`; 
  if (query) {
    url += `&q=${query}`;
  }
  if (name) {
    url += `&genres=${name}`;
  }
  console.log(url);
  const response = await fetch(url); //tao bien response de gan data cua API
  const data = await response.json();
  const dataGame = data.data;
  // console.log(dataGame);
  gamePartent.innerHTML = `<div class="item"></div>`;
  const item = gamePartent.children[0];

  dataGame.map((callback) => {
    const x = document.createElement("div"); // tao bien x co gia tri la div
    x.innerHTML = `<img src=" ${callback.header_image}"/><p>${callback.name}</p>`;
    item.appendChild(x);
  });
};
const renderGame = async () => {
  try {
    const url = `https://steam-api-dot-cs-platform-306304.et.r.appspot.com/genres`;
    const response = await fetch(url);
    const id = await response.json();
    const idGame = id.data;
    console.log(idGame);
    // <--------------------------------->
    idGame.map((name) => {
      const x = document.createElement("li");
      x.innerHTML = `<div onclick ="handleGenres('${name.name}')">${name.name}</div>`;
      categoryGroup.appendChild(x);
    });
  } catch (error) {
    console.log("render genres error , error");
  } 
};
const handleGenres = (name) => {
  console.log(name);
  getDataGame(null, name);
};
const handleClickSearch = () => {
  const inputValue = searchInput.value;
  getDataGame(inputValue);
};

const next = () => {
  page++;
  getDataGame();
};

const prev = () => {
  if (page > 1) {
    page--;
  }
  getDataGame();
};

getDataGame();
renderGame();
