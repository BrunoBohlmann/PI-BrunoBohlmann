const router = require('express').Router();
const axios = require('axios');
const sequelize = require('sequelize')

// Models
const { Pokemon, Type } = require('../db.js');

//Utils
const url = 'https://pokeapi.co/api/v2/pokemon/'
let pokeId = 900;


// Routes
router.get('/', async (req, res) => {
    try{
        // Traigo los pokemons de la DB
        let pokemonsListDb = await Pokemon.findAll({
            include: { model: Type }
        })

        // 2 consultas a la API, y concatenado
        const pokemonsList1 = await axios.get(url)
        pokemonsList2 = await axios.get(pokemonsList1.data.next)
        // Concateno y me quedo con .results
        pokemonsListG = [...pokemonsList1.data.results, ...pokemonsList2.data.results]
        
        // Si pokemonsListG not trae nada tiro error
        if(pokemonsListG.length === 0){
            res.status(404).send('No se pudo obtener la info de la API')
        }
        // Iterado y armado de la info que se va a enviar
        else{
            try{
                pokemonsListG = pokemonsListG.map(async e => {
                    return await axios.get(e.url)
                })
                // Resuelvo cada elemento (array de promises a resolver)
                const pokemonsFinal = []
                pokemonsListG = await Promise.all(pokemonsListG)
                pokemonsResult = pokemonsListG.map(e => e.data)
                        
                pokemonsResult.map(e => {
                    pokemonsFinal.push({
                        id: e.id,
                        name: e.name,
                        img: e.sprites.other.dream_world.front_default,
                        types: e.types.map(p => p)
                    })
                })
                // Concateno los pokemones de la DB con los de la APi ya mapeados
                return pokemonsFinal.concat(pokemonsListDb)
            }
            catch(err){
                return res.json(err)
            }
        }
    }
    catch(error){
        return res.status(404).send(error)
    }
})


// Route para crear pokemon
router.post('/', async (req, res) => {
    // Destructuring de lo que me pasan por body para crear el pokemon
    const { name, hp, attack, defense, speed, height, weight, img, types } = req.body;

    // Create
    const pokemon = await Pokemon.create({
        id: pokeId++,
        name: name,
        hp: hp,
        attack: attack,
        defense: defense,
        speed: speed,
        height: height,
        weight: weight,
        img: img
    })

    // Le agrego los types que me pasaron por body
    types.map(async e => {
        let type = await Type.findAll({
            where: {
                name: e
            }
        })
        pokemon.addType(type)
    })
    // Retorno
    res.json(pokemon)
})


module.exports = router