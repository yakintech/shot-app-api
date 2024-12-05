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
    create: async (req, res) => {
        try {
            var data = req.body;
            const file = req?.file;
            var webUser = new WebUser({
                ...data,
                image: file?.path
            });
            await webUser.save();
            return res.json({ id: webUser._id });
        } catch (error) {
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
                return res.json({ id: webUser._id , message: "User is already following the facibility" });
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
    }
}

module.exports = webUserController;