import { get, upload, getAll } from "../services/firebase.service.js";
export const index = async (req, res) => {
    try {
        res.status(200).json({
            status: true,
            url: getAll("images")
        });
    }
    catch (err) {
        res.status(err.code || 500).json({
            status: false,
            message: err.message
        });
    }
};
export const show = async (req, res) => {
    try {
        if (!req.params.id)
            throw { code: 400, message: 'Id is missing or undefined' };
        const fileName = `product_${req.params.id}.png`;
        res.status(200).json({
            status: true,
            data: {
                name: fileName,
                url: (await get(fileName, "images"))[0]
            }
        });
    }
    catch (err) {
        res.status(err.code || 500).json({
            status: false,
            message: err.message
        });
    }
};
export const create = async (req, res) => {
    try {
        if (!(req.file && req.params.id))
            throw { code: 400, message: "File or id is missing!!" };
        const image = req.file;
        image.originalname = `product_${req.params.id}.png`;
        image.mimetype = "image/png";
        upload(image, "images");
        res.status(200).json({
            status: true,
            data: {
                name: image.originalname,
                url: (await get(image.originalname, "images"))[0]
            }
        });
    }
    catch (err) {
        res.status(err.code || 500).json({
            status: false,
            message: err.message
        });
    }
};
//# sourceMappingURL=image.controller.js.map