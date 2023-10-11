import ImageModel from "../models/image.model.js";
export const index = async (req, res) => {
    const images = (await ImageModel.find()).map(image => image._id);
    res.status(200).json({
        status: 200,
        data: images
    });
};
export const show = async (req, res) => {
    try {
        const id = req.params.id;
        const image = await ImageModel.findById(id);
        if (!image)
            throw { code: 404, message: `${id} not found!!` };
        res.send(`<img style="width: 90vw;" src='data:image/png;base64,${image.url}'>`);
    }
    catch (err) {
        res.status(err.code || 500).json({
            status: err.code || 500,
            message: err.message
        });
    }
};
export const destroy = async (req, res) => {
    try {
        if (['6526ac20a0ba131d9425a158', '6526afd16f619f69e8389e92'].includes(req.params.id)) {
            throw { code: 400, message: "Cannot delete the default values" };
        }
        await ImageModel.deleteOne({ _id: req.params.id });
        res.status(200).json({
            status: 200,
            message: "Successfully deleted",
        });
    }
    catch (err) {
        res.status(err.code).json({
            status: err.code,
            message: err.message,
        });
    }
};
export const create = async (req, res) => {
    try {
        if (!(req.file))
            throw { code: 400, message: "File is missing!!" };
        const base64 = req.file.buffer.toString('base64');
        const image = await new ImageModel({
            url: base64
        }).save();
        res.status(200).json({
            status: 200,
            data: image,
        });
    }
    catch (err) {
        res.status(err.code || 500).json({
            status: err.code || 500,
            message: err.message
        });
    }
};
//# sourceMappingURL=image.controller.js.map