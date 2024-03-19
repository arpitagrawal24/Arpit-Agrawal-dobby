// imageController.js
const Image = require("../models/Image");

exports.uploadImage = async (req, res) => {
  const { name, image, userId } = req.body;

  try {
    // console.log(name, image, userId);

    const newImage = new Image({ name, image, userId });
    await newImage.save();
    res.status(201).json({ message: "Image uploaded successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getImages = async (req, res) => {
  const { userId } = req.params;

  try {
    const images = await Image.find({ userId });
    res.status(200).json({ images });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
