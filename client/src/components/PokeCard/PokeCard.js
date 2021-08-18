import React from 'react';
import { Link } from 'react-router-dom';
import './PokeCard.css';

export default function PokeCard({id, name, img, types}){
	return(
		<div className="pokeCard">
			<Link to={`/pokeDetail/${id}`} className="link">
				<div className="pokeHeader">

					<div className="pokeImg">
						<img src={img} alt='pokemonImg'/>	
					</div>

					<div className="pokeName">
						<h3>{name}</h3>			
					</div>
				</div>

				<div className="types">
					{
						id < 900 ?
						types?.map(e => {
							return( 
								<div className="type">
									<h5>{e}</h5>
								</div>
							)
						})
						:
						types?.map(e => {
							return( 
								<div className="type">
									<h5>{e.name}</h5>
								</div>
							)
						})
					}
				</div>			
			</Link>
		</div>
	)
}