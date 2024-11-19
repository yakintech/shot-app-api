const mongoose = require('mongoose');


const refreshTokenSchema = new mongoose.Schema({
    token: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    expiresAt: {
        type: Date,
        required: true
    },
    createdByIp: {
        type: String,
        required: true
    }
},{
    timestamps: true
});

const RefreshToken = mongoose.model('RefreshToken', refreshTokenSchema);

module.exports = RefreshToken;