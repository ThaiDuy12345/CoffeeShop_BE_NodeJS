import express from 'express';
import imageRoutes from './image.routes.js';
import bannerRoutes from './banner.routes.js';
const routes = express.Router();
routes.use("/image", imageRoutes);
routes.use("/banner", bannerRoutes);
routes.get("/", (req, res) => {
    res.status(200).json({
        status: 200,
        message: "API is working"
    });
});
export default routes;
//# sourceMappingURL=index.routes.js.map