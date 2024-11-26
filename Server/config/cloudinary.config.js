// the following 3 packages are needed in order for cloudinary to run
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary,
  folder: "marketImages", // The name of the folder in cloudinary . You can name this whatever you want
  allowedFormats: ["jpg", "png"],
  filename: function (req, res, cb) {
    cb(null, res.originalname);
  },
});

module.exports = multer({ storage });
