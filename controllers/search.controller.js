const { getConnection } = require('../crowdfunding_db');

async function searchFundraisers(req, res) {
    const dbConnection = getConnection();
    const search = req.query.search;
    if (!search) {
        return res.status(400).send({ message: "Search query is required." });
    }

    const searchQuery = `%${search}%`;

    const [fundraisers] = await dbConnection.query(`SELECT * FROM fundraisers WHERE organizer LIKE ? OR city LIKE ? OR caption LIKE ?`,
        [searchQuery, searchQuery, searchQuery]).catch(err => {
            console.error(err);
            return res.status(500).send('Server error');
        });

    return res.status(200).send(fundraisers);
}

module.exports = { searchFundraisers };