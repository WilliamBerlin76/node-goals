const router = require('express').Router();
const Categories = require('../models/categories-model');

router.get('/:user_id', (req, res) => {
    Categories.retrieveUserCats(req.params.user_id)
        .then(cats => {
            res.status(200).json(cats)
        })
        .catch(err => {
            res.status(500).json({ error: "the server failed to retrieve the categories"})
        })
})

module.exports = router