// this is an IIFE that wraps up much of my code to minimize side-effects.

let pokemonRepository = (function () {
  let pokemonList = [];

  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  function add(pokemon) {
      pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon){

    //This section creates the buttons that lead to more details about the pokemon.

    let unorderedList = document.querySelector('.pokemon-ul');
    let listItem = document.createElement('li');
    listItem.classList.add('list-group-item');
    let button = document.createElement('button');
    button.classList.add('btn');
    button.classList.add('btn-primary');
    button.classList.add('btn-block');
    button.setAttribute("type", "button");
    button.setAttribute("data-toggle", "modal");
    button.dataset.target = "#pokemonModal";
    button.innerText = pokemon.name;
    listItem.appendChild(button);
    unorderedList.appendChild(listItem);

    //this section makes clicking the buttons send pokemon details into a modal that pops up.

    button.addEventListener('click', function(){
      showDetails(pokemon);
    });
  }

  //This section is the code for fetching Pokemon data from the Pokemon API.

  function loadList() {
    return fetch(apiUrl).then(function (response) {
      return response.json();
    }).then(function (json) {
      json.results.forEach(function (item) {
        let pokemon = {
          name: item.name,
          detailsUrl: item.url
        };
        add(pokemon);
      });
    }).catch(function (e) {
      console.error(e);
    })
  }

  //This section is the code for extracting Pokemon details from detailsUrl.

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url).then(function (response) {
      return response.json();
    }).then(function (details) {
      // Now we add the details to the item
      item.imageUrl = details.sprites.front_default;
      item.height = details.height;
      item.types = details.types;
    }).catch(function (e) {
      console.error(e);
    });
  }

  //This function sends pokemon details to the moczl.

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      let modalContainer = document.querySelector('#pokemonModal');

      // This section puts info about the selected pokemon into the modal.

      let modalTitle = document.querySelector("#modalTitle");
      modalTitle.innerText = pokemon.name;
      let contentContainer = document.querySelector('.modal-body');
      contentContainer.innerText = 'height: ' + pokemon.height;

      let imageElement = document.createElement('img');
      imageElement.classList.add('modal-pokemon-image');
      imageElement.src = pokemon.imageUrl;

      contentContainer.appendChild(imageElement);
    });
  };

  //This section makes these functions callable outside the IIFE.

  return{
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails
  };
})()


//This section creates a list of the Pokemons' names.

pokemonRepository.loadList().then(function() {
  // Now the data is loaded!
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
