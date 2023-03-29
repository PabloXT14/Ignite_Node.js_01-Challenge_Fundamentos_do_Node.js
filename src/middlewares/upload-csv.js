import { AppError } from "../utils/AppError.js";
import multer from "multer";

const csvPath = new URL('../temp', import.meta.url);

export const uploadCSV = multer({
  dest: '../temp',
  limits: {
    fileSize: 1000000 // 1000 = 1KB , 1000000 = 1MB
  },
  fileFilter: (request, file, callback) => {
    if (!file.originalname.match(/\.(csv)$/)) {
      return callback(new AppError('Only CSV files are allowed!', 404));
    }

    callback(null, true);
  }
});