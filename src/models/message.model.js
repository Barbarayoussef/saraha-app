import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  receiverId: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "user",
  },
  content: {
    type: String,
    required: true,
  },
  image: {
    type: [String],
  },
});

export const messageModel = mongoose.model("message", messageSchema);
