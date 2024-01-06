const express = require("express");
const router = express.Router();

router.post('/foodData', (req, res) => {
    try {
        const { food_items, foodCategory } = global;
        const responseData = [food_items,foodCategory]

        console.log(responseData);
        res.send(responseData);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error :(');
    }
});

module.exports = router;
