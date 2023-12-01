// Insert your code here
const pokemonContainer = document.querySelector("#pokemonContainer");
const btn = document.querySelector("#next");
const btn1 = document.querySelector("#back");
/* const pokedex = document.getElementById('pokedex');

const fetchPokemon = () => {
    const promises = [];
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));
} */

const getJSON = async (url, errorMsg = "Something went wrong !") => {
  const res = await fetch(url);
  console.log(res);
  if (!res.ok) {
    throw new Error(`${errorMsg} (${res.status}) `);
  }
  return await res.json();
};

const getPokemon = async (p) => {
  try {
    const data = await Promise.all([
      getJSON(`https://pokeapi.co/api/v2/pokemon/${p}/`),
    ]);
    renderPokemon(data.flat()[0]);
    return data.flat()[0];
  } catch (error) {
    console.error(error);
  }
};
let i = 1;
let limit = 15;
setInterval(() => {
  if (i <= limit && i <= 150) {
    getPokemon(`${i}`);
    i++;
  }
});
/* for (let i=1; i<=15; i++) {
    getPokemon(`${i}`)
} */

const renderPokemon = (data) => {
  const name = data.name[0].toUpperCase() + data.name.slice(1);
  const id = data.id;
  const type = data.types[0].type.name;

  pokemonContainer.innerHTML += `<div class="pokemon ${type}">
<div class="imgContainer">
    <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png" alt="${name}" />
</div>
<div class="info">
    <h3 class="name">${name}</h3>
    <span class="type">Type: <span>${type}</span></span>
</div>
</div>`;
};

btn.addEventListener("click", function () {
  pokemonContainer.innerHTML = "";
  if (limit === 150) {
    limit += 1;
    getPokemon(`${151}`);
  } else {
    i += 1;
    limit += 15;
  }
});

btn1.addEventListener("click", function () {
  pokemonContainer.innerHTML = "";
  i -= 30;
  limit -= 15;
  if (limit === 151) {
    limit = 150;
    i = 135;
  }
});
