import mongoose from "mongoose";

const NotificationModel = mongoose.model("Notification", new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: new mongoose.Types.ObjectId()
  },
  content: String,
  link: String,
  to_user_id: String,
  have_read: Boolean
}), "Notification")

export default NotificationModel