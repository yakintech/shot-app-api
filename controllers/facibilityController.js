const Facibility = require("../models/Facibility");


const facibilityController = {
    getAll: async (req, res) => {
        try {
            var data = await Facibility.find({ isDeleted: false }).populate('city');
           return res.json(data);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }

    },
    getOne: async (req, res) => {
        try {
            var id = req.params.id;
            var data = await Facibility.findOne({ _id: id, isDeleted: false }).populate('city');
            return res.json(data);
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    create: async (req, res) => {
        try {
            var data = req.body;
            const file = req.file;
            var facibility = new Facibility({
                ...data,
                image: file.path
            });
            await facibility.save();
            return res.json({ id: facibility._id });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    update: async (req, res) => {
        try {
            var id = req.params.id;
            var data = req.body;
            await Facibility.findByIdAndUpdate(id, data);
            return res.json({ id });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },
    delete: async (req, res) => {
        try {
            var id = req.params.id;
            await Facibility.findByIdAndUpdate(id, { isDeleted: true });
            return res.json({ id });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

}


module.exports = facibilityController;