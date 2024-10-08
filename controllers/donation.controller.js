const { getConnection } = require('../crowdfunding_db');

async function createDonation(req, res) {
    const dbConnection = getConnection();

    const { date, amount, giver, fundraiser_id } = req.body;

    // Ensuring all required fields are provided
    if (!date || !amount || !giver || !fundraiser_id) {
        return res.status(400).json({
            error: "All fields (date, amount, giver, fundraiser_id) are required."
        });
    }

    const data = await dbConnection.execute(`
        INSERT INTO donation (DATE, AMOUNT, GIVER, FUNDRAISER_ID)
        VALUES (?, ?, ?, ?)
    `, [new Date(date), amount, giver, fundraiser_id]).catch(err => {
        console.error(err);
        return res.status(500).send('Server error');
    });

    await dbConnection.execute(`UPDATE fundraisers SET current_fund = current_fund + ?
        WHERE id = ?`, [amount, fundraiser_id]).catch(err => {
        console.error(err);
        return res.status(500).send('Server error');
    });

    return res.status(201).json({
        message: "Donation successfully created",
        donation_id: data.insertId,
        donation: {
            date,
            amount,
            giver,
            fundraiser_id
        }
    });
}

module.exports = { createDonation };