const db = require('../config/db-config');

module.exports = {
    addStepToGoal
};

function addStep(name){
    return db('steps')
            .insert({name: name})
};

async function addStepToGoal(goal_id, stepName, stepNum){
    const step = await db('steps')
                        .where({name: stepName})
                        .first();
    
    if (step){
        return db('step_list')
                .insert({
                    step_num: stepNum,
                    goal_user_cat_id: goal_id,
                    step_id: step.id
                });
    } else {
        await addStep(stepName);
        const newStep = await db('steps')
                                .where({name: stepName})
                                .first();
        return db('step_list')
                .insert({
                    step_num: stepNum,
                    goal_user_cat_id: goal_id,
                    step_id: newStep.id
                });
    };
};