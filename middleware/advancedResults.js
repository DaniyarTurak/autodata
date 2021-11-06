const advancedResults = (model) => async (req, res, next) => {
    let query;
    //Copy req.query
    const reqQuery = { ...req.query };
    //Fields to exclude
    const removeFields = ['select', 'sort', 'page', 'limit'];

    //Removing from request
    removeFields.forEach(param => delete reqQuery[param]);

    //Create query string
    let queryStr = JSON.stringify(reqQuery);
   
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

    // Finding resource
    query = model.find(JSON.parse(queryStr), {references: { $slice: 1 }});

    //Select Fields 
    if (req.query.select) {
        const fields = req.query.select.split(',').join(' ');
        query = query.select(fields);
    }

    //Sort
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ');
        query = query.sort(sortBy);
    } else { // default sort
        query = query.sort('createAt');
    }

    //Pagination
    const page = parseInt(req.query.page, 10) || 1; 
    const limit = parseInt(req.query.limit, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await model.countDocuments();

    query = query.skip(startIndex).limit(limit);

    //Executing query
    const results = await query;

    //Pagination result
    const pagination = {};

    if (endIndex < total) {
        pagination.next = {
            page: page+1,
            limit
        }
    }

    if (startIndex > 0) {
        pagination.prev = {
            page: page-1,
            limit
        }
    }

    res.advancedResults = {
        success: true,
        count: results.length,
        pagination,
        data: results
    };

    next();
}

module.exports = advancedResults;