const db = require('../../config/db-config.js');

const { addUserCat, removeUserCat, retrieveUserCats, editUserCat } = require('../../models/categories-model')

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
            const user_category = await db("user_category")
            expect(categories[0].name).toBe('goalcat')
            expect(user_category[0].category_id).toBe(1)
            expect(user_category[0].user_id).toBe(1)
        });
    });
    
    describe('delete-category', () => {
        it('should remove the category from the user', async () => {
            const category = {name: "goalcat"}
            const user = {id: 1}
            await addUserCat(user.id, category.name)
            const userCatItem = await db('user_category')
                                .where({user_id: 1})
                                .first()
            await removeUserCat(userCatItem.id)
            const newUserCatItem = await db('user_category')
                                .where({user_id: 1})
                                .first()
            // check if removed from middle table
            expect(newUserCatItem).toBeUndefined()

            const retCategory = await db('categories')
                                        .where({name: "goalcat"})
                                        .first()
            // check if still exists in categories table
            expect(retCategory.name).toBe('goalcat')
        });
    });

    describe('retrieve user categories', () => {
        it("should retrieve a user's categories", async () => {
            const user = {id: 1}
            await addUserCat(user.id, "test1")
            await addUserCat(user.id, "test2")
            await addUserCat(user.id, "test3")

            const userCategories = await retrieveUserCats(user.id)
            expect(userCategories.categories).toHaveLength(3)
        });
    });
    describe('editUserCat', () => {
        it("should update the category name", async () => {
            const user = {id: 1}
            await addUserCat(user.id, "test1")

            await editUserCat(1, "changedTest")
            const userCategories = await retrieveUserCats(user.id)
            expect(userCategories.categories[0].name).toBe('changedTest')
        });
    });
});