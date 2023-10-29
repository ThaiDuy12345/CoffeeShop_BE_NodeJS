import express from 'express';
import * as bannerController from '../controllers/banner.controller.js';
const routes = express.Router();
import multer from 'multer';
// Sử dụng multer để xử lý upload file
const storage = multer.memoryStorage();
const upload = multer({ storage });
routes.get("/", bannerController.index);
routes.get("/:type", bannerController.show);
routes.post("/:type", upload.single('file'), bannerController.create);
routes.delete("/:type", bannerController.reset);
export default routes;
//# sourceMappingURL=banner.routes.js.map