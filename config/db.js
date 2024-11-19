
const { default: mongoose } = require("mongoose");



const connectDB = async () => {
    try {
        const conn = await mongoose.connect("mongodb+srv://shot-app-user:Cx2PMkjKYVBalYFt@cluster0.yk1lz.mongodb.net/shot-app-api");
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
}

module.exports = {
    connectDB
};

