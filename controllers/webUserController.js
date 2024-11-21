const WebUser = require("../models/WebUser");


const webUserController = {
    getAll: async (req, res) => {
        try {
            var data = await WebUser.find({ isDeleted: false }).populate('city');
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
            const file = req.file;
            var webUser = new WebUser({
                ...data,
                image: file.path
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
    }
}

module.exports = webUserController;