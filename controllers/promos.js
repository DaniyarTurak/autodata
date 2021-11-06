const path = require('path');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const Promos = require('../models/Promos');

// @desc    Get all promos
// @route   GET /api/v1/promos
// @access  Public
exports.getPromos = asyncHandler(async (req, res, next) => {
    
    res.status(200).json(res.advancedResults); 
});

// @desc    Get single promo
// @route   GET /api/v1/promos/:id
// @route   GET /api/v1/promos/:id/:fields
// @access  Public
exports.getPromo = asyncHandler(async (req, res, next) => {
   
    let promos;

    if (!req.params.fields) {
        promos = await Promos.findById(req.params.id, {references: { $slice: 1 }});
    } else if (req.params.fields.trim() === 'fields'){
        promos = await Promos.findById(req.params.id).select('name price references description createAt'); 
    } else {
        return next(new ErrorResponse(`Wrong parameter: ${req.params.fields}`, 404));
    }
    
    if (!promos) { 
        return next(new ErrorResponse(`Promos is not found with id of ${req.params.id}`, 404));
    } 
    res.status(200).json({ 
        success: true, 
        data: promos 
    });
});

// @desc    Create promo
// @route   POST /api/v1/promos
// @access  Private
exports.createPromo = asyncHandler(async (req, res, next) => {
    const promos = await Promos.create(req.body);
    res.status(201).json({
        success: true,
        data: promos
    });
});