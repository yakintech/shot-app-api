const Facibility = require("../models/Facibility");
const { uploadToAzureBlob } = require("../services/azureBlobService");


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
            const files = req.files;

            if (!files || files.length === 0) {
                return res.status(400).json({ message: "Image is required" });
            }

            let paths = [];
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
     
                const path = await uploadToAzureBlob("facibilities", file);
                paths.push(path);
            }


            var facibility = new Facibility({
                ...data,
                images: paths
            });
            await facibility.save();
            return res.json({ id: facibility._id });
        } catch (error) {
            console.log(`Error creating facibility req.body:`, error);
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