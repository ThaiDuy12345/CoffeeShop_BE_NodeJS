import { upload, get, getAll, resetBanner } from "../services/firebase.service.js";
export const index = async (req, res) => {
    try {
        res.status(200).json({
            status: true,
            data: await getAll("banners")
        });
    }
    catch (err) {
        res.status(err.code || 500).json({
            status: err.code || 500,
            message: err.message
        });
    }
};
export const show = async (req, res) => {
    try {
        if (!["main", "pop_up"].includes(req.params.type))
            throw { code: 400, message: 'Banner type is missing or undefined' };
        const fileName = req.params.type === "main" ? "bannerMain" : "bannerPopUp";
        const result = await get(fileName, "banners");
        res.status(200).json({
            status: true,
            data: {
                name: fileName,
                url: result ? result[0] : null
            }
        });
    }
    catch (err) {
        res.status(err.code || 500).json({
            status: false,
            messsage: err.message
        });
    }
};
export const reset = async (req, res) => {
    try {
        if (!["main", "pop_up"].includes(req.params.type))
            throw { code: 400, message: 'Banner type is missing or undefined' };
        const fileName = req.params.type === "main" ? "bannerMain" : "bannerPopUp";
        await resetBanner(fileName);
        const result = await get(fileName, "banners");
        res.status(200).json({
            status: true,
            data: {
                name: fileName,
                url: result ? result[0] : null
            }
        });
    }
    catch (err) {
        res.status(err.code || 500).json({
            status: false,
            messsage: err.message
        });
    }
};
export const create = async (req, res) => {
    try {
        if (!(req.params.type && req.file))
            throw { code: 400, message: "Type or file is missing" };
        const image = req.file;
        image.originalname = req.params.type === "main" ? "bannerMain" : "bannerPopUp";
        image.mimetype = "image/png";
        await upload(image, "banners");
        const result = await get(image.originalname, "banners");
        res.status(200).json({
            status: true,
            data: {
                name: image.originalname,
                url: result ? result[0] : null
            }
        });
    }
    catch (err) {
        res.status(err.code || 500).json({
            status: false,
            messsage: err.message
        });
    }
};
//# sourceMappingURL=banner.controller.js.map