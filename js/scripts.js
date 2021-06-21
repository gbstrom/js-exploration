// this is an IIFE that wraps up much of my code to minimize side-effects.

let pokemonRepository = (function () {
  let pokemonList = [

    {
      name: 'Abra',
      height: 8,
      type: ['psychic']
    },

    {
      name: 'Doduo',
      height: 10,
      type: ['normal, flying']
    },

    {
      name: 'Psyduck',
      height: 5,
      type: ['water']
    }
  ];

  function add(pokemon) {
    if (
      typeof pokemon === "object" &&
      "name" in pokemon &&
      "height" in pokemon &&
      "type" in pokemon
    ) {
      repository.push(pokemon);
    } else {
      console.log("pokemon is not correct");
    }
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon){

    //this section creates the buttons with details about the pokemon

    let unorderedList = document.querySelector('.pokemon-ul');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name + ' (type: ' + pokemon.type + ') (height: ' + pokemon.height + ') ';
    button.classList.add('pokemon-button');
    listItem.appendChild(button);
    unorderedList.appendChild(listItem);

    //this section makes clicking the buttons send pokemon details to the console

    button.addEventListener('click', function(){
      showDetails(pokemon);
    });
  }

  //this function works within the addListItem function above to send pokemon details to the console when a button is clicked

  function showDetails(pokemon){
    console.log(pokemon)
  }

  //this section makes these functions callable outside the IIFE.

  return{
    add: add,
    getAll: getAll,
    addListItem: addListItem
  };
})()


//This section lists the Pokemons' names with their heights with a forEach loop.

pokemonRepository.getAll().forEach(
  pokemonRepository.addListItem
);
