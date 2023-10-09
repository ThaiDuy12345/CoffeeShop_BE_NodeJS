import express from 'express';
import * as bannerController from '../controllers/banner.controller.js'
const routes = express.Router();

routes.get("/", bannerController.index)
routes.get("/:id", bannerController.show)
routes.put("/:id", bannerController.update)
// routes.post("/", bannerController.create)

export default routes