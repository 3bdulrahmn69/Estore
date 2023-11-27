import multer = require("multer");

const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const fileOptions = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/pmg") {
    cb(null, true);
  } else {
    cb(null, "file not supported");
  }
};

export const upload = multer({
  storage,
  fileFilter: fileOptions,
});
