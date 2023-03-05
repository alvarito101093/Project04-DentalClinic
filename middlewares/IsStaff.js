const jwt = require('jsonwebtoken');

const isStaff = (req, res, next) => {
    try {
        const authorization = req.headers.authorization;

        if (!authorization) {
            return res.send('Invalid token');
        }

        const [strategy, token] = authorization.split(" ");

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (req.roleId !== 2){
            return res.send('You dont have enough power')
        }
        next();
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = isStaff;