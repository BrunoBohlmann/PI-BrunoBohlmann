const router = require('express').Router();
const axios = require('axios');


//Utils
const url = 'https://pokeapi.co/api/v2/pokemon/'
const pokemonsFinal = []

// Route
router.get('/pokemons', async (req, res) => {
    // Consulta a la API, y concatenado
    const pokemonsList1 = await axios.get(url)
    pokemonsList2 = await axios.get(pokemonsList1.data.next)
    // Concateno y me quedo con results
    pokemonsListG = pokemonsList1.data.results.concat(pokemonsList2.data.results)

    // Iterado y armado de la info que se va a enviar
    if(!pokemonsListG){
        res.status(404).send('No se pudo obtener la info de la API')
    }
    else{
       
        pokemonsListG = pokemonsListG.map(async e => {
            return await axios.get(e.url)
        })
        // Resuelvo cada elemento
        pokemonsListG = Promise.all(pokemonsListG)
            .then(poke => {
                const pokemonsResult = poke.map(e => e.data)
                pokemonsResult.map(e => {
                    pokemonsFinal.push({
                        id: e.id,
                        name: e.name,
                        sprites: e.sprites.other.dream_world.front_default,
                        types: e.types.map(p => p)
                    })
                })
                return pokemonsFinal
            })
            .then(response => {
                try{
                    res.send(response)
                }catch(error){
                    res.status(404).send(error)
                }
            })
    }
})


module.exports = router  