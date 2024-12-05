const mongoose = require('mongoose');

const FacibilitySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    address: String,
    city: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'City'
    },
    images: [],
    isDeleted: {
        type: Boolean,
        default: false
    }
},
{timestamps: true});


module.exports = mongoose.model('Facibility', FacibilitySchema);