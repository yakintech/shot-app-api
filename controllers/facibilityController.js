const Facibility = require("../models/Facibility");
const { uploadToAzureBlob } = require("../services/azureBlobService");

const facibilityController = {
  getAll: async (req, res) => {
    try {
      const data = await Facibility.find({ isDeleted: false }).populate("city");
      return res.json(data);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  getOne: async (req, res) => {
    try {
      const id = req.params.id;
      const data = await Facibility.findOne({
        _id: id,
        isDeleted: false,
      }).populate("city");
      return res.json(data);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  create: async (req, res) => {
    try {
      const data = req.body;
      const files = req.files;

      if (!files || files.length === 0) {
        return res.status(400).json({ message: "Image is required" });
      }

      const paths = [];
      for (const file of files) {
        const path = await uploadToAzureBlob("facibilities", file);
        paths.push(path);
      }

      const facibility = new Facibility({
        ...data,
        images: paths,
      });
      await facibility.save();
      return res.json({ id: facibility._id });
    } catch (error) {
      console.error("Error creating facibility req.body:", error);
      return res.status(500).json({ message: error.message });
    }
  },
  update: async (req, res) => {
    try {
      const id = req.params.id;
      const data = req.body;
      await Facibility.findByIdAndUpdate(id, data);
      return res.json({ id });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  delete: async (req, res) => {
    try {
      const id = req.params.id;
      await Facibility.findByIdAndUpdate(id, { isDeleted: true });
      return res.json({ id });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  },
  toggleFollowFacibility: async (req, res) => {
    const { id } = req.params;
    const { userId, action } = req.body;

    try {
      const facibility = await Facibility.findById(id);

      if (!facibility) {
        return res.status(404).json({ message: "Facibility not found" });
      }

      if (action) {
        if (facibility.followedBy.includes(userId)) {
          return res
            .status(400)
            .json({ message: "User already following this facibility" });
        }

        facibility.followedBy.push(userId);
      } else if (!action) {
        if (!facibility.followedBy.includes(userId)) {
          return res
            .status(400)
            .json({ message: "User is not following this facibility" });
        }

        facibility.followedBy = facibility.followedBy.filter(
          (id) => id !== userId
        );
      }

      facibility.followedCount = facibility.followedBy.length;

      await facibility.save();

      return res.status(200).json({
        message: `Facibility ${
          action ? "followed" : "unfollowed"
        } successfully`,
        facibility,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "An error occurred", error });
    }
  },

  getFollowedFacibilities: async (req, res) => {
    const { userId } = req.body;
    try {
      const followedFacilities = await Facibility.find({
        followedBy: userId,
        isDeleted: false,
      }).populate("city");

      return res.status(200).json(followedFacilities);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "An error occurred", error });
    }
  },
};

module.exports = facibilityController;
