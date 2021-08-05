const router = require('express').Router();


const pokemonsRoute = require('./pokemons.js')
const pokemonIdRoute = require('./pokemon.js')

router.use(pokemonsRoute);
router.use(pokemonIdRoute);

module.exports = router