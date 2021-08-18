import React from 'react';
import { getPokeDetail } from '../../actions/index.js';
import { useEffect, useState } from 'react';
import {useDispatch, useSelector } from 'react-redux';
import './PokeDetail.css'

export default function PokeDetail(props){
	const dispatch = useDispatch();

	const {id} = props.match.params;

	const pokemon = useSelector((state) => state.pokeDetail)

	useEffect(() => {
		dispatch(getPokeDetail(id))
	},[dispatch])

	return (

		<div>
			
			<div className='pokeDetail'>
				<div className='title'>
					<h1>{pokemon.name}</h1>				
				</div>

				<div className='img'>
					<img src={pokemon.img} alt="pokemonImg"/>
				</div>

				<div className='stats'>
					<h3>HP: {pokemon.hp}</h3>
					<h3>Attack: {pokemon.attack}</h3>
					<h3>Defense: {pokemon.defense}</h3>
					<h3>Speed: {pokemon.speed}</h3>
					<h3>Height: {pokemon.height}</h3>
					<h3>Weight: {pokemon.weight}</h3>
					<h3>N°: {pokemon.id}</h3>
				</div>	

				<div className='poketypes'>
					<h4>Types: </h4>
					{
						pokemon.id < 900 ?
						pokemon.types?.map(e => {
							return (
								<div className='poketype'	>
									<h4>{e}</h4>									
								</div>
							)
						})
						:
						pokemon.types?.map(e => {
							return (
								<div className='poketype'	>
									<h4>{e.name}</h4>									
								</div>
							)
						})
					}
				</div>
			</div>
		</div>
	)
}