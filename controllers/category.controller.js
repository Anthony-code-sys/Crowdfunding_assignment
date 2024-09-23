const { getConnection } = require('../crowdfunding_db');

async function getCategories(_req, res) {
    const dbConnection = getConnection();
    try {
        const [categories] = await dbConnection.query(
            'SELECT `category_id` as categoryId, `name` FROM `category` ORDER BY `categoryId` ASC'
        );

        return res.json({ data: { categories } });
    } catch (error) {
        console.log(error);
        return res.status(500).send('Server error');
    }
}

module.exports = { getCategories };