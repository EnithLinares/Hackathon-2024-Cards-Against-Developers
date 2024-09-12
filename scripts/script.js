const apiKey = 'ghCH7E2rMd5WnA5Libu9znCOp0ObzGWN'; 
const baseUrl='https://api.giphy.com/v1/gifs/search';
const gifContainer = document.getElementById('gif-container');

async function getJokes(){
  const jokesData = await  axios.get('https://icanhazdadjoke.com/', {
    headers: { 'Accept': 'application/json' }
  });
  document.querySelector('.game__card-back').textContent=jokesData.data.joke;
  emptyContainer(); 
}

const formElement = document.querySelector(".game__form");
formElement.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.target;
  const query = form.gifSearch.value;
  fetchGifs(query);
});

const fetchGifs = async (query) => {
  const gifData = await axios.get(baseUrl, {
    params: {
      api_key: apiKey,
      q: query,
      limit: 1
    }
  });
  displayGifs(gifData.data.data)
};

function displayGifs(gifs){
  emptyContainer();
    const img = document.createElement('img');
    img.src = gifs[0].images.fixed_width.url;
    img.alt = gifs[0].title;
    img.classList.add('gif__img');
    gifContainer.appendChild(img);
}

function emptyContainer(){
  gifContainer.innerHTML='';
}

document.querySelector(".game__card").addEventListener("click", getJokes);

const card = document.querySelector('.game__card');
card.addEventListener('click', () => {
  card.classList.toggle('active');
});
