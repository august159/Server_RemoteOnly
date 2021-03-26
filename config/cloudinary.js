const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

// Cloudinary credentials through .env
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

// Setting the Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "remote-only",
  },
});

const fileUploader = multer({
  storage,
  limits: { filesize: 2048 * 2048 },
}); /* Size limit of 2MB */
// Middleware designed to parse file from requests and associate to req.file
module.exports = fileUploader;
