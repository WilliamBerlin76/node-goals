const router = require('express').Router();
const Steps = require('../models/steps-model');

// get goal with array of associated steps
router.get('/:goal_id', (req, res) => {
    Steps.getGoalSteps(req.params.goal_id)
        .then(steps => {
            res.status(200).json(steps);
        })
        .catch(err => {
            res.status(500).json({ error: "the server failed to retrieve the steps" });
        });
});

// add step to a goal
router.post('/:goal_id', (req, res) => {
    const { name, stepNum } = req.body;
    const goalId = req.params.goal_id;

    Steps.addStepToGoal(goalId, name, stepNum)
        .then(async steps => {
            const response = await Steps.getGoalSteps(goalId);
            const messageResponse = {
                message: 'new step created',
                ...response
            };
            res.status(201).json(messageResponse)
        })
        .catch(err => {
            res.status(500).json({ error: "the server failed to add the step to the goal" });
        });
});

// edit a step by id
router.put('/:step_id/update', (req, res) => {
    const changes = req.body;
    const stepId = req.params.step_id;

    Steps.editGoalStep(stepId, changes)
        .then(step => {
            res.status(200).json({ message: "step successfully updated" });
        })
        .catch(err => {
            res.status(500).json({ error: "the server failed to update the step"});
        });
});

module.exports = router;