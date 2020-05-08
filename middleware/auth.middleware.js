const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
    if(req.method === 'OPTIONS') {
        return next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1]; // "Bearer TOKEN"

        if(!token) {
            res.status(401).json({ message: 'Unauthorized' });
        }

        req.user = jwt.verify(token, config.get('jwtSecret')); // decoded
        next()

    } catch(e){
        res.status(401).send({ message: 'Unauthorized', code: '401' });
    }
};