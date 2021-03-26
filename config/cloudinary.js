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

// const fileRouter = (req, res, cb) => {
//   if (
//     file.mimetype === "image/jpg" ||
//     file.mimetype === "image/png" ||
//     file.mimetype === "image/gif" ||
//     file.mimetype === "image/tiff" ||
//     file.mimetype === "image/bmp" ||
//     file.mimetype === "image/webp" ||
//     file.mimetype === "image/jfif"
//   ) {
//     // Todo: identify it as avatar image
//   } else if (
//     file.mimetype === "application/msword" ||
//     file.mimetype ===
//       "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
//     file.mimetype === "application/vnd.oasis.opendocument.text" ||
//     file.mimetype === "application/rtf" ||
//     file.mimetype === "application/pdf" ||
//     file.mimetype === "text/plain"
//   ) {
//     // Todo: identify as resume file
//   } else {
//     cb({ message: "Format de fichier non supporté" }, false);
//   }
// };

const fileUploader = multer({
  storage,
  limits: { filesize: 2048 * 2048 },
  // fileRouter,
}); /* Size limit of 2MB */
// Middleware designed to parse file from requests and associate to req.file
module.exports = fileUploader;
