const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../config/cloudinary.js');

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'candidate_images',
    format: async (req, file) => 'jpg'
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
