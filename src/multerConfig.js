import { AppError } from './utils/AppError.js';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (request, file, callback) => {// dizer para o multer onde salvar o arquivo
    callback(null, path.resolve(__dirname, 'uploads'));// o primeiro parâmetro de todo callback no multer indica erro a retonar
  },
  filename: (request, file, callback) => {// configuração de qual nome dar para o arquivo a ser salvo
    const time = new Date().getTime();

    callback(null, `${time}_${file.originalname}`);
  },
});

export { storage }