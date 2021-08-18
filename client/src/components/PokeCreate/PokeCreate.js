import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import { getTypes, submitPokemon } from '../../actions/index.js'
import {useDispatch, useSelector} from 'react-redux';
import './PokeCreate.css'



export default function PokeCreate(){
	const dispatch = useDispatch();
	const allTypes = useSelector(state => state.types)
	useEffect(() => {
		dispatch(getTypes())
	}, [dispatch])

	// Estados
    const [input, setInput] = useState({
        name: '',
        hp:'',
        attack:'',
        defense:'',
        speed:'',
        height:'',
        weight:'',
        img:'',
        types: []
    })

    // Functions handle
    function handleChange(e){
    	setInput({
        	...input,
        	[e.target.name]: e.target.value
    	})
    }
    function handleSelect(e){
    	setInput({
        	...input,
        	types: [...input.types, e.target.value]
    	})
    }
    function handleSubmit(e){
    	e.preventDefault();
    	console.log(input)
    	dispatch(submitPokemon(input));
    	setInput({
        	name: '',
        	hp:'',
        	attack:'',
        	defense:'',
        	speed:'',
        	height:'',
        	weight:'',
        	img:'',
        	types: []
    	})
	}

 	return (
		<div>
			<div className='title-form'>
				<h1>Crea tu Pokemon</h1>			
			</div>

			<form onSubmit={(e) => handleSubmit(e)} className='form'>
				<input name="name" placeholder='Nombre' value={input.name} 	onChange={(e)=>handleChange(e)}/>
				<input name="hp" placeholder='Vida' value={input.hp} 		onChange={(e)=>handleChange(e)}/>
				<input name="attack" placeholder='Ataque' value={input.attack} 	onChange={(e)=>handleChange(e)}/>
				<input name="defense" placeholder='Defensa' value={input.defense} 	onChange={(e)=>handleChange(e)}/>
				<input name="speed" placeholder='speed' value={input.speed} 	onChange={(e)=>handleChange(e)}/>
				<input name="height" placeholder='Altura' value={input.height} onChange={(e)=>handleChange(e)}/>
				<input name="weight" placeholder='Peso' value={input.weight} onChange={(e)=>handleChange(e)}/>
				<input name="img" placeholder='Imagen' value={input.img} onChange={(e)=>handleChange(e)}/>
				<select onChange={(e) => handleSelect(e)}>
					{
						allTypes.map(e => {
							return(
								<option value={e}>{e}</option>
							)
						})
					}
				</select>
				<div className="btn-submit">
					<button type="submit">Crear</button>	
				</div>
			</form>

			<div className='btn-return'>
				<Link to='/home'>
					<h2>Volver</h2>
				</Link>
			</div>
		</div>
	)
}
