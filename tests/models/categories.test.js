const db = require('../../config/db-config.js');

const { addUserCat } = require('../../models/categories-model')

describe("categories-model", () => {
    beforeEach(async () => {
        await db('categories').truncate();
        await db('user_category').truncate();
        await db('users').truncate();
        await db('users').insert({
            username: "thisisatest",
            email: "thisisatest@gmail.com",
            password: "thisisatest"
        });
    });

    describe('add-category', () => {
        it('should add a category', async () => {
            const category = {name: "goalcat"}
            const user = {id: 1}
            await addUserCat(user.id, category.name)
            const categories = await db("categories")
            expect(categories[0].name).toBe('goalcat')
        })
    })
});