
const initialState = {
	allPokemons: [],
	pokemons: [],
	pokeDetail: {},
	types: []
}


export default function rootReducer(state = initialState, action) {
	let pokemonsArray
	let pokemonsFinal

	switch(action.type){
		// Action por default de home
		case 'GET_POKEMONS':
			return {
				...state,
				pokemons: action.payload,
				allPokemons: action.payload
			}
		case 'GET_TYPES':
			return {
				...state,
				types: action.payload
			}
		case 'GET_POKEDETAIL':
		console.log(action.payload)
			return {
				...state,
				pokeDetail: action.payload
			}
		// Action de filtro por type
		case 'FILTER_PER_TYPE': 
			pokemonsArray = state.allPokemons
			pokemonsFinal = []

			if(action.payload === 'All'){
				return {
					...state,
					pokemons: pokemonsArray
				}
			}
			else{
				pokemonsArray.forEach(e => {
					if(e.types.includes(action.payload)){
						pokemonsFinal.push(e)
					}
				})
				return{
					...state,
					pokemons: pokemonsFinal
				}
			}

		// Action de filtro por origen
		case 'FILTER_PER_ORIGIN':
			pokemonsArray = state.allPokemons
			pokemonsFinal = []

			if(action.payload === 'API'){
				pokemonsFinal = pokemonsArray.filter(e => e.id < 900)
			}
			else if(action.payload === 'Propio'){
				pokemonsFinal = pokemonsArray.filter(e => e.id >= 900)
			}
			else{
				pokemonsFinal = pokemonsArray
			}
			// Return
			return{
				...state,
				pokemons: pokemonsFinal
			}

		//Action de filtro alfabetico
		case 'FILTER_PER_NAME':
			pokemonsArray = state.allPokemons

			// Sort
			pokemonsArray.sort((a, b) => {
				if(a.name < b.name){
					return -1
				}
				if(a.name > b.name){
					return 1
				}
				return 0;
			})

			// Return
			if(action.payload === 'asc'){
				return {
					...state,
					pokemons: pokemonsArray
				}
			}
			else if(action.payload === 'desc'){
				return {
					...state,
					pokemons: pokemonsArray.reverse()
				}
			}

		// Filtrado por fuerza
		case 'FILTER_PER_ATTACK':
			pokemonsArray = state.allPokemons

			//Sort
			pokemonsArray.sort((a, b) => {
				return a.attack - b.attack;
			})

			//Return 
			if(action.payload === 'asc'){
				return {
					...state,
					pokemons: pokemonsArray
				}
			}
			else if(action.payload === 'desc'){
				return {
					...state,
					pokemons: pokemonsArray.reverse()
				}
			}
			else{
				return{
					...state,
				}
			}
		case 'SEARCH_BY_NAME':
			return{
				...state,
				pokemons: action.payload
			}
		break;
		// Default
		default:
			return state
	}
}

