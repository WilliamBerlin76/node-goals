const db = require('../../config/db-config.js');

const { addCatGoal } = require('../../models/goals-model')

describe("goals-models", () => {
    beforeEach(async () => {
        await db('categories').truncate()
        await db('goals').truncate()
        await db('goal_user_cat').truncate()
        await db('user_category').truncate();
        await db('users').truncate();
        await db('users').insert({
            username: "thisisatest",
            email: "thisisatest@gmail.com",
            password: "thisisatest"
        });
        await db('categories').insert({name: "test-cat"});
        await db('user_category').insert({
            user_id: 1,
            category_id: 1
        });
    });

    describe("addCatGoal", () => {
        it('should add a goal to the category', async () => {
            await addCatGoal(1, "test-goal");

            const goal = await db("goals")
            const catGoal = await db("goal_user_cat")

            expect(goal[0].name).toBe("test-goal")
            expect(goal).toHaveLength(1)
            expect(catGoal[0].user_cat_id).toBe(1)
            expect(catGoal[0].goal_id).toBe(1)
        });
    });
});