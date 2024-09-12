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
  console.log(gifData);
  displayGifs(gifData.data.data)
};

function displayGifs(gifs){
  // const randomNumbers = getRandomNumbers(4, 1, 19);
  emptyContainer();
  // for(let i=0;i<randomNumbers.length;i++){
  //   let index=randomNumbers[i];
    // const card = document.createElement('div');
    // card.classList.add('game__card--gif');    
    const img = document.createElement('img');
    img.src = gifs[0].images.fixed_width.url;
    img.alt = gifs[0].title;
    img.classList.add('gif__img');
    // card.appendChild(img);
    gifContainer.appendChild(img);
    
  // }
}



// function getRandomNumbers(count, min, max) {
//   const numbers = [];
//   while (numbers.length < count) {
//     const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
//     if (!numbers.includes(randomNumber)) {
//       numbers.push(randomNumber);
//     }
//   }
//   return numbers;
// }

function emptyContainer(){
  gifContainer.innerHTML='';
}

// document.querySelector(".game__button").addEventListener("click", fetchGifs);
document.querySelector(".game__card").addEventListener("click", getJokes);

const card = document.querySelector('.game__card');
card.addEventListener('click', () => {
  card.classList.toggle('active');
});