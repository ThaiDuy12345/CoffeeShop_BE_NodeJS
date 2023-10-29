import express from 'express';
import multer from 'multer';
import * as imageController from '../controllers/image.controller.js'
const routes = express.Router();

// Sử dụng multer để xử lý upload file
const storage = multer.memoryStorage();
const upload = multer({ storage });

routes.get("/", imageController.index)
routes.get("/:id", imageController.show)
routes.post("/:id", upload.single('file'), imageController.create)

export default routes