const router = require('express').Router();
const axios = require('axios');
const sequelize = require('sequelize')
const Pokemon = require('../models/Pokemon.js');



router.get('/pokemons/:id', async (req, res) => {
	const { id } = req.params

	const pokeData = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)

	// Si la API no devuelve nada, vamos a la DB
	if(!pokeData){
		Pokemon.findOne({
			where: {
				id: id
			}
		}).then(data => {
			// Si la DB no devuelve nada tira error
			if(!data){
				return res.status(404).json('error')
			}
			// Si la DB devuelve algo lo retorno
			else{
				res.json(data)
			}
		}).catch(error => res.status(404).json(error))
	}
	// Si la API devuelve algo lo mostramos
	else{
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
				type: e.types.map(typePoke=>typePoke)  
            })
        })
        res.send(pokeFinal)
	}
})



module.exports = router