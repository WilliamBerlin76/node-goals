const router = require('express').Router();
const Goals = require('../models/goals-model');

// add goal to category
router.post('/:cat_id/add', (req, res) => {
    const goalName = req.body.name;
    const catId = req.params.cat_id;

    Goals.addCatGoal(catId, goalName)
        .then(async goal => {
            const response = await Goals.getCatGoals(catId)
            res.status(201).json(response)
        })
        .catch(err => {
            res.status(500).json({error: 'The server failed to add the goal to the category.'})
        })
});

// get goals by category id
router.get('/:cat_id', (req, res) => {

    Goals.getCatGoals(req.params.cat_id)
        .then(goals => {
            res.status(200).json(goals)
        })
        .catch(err => {
            res.status(500).json({error: 'The server failed to get the goals'})
        })
})

module.exports = router