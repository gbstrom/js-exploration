// This section creates the pokemonList array

let Abra = {
  name: 'Abra',
  height: 8,
  type: ['psychic']
};

let Doduo = {
  name: 'Doduo',
  height: 10,
  type: ['normal', 'flying']
};

let Psyduck = {
  name: 'Psyduck',
  height: 5,
  type: ['water']
};

let pokemonList = [Abra, Doduo, Psyduck];

//This section lists the pokemon's names with their heights with a forEach loop.

function displayDetails(item){
  document.write('<p>' + item.name + ' (type: ' + item.type + ') (height: ' + item.height + ') ');
  if (item.height > 9){
    document.write(' - Wow, that\'s big!');
  };
  document.write('</p>');
};

pokemonList.forEach(
  displayDetails
)
