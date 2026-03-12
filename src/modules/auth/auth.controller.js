import { Router } from "express";
import { signup, login, generateNewAccessToken } from "./auth.service.js";
import { auth } from "../../common/middleware/auth.js";
import { validation } from "../../common/utilitis/validation.js";
import { signupSchema, loginSchema } from "./auth.validation.js";
import { upload } from "../../common/middleware/multer.js";

let router = Router();
router.post(
  "/signup",
  validation(signupSchema),
  upload().single("image"),
  signup,
);
router.post("/login", validation(loginSchema), login);
router.post("/token", auth, generateNewAccessToken);

export default router;
