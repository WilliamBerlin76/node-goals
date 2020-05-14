const db = require('../config/db-config')

module.exports = {
    addCatGoal
}

function addGoal(name){
    return db('goals')
            .insert({name: name})
}

async function addCatGoal(cat_id, goalName){
    const goal = await db('goals')
                        .where({name: goalName})
                        .first();

    if (goal){
        return db('goal_user_cat')
                .insert({
                    user_cat_id: cat_id,
                    goal_id: goal.id
                });
    } else {
        await addGoal(goalName)
        const newGoal = await db('goals')
                            .where({name: goalName})
                            .first();
        return db('goal_user_cat')
                .insert({
                    user_cat_id: cat_id,
                    goal_id: newGoal.id
                });
    }
}