import React from 'react';
import { Link } from 'react-router-dom';

import './LandingPage.css';

// Img title
import pokeTitle from '../../imgs/pokeTitle.svg';

const LandingPage = () => {
	return (
		<div className='landingPage'>

			<div className='landing-title'>
				<img src={pokeTitle} alt="pokeTitle"/>	
			</div>

			<div className='btn-landing'>
			
				<Link to='/home'>
					<button>Home</button>
				</Link>	
			</div>

		</div>
	)
}

export default LandingPage;