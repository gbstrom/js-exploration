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

//This section lists the pokemon's names with their heights

for (let i = 0; i < pokemonList.length; i++) {
  document.write(pokemonList[i].name + ' (height: ' + pokemonList[i].height + ') ');

//This section adds the comment 'Wow, that's big!' for Pokemon taller than 9

  if (pokemonList[i].height > 9) {
    document.write(' - Wow, that\'s big! ');
  }
  document.write('<br>');
}
