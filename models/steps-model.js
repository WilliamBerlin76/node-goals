const db = require('../config/db-config');

module.exports = {
    addStepToGoal,
    getGoalSteps
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

async function getGoalSteps(goal_id){
    const goal = await db('goal_user_cat as guc')
                        .join('goals as g', 'guc.goal_id', 'g.id')
                        .select('guc.id as goal_id', 'g.name as goal')
                        .where('guc.id', '=', goal_id)
                        .first()
    if (goal) {
        const steps = await db('step_list as sl')
                                .join('steps as s', 'sl.step_id', 's.id')
                                .select(
                                    'sl.id as id',
                                    's.name as name',
                                    'sl.step_num'
                                )
                                .orderBy('sl.step_num')
                                .where({goal_user_cat_id: goal_id});
        return {
            ...goal,
            steps: steps
        };           
    };
};