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
        });
});

// get goals by category id
router.get('/:cat_id', (req, res) => {

    Goals.getCatGoals(req.params.cat_id)
        .then(goals => {
            res.status(200).json(goals)
        })
        .catch(err => {
            res.status(500).json({error: 'The server failed to get the goals'})
        });
});

// edit goal name referencing id in goal_user_cat table
router.put('/:goal_id/update', (req, res) => {
    const { name } = req.body;
    const { goal_id } = req.params;

    Goals.editCatGoal(goal_id, name)
        .then(goal => {
            res.status(200).json({message: "Goal name updated"})
        })
        .catch(err => {
            res.status(500).json({error: "The server failed to update the goal name"})
        })
})

module.exports = router