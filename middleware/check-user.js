const Users = require('../models/users-model')
const bcrypt = require('bcryptjs');

module.exports = async (req, res, next) => {

    const user_id = req.params.user_id;
    const hashedToken = await Users.getTokenByUserId(user_id)
    if(bcrypt.compareSync(req.headers.authorization, hashedToken.token)){
        next()
    } else {
        res.status(403).json({ message: "This token does not belong to this user-"})
    };
};