const Facibility = require("../models/Facibility");
const WebUser = require("../models/WebUser");


const webUserController = {
    getAll: async (req, res) => {
        try {
            var data = await WebUser.find({ isDeleted: false }).populate('city').populate('posts');;
            return res.json(data);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }

    },
    getOne: async (req, res) => {
        try {
            var id = req.params.id;
            var data = await WebUser.findOne({ _id: id, isDeleted: false }).populate('city');
            return res.json(data);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    createWithSocial: async (req, res) => {
        try {
            var { loginType, email, supabaseId, userData } = req.body;
            var webUser = new WebUser({
                loginType,
                email,
                supabaseId,
                userData,
                fullName: email.split("@")[0],
                username: email.split("@")[0],
                isConfirmed: true
            });



    
            var existingUser = await WebUser.findOne({ email });
            console.log("existingUser", existingUser);
            if (existingUser) {
                existingUser.supabaseId = supabaseId;
                await existingUser.save();
                return res.status(200).json({ message: "User with this email already exists" });
            }

            await webUser.save();
            return res.json({ id: webUser._id });
        } catch (error) {
            console.log("Error createWithSocial", error);
            return res.status(500).json({ message: error.message });
        }
    },
    delete: async (req, res) => {
        try {
            var id = req.params.id;
            await WebUser.findByIdAndUpdate(id, { isDeleted: true });
            return res.json({ id });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    followFacibility: async (req, res) => {
        try {
            const { userId, facibilityId } = req.body;

            var webUser = await WebUser.findById(userId);
            if (!webUser) {
                return res.status(404).json({ message: "User not found" });
            }

            var facibility = await Facibility.findById(facibilityId);
            if (!facibility) {
                return res.status(404).json({ message: "Facibility not found" });
            }

            if (webUser.followFacibilities.includes(facibilityId)) {
                return res.json({ id: webUser._id, message: "User is already following the facibility" });
            }

            webUser.followFacibilities.push(facibilityId);
            await webUser.save();
            return res.json({ id: webUser._id });
        } catch (error) {
            console.log(`Error addToFavFacibility facibilityId,userId ${facibilityId}, ${userId}`, error);
            return res.status(500).json({ message: error.message });
        }
    },
    unFollowFacibility: async (req, res) => {
        try {
            const { userId, facibilityId } = req.body;

            var webUser = await WebUser.findById(userId);
            if (!webUser) {
                return res.status(404).json({ message: "User not found" });
            }

            var facibility = await Facibility.findById(facibilityId);
            if (!facibility) {
                return res.status(404).json({ message: "Facibility not found" });
            }

            // if user is not following the facibility, return
            if (!webUser.followFacibilities.includes(facibilityId)) {
                return res.json({ id: webUser._id, message: "User is not following the facibility" });
            }

            webUser.followFacibilities = webUser.followFacibilities.filter(f => f.toString() != facibilityId);
            await webUser.save();
            return res.json({ id: webUser._id });
        } catch (error) {
            console.log(`Error removeFavFromFacibility facibilityId,userId ${facibilityId}, ${userId}`, error);
            return res.status(500).json({ message: error.message });
        }
    },
    getBySupabaseId: async (req, res) => {
        try {
            var supabaseId = req.params.id;
            var data = await WebUser.findOne({ supabaseId, isConfirmed: true });

            if (!data) {
                return res.status(404).json({ message: "User not found" });
            }

          
            let followersCount = await WebUser.countDocuments({ followUsers: { $in: [supabaseId] } });
          
            let webUser = {
                _id: data._id,
                id: data.supabaseId,
                email: data.email,
                userName: data.username,
                createdAt: data.createdAt,
                followUsers: data.followUsers,
                followersCount: followersCount,
                fullName: data.fullName,
                createdAt: data.createdAt,
                birthDate: data.birthDate,
                position: data.position,
            }
            return res.json(webUser);
        } catch (error) {
            console.log(`getBySupabaseId supabaseId ${supabaseId}`, error);
            return res.status(500).json({ message: error.message });
        }
    },
    createWithEmail: async (req, res) => {
        try {
            var { email, password, username, fullName, position, birthDate } = req.body;
            var webUser = new WebUser({
                email,
                password,
                username,
                fullName,
                position,
                birthDate,
            });

            var existingUser = await WebUser.findOne({ email });
            if (existingUser) {
                return res.status(200).json({ message: "User with this email already exists" });
            }

            //username unique olmalı
            var existingUser = await WebUser.findOne({ username });
            if (existingUser) {
                return res.status(200).json({ message: "User with this username already exists" });
            }

            await webUser.save();
            return res.json({ id: webUser._id });
        } catch (error) {
            console.log("Error createWithEmail", error);
            return res.status(500).json({ message: error.message });
        }
    },
    confirmEmail: async (req, res) => {
        let { id } = req.body;
        try {
            let webUser = await WebUser.findById({
                supabaseId: id
            })
            if (!webUser) {
                return res.status(404).json({ message: "User not found" })
            }
            webUser.isConfirmed = true;
            await webUser.save();
        } catch (error) {

        }
    },
    followUser: async (req, res) => {
        try {
            let { userId, followUserId } = req.body;

            followUserId = followUserId.toString();
            userId = userId.toString();

            var webUser = await WebUser.findOne({ supabaseId: userId });
            if (!webUser) {
                console.log("User not found");
                return res.status(404).json({ message: "User not found" });
            }

            var followUser = await WebUser.findOne({ supabaseId: followUserId });
            if (!followUser) {
                console.log("Follow user not found");
                return res.status(404).json({ message: "Follow user not found" });
            }

            if (webUser.followUsers.includes(followUserId)) {
                return res.json({ id: webUser._id, message: "User is already following the user" });
            }

            webUser.followUsers.push(followUserId);
            await webUser.save();
            return res.json({ id: webUser._id });
        } catch (error) {
            console.log(`Error followUser followUserId,userId ${followUserId}, ${userId}`, error);
            return res.status(500).json({ message: error.message });
        }
    },
    unFollowUser: async (req, res) => {
        try {
            const { userId, followUserId } = req.body;
            console.log("userId", userId);
            console.log("followUserId", followUserId);

            var webUser = await WebUser.findOne({ supabaseId: userId });
            console.log("webUser", webUser);
            if (!webUser) {
                return res.status(404).json({ message: "User not found" });
            }

            var followUser = await WebUser.findOne({ supabaseId: followUserId });
            console.log("followUser", followUser);
            if (!followUser) {
                return res.status(404).json({ message: "Follow user not found" });
            }
            if (!webUser.followUsers.includes(followUserId)) {
                return res.json({ id: webUser._id, message: "User is not following the user" });
            }

            webUser.followUsers = webUser.followUsers.filter(f => f.toString() != followUserId);
            await webUser.save();
            return res.json({ id: webUser._id });
        } catch (error) {
            console.log(`Error unFollowUser followUserId,userId ${followUserId}, ${userId}`, error);
            return res.status(500).json({ message: error.message });
        }
    },
    updateProfile: async (req, res) => {  
        console.log("req.body", req.body);

        try {
            let { email, fullName, birthDate, position, bio, username } = req.body;
            let userId = req.params.id;

            let webUser = await WebUser.findOne({ supabaseId: userId });
            if (!webUser) {
                return res.status(404).json({ message: "User not found" });
            }

            webUser.email = email;
            webUser.fullName = fullName;
            webUser.birthDate = birthDate;
            webUser.position = position;
            webUser.bio = bio;
            webUser.username = username
            await webUser.save();
            return res.json({ id: webUser._id, supabaseId: webUser.supabaseId });
        }
        catch (error) {
            console.log(`Error updateProfile`, error);
            return res.status(500).json({ message: error.message });
        }
    }
}

module.exports = webUserController;