const { validateToken } = require("../utils/jwt");

module.exports = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        // can use sendStatus if 204 = no content, 
        // other codes need to use status().json()
        return res.sendStatus(401);
    }
    
    // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwYzcwYWFiMTdiNjBlNWFlZDNkNDBkNyIsImlhdCI6MTYyMzcyNzU2NiwiZXhwIjoxNjIzODEzOTY2fQ.EsthPwoiXXF4pjvyDI_MIG9RTErMOh0iJYb2eHrNVgs
    const contentArray = authHeader.split(' ');
    if (contentArray.length !== 2 || contentArray[0] !== 'Bearer') {
        // all tell front end format wrong
        return res.sendStatus(401);
    }

    const decoded = validateToken(contentArray[1]);
    if (!decoded) {
        return res.sendStatus(401);
    }
    req.user = decoded;
    next();
}