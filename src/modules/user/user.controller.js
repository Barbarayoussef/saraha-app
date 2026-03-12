import { Router } from "express";
import {
  getProfile,
  updateProfile,
  deleteUser,
  generateUrl,
  getUserData,
} from "./user.service.js";
import { auth } from "../../common/middleware/auth.js";
import { validation } from "../../common/utilitis/validation.js";
import { updateSchema } from "./user.validation.js";

let router = Router();
router.get("/profile", auth, getProfile);
router.put("/update", auth, validation(updateSchema), updateProfile);
router.delete("/delete", auth, deleteUser);
router.get("/get-profile-Url", auth, generateUrl);
router.get("/get-user-data", auth, getUserData);
export default router;
