const { getConnection } = require('../crowdfunding_db');

async function getCategories(_req, res) {
    const dbConnection = getConnection();
    try {
        const [results] = await dbConnection.query(
            'SELECT * FROM categories'
        );

        return res.json(results);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: 'Failed to retrieve categories' });
    }
}

module.exports = { getCategories };