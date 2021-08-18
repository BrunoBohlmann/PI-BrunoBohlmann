import React from 'react';
import { useState } from "react";
import { useDispatch} from "react-redux";
import { searchPokemons } from '../../actions/index.js';
import './SearchBar.css'

const SearchPokemon = () => {
   const dispatch = useDispatch();
   const [name, setName] =  useState('');

    function handleInputChange(e){
       e.preventDefault();
       setName(e.target.value)
    }
    function handleSubmit(e){
        e.preventDefault();
        dispatch(searchPokemons(name))
    }


return (
        <div className="container-search">
            <input type="text"
                   placeholder="Pokemon..."
                   value={name}
                   onChange={(e)=>handleInputChange(e)}
            />
            
            <button className="boton"  onClick={(e)=>handleSubmit(e)}>Buscar</button>
        </div>
      );
}
 
export default SearchPokemon;