const mongoose = require('mongoose');


const WebUserSchema = new mongoose.Schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    birthDate: {
        type: Date
    },
    city: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'City'
    },
    image: String,
    position: ["Goalkeeper", "Right Back", "Left Back", "Center Back", "Defensive Midfielder", "Central Midfielder", "Attacking Midfielder", "Right Winger", "Left Winger", "Striker"],
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
},
{
    timestamps: true
});


module.exports = mongoose.model('WebUser', WebUserSchema);