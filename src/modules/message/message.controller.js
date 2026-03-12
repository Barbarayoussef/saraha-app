import { Router } from "express";
import {
  sendMessage,
  getMessage,
  getMessageById,
  deleteMessage,
} from "./message.service.js";
import { auth } from "../../common/middleware/auth.js";
import { upload } from "../../common/middleware/multer.js";

let router = Router();
router.post("/send-message", upload().array("images"), auth, sendMessage);
router.get("/get-all-messages", auth, getMessage);
router.get("/get-message/:messageId", auth, getMessageById);
router.delete("/delete-message/:messageId", auth, deleteMessage);
export default router;
