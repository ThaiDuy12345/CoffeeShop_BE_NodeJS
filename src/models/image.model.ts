import mongoose from 'mongoose';

const ImageModel = mongoose.model('Image', 
  new mongoose.Schema({
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      default: new mongoose.Types.ObjectId(),
      auto: true
    },
    url: {
      type: String
    }
  }), 'Image'
);

export default ImageModel