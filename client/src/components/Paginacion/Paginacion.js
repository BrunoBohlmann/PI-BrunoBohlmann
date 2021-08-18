import React from 'react';

import './Paginacion.css'

export default function Paginacion({pokemonsPerPage, allPokemons, paginado}){
	const pageNumbers = []

	for(let i = 1; i <= Math.ceil(allPokemons/pokemonsPerPage); i++){
		pageNumbers.push(i)
	}

	return (
		<div className="div-pagesNumbers">
			<ul className="list-pagesNumbers">
				{
					pageNumbers?.map(number => {
						return(
							<div className="page-number">
								<li key={number}>
									<p onClick={() => paginado(number)}>{number}</p>
								</li>
							</div>
						)
					})
				}
			</ul>
		</div>
	)
}