const { default: mongoose } = require("mongoose");


const AdminUserSchema = new mongoose.Schema({
    email: String,
    password: String,
    isDeleted: {
        type: Boolean,
        default: false
    }
},
{timestamps: true});


const AdminUser = mongoose.model('AdminUser', AdminUserSchema);

module.exports = AdminUser;