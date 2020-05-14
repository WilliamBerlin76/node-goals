const db = require('../config/db-config')

module.exports = {
    addUserCat,
    removeUserCat,
    retrieveUserCats,
    editUserCat
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
                        .select('id as user_id', 'username', 'email')
                        .first()
    if (user){
        const categories = await db("user_category as uc")
                                    .join("users as u", "uc.user_id", "u.id")
                                    .join("categories as c", "uc.category_id", "c.id")
                                    .select(
                                        "uc.id as id",
                                        "c.name as name"
                                    )
                                    .where({user_id: user_id})
        return {
            ...user,
            categories: categories
        }
    }
}

// edits the category name connected to a user
async function editUserCat(id, newName){
    const category = await db('categories')
                            .where({name: newName})
                            .first()
    // check if newName in categories table
    if (category){
        //update the category id to the existing one in the db
        return db('user_category')
                .update({category_id: category.id})
                .where({id})
    } else {
        // create new category name
        await addCategory(newName)
        const newCategory = await db('categories')
                                    .where({name: newName})
                                    .first()
        // update the category id to match the new category
        return db('user_category')
                .update({category_id: newCategory.id})
                .where({id})
    }

}
// removes a category from a user
function removeUserCat(id){
    return db('user_category')
            .where({id})
            .first()
            .del()
};