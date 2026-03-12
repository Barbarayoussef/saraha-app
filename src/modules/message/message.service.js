import { userModel } from "../../models/user.model.js";
import { messageModel } from "../../models/message.model.js";

export const sendMessage = async (req, res) => {
  let { receiverId, content } = req.body;
  let user = await userModel.findById(receiverId);
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  let images = [];
  if (req.files.length > 0) {
    images = req.files.map(
      (file) => `http://localhost:3000/uploads/${file.filename}`,
    );
  }
  let message = await messageModel.create({
    receiverId,
    content,
    image: images,
  });
  return res
    .status(200)
    .json({ message: "Message sent successfully", message });
};

export const getMessage = async (req, res) => {
  let { id } = req.user;
  let userMessages = await messageModel.find({ receiverId: id });
  if (userMessages.length <= 0) {
    return res.status(400).json({ message: "No messages found" });
  }
  return res.status(200).json({ message: "Messages found", userMessages });
};

export const getMessageById = async (req, res) => {
  let { messageId } = req.params;
  let { id } = req.user;
  let message = await messageModel.findOne({ _id: messageId, receiverId: id });
  if (!message) {
    return res.status(400).json({ message: "Message not found" });
  }
  return res.status(200).json({ message: "Message found", message });
};

export const deleteMessage = async (req, res) => {
  let { messageId } = req.params;
  let message = await messageModel.findByIdAndDelete(messageId);
  if (!message) {
    return res.status(400).json({ message: "Message not found" });
  }
  return res.status(200).json({ message: "Message deleted successfully" });
};
