const db = require('../config/db-config');

module.exports = {
    addStepToGoal,
    getGoalSteps,
    editGoalStep
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
                                    'sl.id as step_id',
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

async function editGoalStep(id, changes){
    if (changes.name){
        const step = await db('steps')
                        .where({name: changes.name})
                        .first();
        
        if (step) {
            if (changes.stepNum){
                return db('step_list')
                        .update({
                            step_id: step.id,
                            step_num: changes.stepNum
                        })
                        .where({id});
            } else {
                return db('step_list')
                        .update({step_id: step.id})
                        .where({id})
            };
        } else {
            await addStep(changes.name);
            const newStep = await db('steps')
                                    .where({name: changes.name})
                                    .first();
            if (changes.stepNum){
                return db('step_list')
                        .update({
                            step_id: newStep.id,
                            step_num: changes.stepNum
                        })
                        .where({id});
            } else {
                return db('step_list')
                        .update({step_id: newStep.id})
                        .where({id});
            };
        };
    } else {
        return db('step_list')
                .update({step_num: changes.stepNum})
                .where({id});
    }; 
};