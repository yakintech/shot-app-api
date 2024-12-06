const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const City = require('./models/City');

const { connectDB } = require('./config/db');
const authMiddleware = require('./middlewares/authMiddleware');
const authRoutes = require('./routes/authRoutes');
const adminUserRoutes = require('./routes/adminUserRoutes');
const facibilityRoutes = require('./routes/facibilityRoutes');
const webUserRoutes = require('./routes/webUserRoutes');
const postRoutes = require('./routes/postRoutes');
const likeRoutes = require('./routes/likeRoutes');
const commentRoutes = require('./routes/commentRoutes');
require('dotenv').config()

app.use(cookieParser())
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))

app.use(express.json());
require('dotenv').config()

connectDB();

const PORT = process.env.PORT || 5001;

app.use("/api/auth",authRoutes);
app.use("/api/adminusers", adminUserRoutes)
app.use("/api/facibilities", facibilityRoutes);
app.use("/api/webUsers", webUserRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/comments', commentRoutes);
app.use('/uploads', express.static('uploads'));




app.get("/api/check", authMiddleware, (req, res) => {
    res.send("ok");
});

app.get("/api/cities", async (req, res) => {
    var data = await City.find({ isDeleted: false });
    res.json(data);
}
)



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


