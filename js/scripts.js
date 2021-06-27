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

    //This section creates the buttons with details about the pokemon.

    let unorderedList = document.querySelector('.pokemon-ul');
    let listItem = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('pokemon-button');
    listItem.appendChild(button);
    unorderedList.appendChild(listItem);

    //this section makes clicking the buttons send pokemon details to the console

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

  //This function sends pokemon details to the console.

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      //console.log(pokemon);

      let modalContainer = document.querySelector('#modal-container');

      // This section clears all existing modal content.
      modalContainer.innerHTML = '';

      let modal = document.createElement('div');
      modal.classList.add('modal');

      // Add the new modal content
      let closeButtonElement = document.createElement('button');
      closeButtonElement.classList.add('modal-close');
      closeButtonElement.innerText = 'Close';
      closeButtonElement.addEventListener('click', hideModal);

      let titleElement = document.createElement('h1');
      titleElement.innerText = pokemon.name;

      let contentElement = document.createElement('p');
      contentElement.innerText = 'height: ' + pokemon.height;

      let imageElement = document.createElement('img');
      imageElement.classList.add('modal-pokemon-image');
      imageElement.src = pokemon.imageUrl;

      modal.appendChild(closeButtonElement);
      modal.appendChild(titleElement);
      modal.appendChild(imageElement);
      modal.appendChild(contentElement);
      modalContainer.appendChild(modal);

      modalContainer.classList.add('is-visible');

      modalContainer.addEventListener('click', (e) => {
        // Since this is also triggered when clicking INSIDE the modal
        // We only want to close if the user clicks directly on the overlay
        let target = e.target;
        if (target === modalContainer) {
        //I am confused here. Why isn't it '!==' here? We only want to close the modal if the user clicks somewhere outside the modal, not inside. this code does that, but I don't understand why. PUZZLE RESOLVED (partly) because the container covers the whole window area thanks to the CSS. I still don't understand why clicking inside the modal itself doesn't trigger this code, since after all clicking on the modal seems as if it would count as clicking on the modalContainer. But I will assume it's because I'm wrong about that, and that the modalContainer is not clickable if the modal is on top of it.
          hideModal();
        }
      });
    });
  };

  function hideModal() {
    let modalContainer = document.querySelector('#modal-container');
    modalContainer.classList.remove('is-visible');
  }

  window.addEventListener('keydown', (e) => {
    let modalContainer = document.querySelector('#modal-container');
    if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
      hideModal();
    }
  });

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
