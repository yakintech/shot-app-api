const mongoose = require('mongoose');

// name: name,
// description: description,
// address: address,
// city: city

const FacibilitySchema = new mongoose.Schema({
    name: String,
    description: String,
    address: String,
    city: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'City'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
},
{timestamps: true});


module.exports = mongoose.model('Facibility', FacibilitySchema);