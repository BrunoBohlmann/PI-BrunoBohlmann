import axios from 'axios';

export function getPokemons(){
	return async function(dispatch){
		const json = await axios.get('http://localhost:3001/pokemons')

		return dispatch({
			type: 'GET_POKEMONS',
			payload: json.data
		})
	}
}

export function getPokeDetail(id){
	return async function(dispatch){
		const json = await axios.get(`http://localhost:3001/pokemonId/${id}`)

		return dispatch({
			type: 'GET_POKEDETAIL',
			payload: json.data
		})
	}
}

export function submitPokemon(payload){
	return async function(dispatch){
		const json = await axios.post('http://localhost:3001/pokemons', payload)
	}
}

export function getTypes(){
	return async function(dispatch){
		const json = await axios.get('http://localhost:3001/types')

		return dispatch({
			type: 'GET_TYPES',
			payload: json.data
		})
	}
}

export function searchPokemons(name){
	return async function(dispatch){
		const json = await axios.get(`http://localhost:3001/pokemonName?name=${name}`)

		return dispatch({
			type: 'SEARCH_BY_NAME',
			payload: json.data
		})
	}
}


// Filtros
export function filterPerType(payload){
	return {
		type: 'FILTER_PER_TYPE',
		payload
	}
}
export function filterPerOrigin(payload){
	return{
		type: 'FILTER_PER_ORIGIN',
		payload
	}
}
export function filterPerName(payload){
	return {
		type: 'FILTER_PER_NAME',
		payload
	}
}
export function filterPerAttack(payload){
	return {
		type: 'FILTER_PER_ATTACK',
		payload
	}
}


