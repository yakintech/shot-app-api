const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const Facibility = require('./models/Facibility');
const City = require('./models/City');
const WebUser = require("./models/WebUser");
const Post = require("./models/Post");

const { connectDB } = require('./config/db');
const authMiddleware = require('./middlewares/authMiddleware');
const authRoutes = require('./routes/authRoutes');
const adminUserRoutes = require('./routes/adminUserRoutes');
const facibilityRoutes = require('./routes/facibilityRoutes');
const webUserRoutes = require('./routes/webUserRoutes');
const postRoutes = require('./routes/postRoutes');

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
app.use('/uploads', express.static('uploads'));

app.get("/api/check", authMiddleware, (req, res) => {
    res.send("ok");
});

app.get("/api/cities", async (req, res) => {
    var data = await City.find({ isDeleted: false });
    res.json(data);
}
)


const seedData = async () => {
  try {
    // Kullanıcıları ekle
    const user1 = await WebUser.create({
        firstName: 'Samir',
        lastName: 'Sardarli',
        username: 'samirsardarli',
        birthDate: new Date('1997-08-02'),
        city: "673dc801e50ab7086559cb59",
        image: 'https://ui-avatars.com/api/?name=Samir+Sardarli&background=random',
        position: 'Central Midfielder',
        email: 'ssardarlisamir@gmail.com',
        password: 'samir123',
      });

    //   const user4 = await WebUser.create({
    //     firstName: 'Berkant',
    //     lastName: 'Karakayış',
    //     username: 'berkantkarakayis',
    //     birthDate: new Date('1990-05-15'), // Tahmini doğum tarihi
    //     city: '673dc801e50ab7086559cb59', // "Adana" şehri
    //     image: 'https://ui-avatars.com/api/?name=Berkant+Karakayış&background=random',
    //     position: 'Left Back', // Örnek pozisyon
    //     email: 'berkant.karakayis@example.com',
    //     password: 'berkant123',
    //   });

      
    //   const user2 = await WebUser.create({
    //     firstName: 'Hakan',
    //     lastName: 'Uysal',
    //     username: 'hakanuyysal',
    //     birthDate: new Date('1988-09-22'), // Tahmini doğum tarihi
    //     city: '673dc801e50ab7086559cb5c', // "Ağrı" şehri
    //     image: 'https://ui-avatars.com/api/?name=Hakan+Uysal&background=random',
    //     position: 'Right Back', // Örnek pozisyon
    //     email: 'hakan.uysal@example.com',
    //     password: 'hakan123',
    //   });

      
    //   const user3 = await WebUser.create({
    //     firstName: 'Çağatay',
    //     lastName: 'Yıldız',
    //     username: 'cagatay.yildiz',
    //     birthDate: new Date('1992-11-05'), // Tahmini doğum tarihi
    //     city: '673dc801e50ab7086559cb5d', // "Amasya" şehri
    //     image: 'https://ui-avatars.com/api/?name=Çağatay+Yıldız&background=random',
    //     position: 'Striker', // Örnek pozisyon
    //     email: 'cagatay.yildiz@example.com',
    //     password: 'cagatay123',
    //   });
      

    // const user2 = await WebUser.create({
    //   firstName: "Ayşe",
    //   lastName: "Yılmaz",
    //   email: "ayse.yilmaz@example.com",
    //   password: "password123",
    // });

    // const user3 = await WebUser.create({
    //   firstName: "Fatma",
    //   lastName: "Kaya",
    //   email: "fatma.kaya@example.com",
    //   password: "password123",
    // });

    // Postlar oluştur
    // const post1 = await Post.create({
    //   content: "Beşiktaş halı sahasında inanılmaz bir maç! Kalecinin kurtarışı alkış topladı. 🧤⚽",
    //   user: "674b92312d990fca77e4ddcf",
    // });

    // const post2 = await Post.create({
    //   content: "Bu bir resim postudur.",
    //   attachUrl: "https://example.com/image.jpg",
    //   user: user2._id,
    // });

    // const post3 = await Post.create({
    //   content: "Bu bir video postudur.",
    //   attachUrl: "https://example.com/video.mp4",
    //   user: user3._id,
    // });

    // Kullanıcılara postları ekle
    // await WebUser.findByIdAndUpdate("674b92312d990fca77e4ddcf", { $push: { posts: post1._id } });
    // await WebUser.findByIdAndUpdate(user2._id, { $push: { posts: post2._id } });
    // await WebUser.findByIdAndUpdate(user3._id, { $push: { posts: post3._id } });

    console.log("Seed işlemi başarıyla tamamlandı!");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

// seedData();




app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


