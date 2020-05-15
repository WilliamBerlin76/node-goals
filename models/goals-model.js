const db = require('../config/db-config')

module.exports = {
    addCatGoal, 
    getCatGoals,
    removeGoal
}

function addGoal(name){
    return db('goals')
            .insert({name: name})
}

// adds a goal to the category
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
    };
};

// gets goals connected to the user_cat_id
async function getCatGoals(cat_id){
    const category = await db('user_category as uc')
                            .join('categories as c', 'uc.category_id', 'c.id')
                            .select('uc.id as cat_id', 'c.name as category')
                            .where({category_id: cat_id})
                            .first()
    if (category) {
        const goals = await db('goal_user_cat as guc')
                                .join('goals as g', 'g.id', 'guc.goal_id')
                                .select(
                                    'guc.id as id',
                                    'g.name as name'
                                )
                                .where({user_cat_id: cat_id})
        return {
            ...category,
            goals: goals
        };
    };
};

// removes a goal from a category
function removeGoal(id){
    return db('goal_user_cat')
            .where({id})
            .first()
            .del()
}