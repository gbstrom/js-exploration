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
      type: ['normal', 'flying']
    },

    {
      name: 'Psyduck',
      height: 5,
      type: ['water']
    }
  ];

  function add(pokemon) {
    pokemonList.push(pokemon);
  }

  function getAll() {
    return pokemonList;
  }

  return{
    add: add,
    getAll: getAll
  };
})()


//This section lists the Pokemons' names with their heights with a forEach loop.

function displayDetails(item){
  document.write('<p>' + item.name + ' (type: ' + item.type + ') (height: ' + item.height + ') ');
  if (item.height > 9){
    document.write(' - Wow, that\'s big!');
  };
  document.write('</p>');
};

pokemonRepository.getAll().forEach(
  displayDetails
)
