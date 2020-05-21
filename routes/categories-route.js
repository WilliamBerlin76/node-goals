const router = require('express').Router();
const Categories = require('../models/categories-model');

//gets categories by user id
router.get('/:user_id', (req, res) => {
    Categories.retrieveUserCats(req.params.user_id)
        .then(cats => {
            res.status(200).json(cats)
        })
        .catch(err => {
            res.status(500).json({ error: "the server failed to retrieve the categories"})
        })
});

//adds category to user
router.post('/:user_id', (req, res) => {
    const catName = req.body.name
    const id = req.params.user_id

    Categories.addUserCat(id, catName)
        .then(async cat => {
            const response = await Categories.retrieveUserCats(req.params.user_id)
            res.status(201).json(response)
        })
        .catch(err => {
            res.status(500).json({ error: "the server failed to add the category to the user"})
        })
});

// removes a category from the user referencing the id from the user_category table
router.delete('/:cat_id/remove', (req, res) => {
    
    Categories.removeUserCat(req.params.cat_id)
        .then(cat => {
            res.status(200).json({message: 'the selected category was deleted'})
        })
        .catch(err => {
            res.status(500).json({error: 'the server failed to remove the category'})
        })
});

router.put('/:cat_id/update', (req, res) => {
    const newName = req.body.name;
    const id = req.params.cat_id;

    Categories.editUserCat(id, newName)
        .then(newCat => {
            const response = {id: id, name: newName, message: 'selected category updated'}
            res.status(200).json(response)
        })
        .catch(err => {
            res.status(500).json({error: 'the server failed to update the category'})
        })

})

module.exports = router;