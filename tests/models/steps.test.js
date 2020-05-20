const db = require('../../config/db-config.js');

const { addStepToGoal, getGoalSteps } = require('../../models/steps-model');

describe("goals-models", () => {
    beforeEach(async () => {
        await db('categories').truncate()
        await db('goals').truncate()
        await db('goal_user_cat').truncate()
        await db('user_category').truncate();
        await db('users').truncate();
        await db('step_list').truncate();
        await db('steps').truncate();
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
        await db('goals').insert({name: 'test-goal'});
        await db('goal_user_cat').insert({
            user_cat_id: 1,
            goal_id: 1
        });
    });

    describe("addStepToGoal", () => {
        it('should add a step to the goal', async () => {
            await addStepToGoal(1, 'test-step', 1);

            const step = await db('steps');
            const goalStep = await db('step_list');

            expect(step[0].name).toBe("test-step");
            expect(step).toHaveLength(1);
            expect(goalStep[0].goal_user_cat_id).toBe(1);
            expect(goalStep[0].step_id).toBe(1);
            expect(goalStep[0].step_num).toBe(1)
        });
    });

    describe("getGoalSteps", () => {
        it('should return the steps attached to a goal', async () => {
            await addStepToGoal(1, 'test-step1', 1);
            await addStepToGoal(1, 'test-step3', 3);
            await addStepToGoal(1, 'test-step2', 2);

            const stepList = await getGoalSteps(1);

            expect(stepList.steps).toHaveLength(3);
            // check if ordered by step_num
            let stepNum = 1;
            for(let i = 0; i < stepList.steps.length; i++){
                expect(stepList.steps[i].step_num).toBe(stepNum);
                stepNum++;
            };
        });
    });
});