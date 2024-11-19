const { default: mongoose } = require("mongoose");

const CitySchema = new mongoose.Schema({
    name: String,
    isDeleted: {
        type: Boolean,
        default: false
    }
},
{timestamps: true});



module.exports = mongoose.model('City', CitySchema);