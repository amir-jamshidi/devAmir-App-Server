import path from 'path'
import multer from 'multer'


import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default multer.diskStorage({
    destination: (req, res, cb) => {
        cb(null, path.join(__dirname, '..', 'public', 'courses', 'covers'))
    },
    filename: (req, file, cb) => {
        const filename = Date.now() + String(Math.floor(Math.random() * 100000))
        const ext = path.extname(file.originalname);
        cb(null, filename + ext)
    }
})

