const db = require('../config/db-config')

module.exports = {
    addUserCat,
    removeUserCat,
    retrieveUserCats
}
// adds to categories table
async function addCategory(name){
    return db('categories')
            .insert({name: name})
}

// connects/adds category to user
async function addUserCat(user_id, catName){
    const category = await db('categories')
                        .where({name: catName})
                        .first();
    if (category){
        return db('user_category')
                .insert({
                    category_id: category.id,
                    user_id: user_id
                })
    } else {
        await addCategory(catName)
        const category = await db('categories')
                        .where({name: catName})
                        .first();
        return db('user_category')
                .insert({
                    category_id: category.id,
                    user_id: user_id
                })
    }
};

async function retrieveUserCats(user_id){
    const user = await db('users')
                        .where({id: user_id})
                        .select('id', 'username', 'email')
                        .first()
    if (user){
        const categories = await db("user_category as uc")
                                    .join("users as u", "uc.user_id", "u.id")
                                    .join("categories as c", "uc.category_id", "c.id")
                                    .select(
                                        "uc.id as user_category_id",
                                        "c.name as name"
                                    )
                                    .where({user_id: user_id})
        return {
            ...user,
            categories: categories
        }
    }
}

// removes a category from a user
function removeUserCat(id){
    return db('user_category')
            .where({id})
            .first()
            .del()
};