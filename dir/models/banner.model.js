import mongoose from "mongoose";
const BannerModel = mongoose.model('Banner', new mongoose.Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        default: new mongoose.Types.ObjectId()
    },
    type: {
        type: String,
        enum: ['main', 'pop_up']
    },
    image: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image'
    }
}), 'Banner');
export default BannerModel;
//# sourceMappingURL=banner.model.js.map