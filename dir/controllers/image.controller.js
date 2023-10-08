import ImageModel from "../models/image.model.js";
export const index = async (req, res) => {
    const images = await ImageModel.find();
    res.json({
        status: res.statusCode,
        data: images
    });
};
export const show = async (req, res) => {
    try {
        const id = req.params.id;
        const images = await ImageModel.findById(id);
        res.json({
            status: res.statusCode,
            data: images
        });
    }
    catch (err) {
        res.json({
            status: 400,
            message: err.message
        });
    }
};
export const destroy = async (req, res) => {
};
export const create = async (req, res) => {
    try {
    }
    catch (err) {
        res.json({
            status: 400,
            message: err.message
        });
    }
};
//# sourceMappingURL=image.controller.js.map