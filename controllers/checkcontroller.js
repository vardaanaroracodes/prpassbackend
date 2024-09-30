const { validationResult } = require('express-validator');
const User = require('../models/user'); // Assuming User is your Mongoose model

// User check endpoint
exports.check = async (req, res) => {
    // Validate the input
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    // Extract and sanitize hallticketno from the request body
    let { hallticketno } = req.body;
    hallticketno = String(hallticketno);  // Convert it to string if not already
    
    try {
        // Find user in the database by hallticketno
        const user = await User.findOne({ hallticketno });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid HallTicket Number' });
        }
        if(user.transactionid){
            return res.status(400).json({ msg: 'Pass Already Purchased' });
        }
        
        // Extract only the first 5 digits of the parent's phone number
        const truncatedParentPhone = user.parentphone.slice(0, 5);
        
        // Return the firstname and truncated parent's phone number
        res.status(200).json({ firstname: user.firstname, parentphone: truncatedParentPhone });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
}
