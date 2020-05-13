const db = require('../config/db-config')

module.exports = {
    addUserCat
}

async function addCategory(name){
    return db('categories')
            .insert({name: name})
}

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
}