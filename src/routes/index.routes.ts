import express from 'express';
import imageRoutes from './image.routes.js'
const routes = express.Router();

routes.use("/image", imageRoutes)
routes.get("/", (req, res) => {
  res.json({
    status: 200,
    message: "API is working"
  })
})

export default routes