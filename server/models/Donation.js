const { Schema, model } = require('mongoose');

const donationSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    amount: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
});

const Donation = model('donation', donationSchema);

module.exports = Donation;