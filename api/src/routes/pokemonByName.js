const router = require('express').Router();
const axios = require('axios');
const sequelize = require('sequelize')
const { Pokemon } = require('../db.js');



//Consultar pokemon por name
router.get('/', async (req, res) => {
	var { name } = req.query
	name = name.toLowerCase()

	// Vamos a buscar a la API
	try{
		// Traigo los pokemons de la API
		const pokeData = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)

		// Meto lo que me trae la API en un arreglo para poder iterarlo y traer sus props
	    const pokeArrayData = [];
	    pokeArrayData.push(pokeData.data);

	    // Defino un arreglo para pushear el pokemon final
	    const pokemonFinal = [];
	    pokeArrayData.map(e => {
	        pokemonFinal.push({
		        id: e.id,
		        name: e.name,
		        hp: e.stats[0].base_stat,
		        attack: e.stats[1].base_stat,
		        defense: e.stats[2].base_stat,
		        speed: e.stats[5].base_stat,
		        height: e.height,
		        weight: e.weight,
		        img: e.sprites.other.dream_world.front_default,
		        types: e.types.map(p => p.type.name)
		    })
		})
		// Chequeo si se devolvio algo o no
		if(pokemonFinal.length === 0){
			return res.status(404).send('Error')
		}else{
			console.log(pokemonFinal)
			return res.send(pokemonFinal)
		}
	}
	// Si la API no funciona
	catch(err){
		try{
			const pokeFinal = await Pokemon.findAll({
				where: {
					name: name
				}
			})
			// Si la DB devuelve algo lo retorno
			return res.json(pokeFinal)
		}
		// Si la DB no devuelve nada tiro error
		catch(error){
			return res.json(error)	
		}
	}
})

module.exports = router