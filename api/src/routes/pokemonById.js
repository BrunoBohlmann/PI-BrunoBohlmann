const router = require('express').Router();
const axios = require('axios');
const sequelize = require('sequelize')
const { Pokemon, Type } = require('../db.js');


// Consultar pokemon por id
router.get('/:id', async (req, res) => {
	const { id } = req.params

	try{
		// Consulto la API
		// Si la API devuelve algo lo mostramos
		const pokeData = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
		// Pasamos la pokeData a un array (pokeArray) para poder extraer sus propiedades
		const pokeArray = [];
		pokeArray.push(pokeData.data);

		// pokeFinal se va a quedar con las propiedades que queremos de la pokeData 
		const pokeFinal = [];

	    pokeArray.map(e => {
	        pokeFinal.push({
	            id:e.id,
				name:e.name,
				hp: e.stats[0].base_stat,
				attack: e.stats[1].base_stat,
				defense: e.stats[2].base_stat,
				speed: e.stats[5].base_stat,
				height: e.height,
				weight: e.weight,
				img: e.sprites.other.dream_world.front_default,
				types: e.types.map(typePoke => typePoke.type.name) 
	        })
	    })
	    console.log(pokeFinal[0])
	    res.send(pokeFinal[0])
	}
	// Si la API no devuelve nada, vamos a la DB
	catch(err){
		try{
			const pokeFinal = await Pokemon.findByPk(id,{
				include: Type
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