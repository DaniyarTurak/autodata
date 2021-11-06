const express = require('express');
const router = express.Router();

const { 
    getPromos, 
    getPromo, 
    createPromo
} = require('../controllers/promos');

const Promos = require('../models/Promos');
const advancedResults = require('../middleware/advancedResults');

router
    .route('/')
    .get(advancedResults(Promos), getPromos)
    .post(createPromo);

router
    .route('/:id')
    .get(getPromo)

router
    .route('/:id/:fields')
    .get(getPromo)

module.exports = router;