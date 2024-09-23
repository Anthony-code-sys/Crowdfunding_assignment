const { getConnection } = require('../crowdfunding_db');

async function getFundraiserDetail(req, res) {
    const dbConnection = getConnection();
    const fundraiserId = Number(req.params.id);

    if (Number.isNaN(fundraiserId)) {
        return res.status(400).send('Invalid fundraiser ID');
    }

    try {
        const [data] = await dbConnection.execute(
            'SELECT DISTINCT `fundraiser_id` as fundraiserId, `organizer`, `caption`, `target_funding` as targetFunding, `current_funding` as currentFunding, `city`, `active`, `fundraiser`.`category_id` as categoryId, `category`.`name` as categoryName FROM `fundraiser` JOIN category ON `category`.`category_id` = `fundraiser`.`category_id` WHERE `fundraiser`.`fundraiser_id` = ? LIMIT 1', [fundraiserId]
        );

        if (!data[0]) {
            return res.status(404).send('Data not found');
        }

        return res.json({ data: data[0] });
    } catch (err) {
        console.log(err);
        return res.status(500).send('Server error');
    }
}

async function getFundraisers(req, res) {
    const dbConnection = getConnection();
    try {
        const query = req.query;
        const filterValues = [];

        let sql = 'SELECT `fundraiser_id` as fundraiserId, `organizer`, `caption`, `target_funding` as targetFunding, `current_funding` as currentFunding, `city`, `active`, `fundraiser`.`category_id` as categoryId, `category`.`name` as categoryName FROM `fundraiser` JOIN category ON `category`.`category_id` = `fundraiser`.`category_id` WHERE `fundraiser`.`active` = true';

        if (query.search) {
            sql += ' AND `organizer` LIKE ?';
            filterValues.push(`%${query.search}%`);
        }

        if (query.city) {
            sql += ' AND city = ?';
            filterValues.push(query.city);
        }

        if (query.categoryId) {
            sql += ' AND `fundraiser`.`category_id` = ?';
            filterValues.push(query.categoryId);
        }

        sql += ' ORDER BY `organizer` ASC';


        const [fundraisers] = await dbConnection.query(
            sql, filterValues
        );

        return res.json({ data: { fundraisers } });
    } catch (err) {
        console.log(err);
        return res.status(500).send('Server error');
    }
}

module.exports = {
    getFundraiserDetail,
    getFundraisers
};