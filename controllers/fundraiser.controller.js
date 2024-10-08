const { getConnection } = require('../crowdfunding_db');

async function createFundraiser(req, res) {
    const dbConnection = getConnection();

    const { category_id, organizer, caption, city, current_fund, active, target_fund } = req.body;

    if (!category_id || !organizer || !caption || !city || current_fund === undefined || active === undefined || target_fund === undefined) {
        return res.status(400).send({ error: "All fields (category_id, organizer, caption, city, current_fund, active, target_fund) are required." });
    }

    const insertFundraiserQuery = `
        INSERT INTO fundraisers (category_id, organizer, caption, city, current_fund, active, target_fund)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    const data = await dbConnection.execute(insertFundraiserQuery, [category_id, organizer, caption, city, current_fund, active, target_fund]).catch(err => {
        console.error("Error while inserting fundraiser:", err);
        return res.status(500).send({ error: "Database error while inserting fundraiser." });
    });

    return res.status(201).send({
        message: "Fundraiser successfully created",
        fundraiser_id: data.insertId,
        fundraiser: {
            category_id,
            organizer,
            caption,
            city,
            current_fund,
            active,
            target_fund
        }
    });

}

async function getFundraiserDetail(req, res) {
    const dbConnection = getConnection();
    const fundraiserId = Number(req.params.id);

    if (Number.isNaN(fundraiserId)) {
        return res.status(400).send('Invalid fundraiser ID');
    }

    try {
        const [records] = await dbConnection.execute(`
            SELECT f.*, d.DONATION_ID, d.DATE, d.AMOUNT, d.GIVER
            FROM fundraisers f
            LEFT JOIN donation d ON f.id = d.FUNDRAISER_ID
            WHERE f.id = ?
        `, [fundraiserId]
        );

        if (!records[0]) {
            return res.status(404).send({ error: "Fundraiser not found" });
        }

        const fundraiserDetails = {
            id: records[0].id,
            organizer: records[0].organizer,
            caption: records[0].caption,
            target_fund: records[0].target_fund,
            current_fund: records[0].current_fund,
            city: records[0].city,
            active: records[0].active,
            category_id: records[0].category_id,
            donations: records.map(record => ({
                donation_id: record.DONATION_ID,
                date: record.DATE,
                amount: record.AMOUNT,
                giver: record.GIVER
            })).filter(donation => donation.donation_id)
        };

        return res.send(fundraiserDetails);
    } catch (err) {
        console.error("Error while retrieving the data:", err);
        return res.status(500).send({ error: "Database retrieval error" });
    }
}

async function getFundraisers(req, res) {
    const dbConnection = getConnection();
    try {
        // const query = req.query;
        // const filterValues = [];

        let sql = "select * from fundraisers where active <> 0";

        // if (query.organizer) {
        //     sql += ' AND `organizer` LIKE ?';
        //     filterValues.push(`%${query.organizer}%`);
        // }

        // if (query.city) {
        //     sql += ' AND city = ?';
        //     filterValues.push(query.city);
        // }

        // if (query.categoryId) {
        //     sql += ' AND `fundraiser`.`category_id` = ?';
        //     filterValues.push(query.categoryId);
        // }

        // if (query.category) {
        //     sql += ' AND `category`.`name` = ?';
        //     filterValues.push(query.category);
        // }

        sql += ' ORDER BY `id` ASC';

        const [fundraisers] = await dbConnection.query(
            sql
        );

        return res.send(fundraisers);
    } catch (err) {
        console.log(err);
        return res.status(500).send('Server error');
    }
}

async function updateFundraiser(req, res) {
    const dbConnection = getConnection();
    const { id } = req.params;
    const { category_id, organizer, caption, city, current_fund, active, target_fund } = req.body;

    if (!category_id && !organizer && !caption && !city && current_fund === undefined && active === undefined && target_fund === undefined) {
        return res.status(400).send({ error: "At least one field (category_id, organizer, caption, city, current_fund, active, target_fund) is required to update." });
    }
    let updateFields = [];
    let updateValues = [];

    if (category_id) {
        updateFields.push("category_id = ?");
        updateValues.push(category_id);
    }
    if (organizer) {
        updateFields.push("organizer = ?");
        updateValues.push(organizer);
    }
    if (caption) {
        updateFields.push("caption = ?");
        updateValues.push(caption);
    }
    if (city) {
        updateFields.push("city = ?");
        updateValues.push(city);
    }
    if (current_fund) {
        updateFields.push("current_fund = ?");
        updateValues.push(current_fund);
    }
    if (active) {
        updateFields.push("active = ?");
        updateValues.push(active);
    }
    if (target_fund) {
        updateFields.push("target_fund = ?");
        updateValues.push(target_fund);
    }

    updateValues.push(id);

    const updateQuery = `
        UPDATE fundraisers
        SET ${updateFields.join(", ")}
        WHERE id = ?
    `;

    const data = await dbConnection.execute(updateQuery, updateValues).catch(err => {
        console.error("Error while updating fundraiser:", err);
        return res.status(500).send({ error: "Database error while updating fundraiser." });
    });

    if (data.affectedRows === 0) {
        return res.status(404).send({ error: "Fundraiser not found." });
    }

    return res.status(200).send({
        message: "Fundraiser updated successfully",
        fundraiser_id: id,
        updatedFields: req.body
    });
}

async function deleteFundraiser(req, res) {
    const dbConnection = getConnection();

    const fundraiserId = req.params.id;

    const checkDonationsQuery = `
        SELECT COUNT(*) AS donationCount FROM DONATION WHERE FUNDRAISER_ID = ?
    `;

    try {
        const [donationCheckResult] = await dbConnection.query(checkDonationsQuery, [fundraiserId]);

        if (donationCheckResult[0].donationCount > 0) {
            return res.status(400).json({
                error: "Cannot delete this fundraiser because it has existing donations."
            });
        }

        const deleteFundraiserQuery = `
            DELETE FROM FUNDRAISERS WHERE id = ?
        `;

        const data = await dbConnection.execute(deleteFundraiserQuery, [fundraiserId]);

        if (data.affectedRows === 0) {
            return res.status(404).json({ error: "Fundraiser not found" });
        }

        return res.status(200).json({ message: "Fundraiser deleted successfully" });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Error deleting donation" });
    }

}

module.exports = {
    getFundraiserDetail,
    getFundraisers,
    createFundraiser,
    updateFundraiser,
    deleteFundraiser
};