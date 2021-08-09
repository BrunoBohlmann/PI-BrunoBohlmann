const router = require('express').Router();
const axios = require('axios');
const sequelize = require('sequelize');


// Models
const { Type } = require('../db.js');

// Route
router.get('/', async (req, res) => {
	let types = await Type.findAll()
	try{
		return res.json(types.map(e => e.name))
	}catch(error){
		return res.status(404).send(error)
	}
})

module.exports = router