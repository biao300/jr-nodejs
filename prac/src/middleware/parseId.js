module.exports = function parseId(req, res, next) {
    let {id} = req.params;
    req.params.id= Number(id); // not recommended, should keep req data untouched
    // req.id
    // req.locals.id
    next();
};