import joi from "joi";

export const signupSchema = joi.object({
  email: joi.string().required().email(),
  password: joi
    .string()
    .required()
    .pattern(
      new RegExp(
        "/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/",
      ),
    ),
  name: joi.string().required().min(2),
  confirmPassword: joi
    .string()
    .required()
    .valid(joi.ref("password"))
    .pattern(
      new RegExp(
        "/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/",
      ),
    ),
  shareProfileName: joi.string().required().min(10),
  role: joi.string().optional().valid("user", "admin").default("user"),
});

export const loginSchema = joi.object({
  email: joi.string().required().email(),
  password: joi.string().required(),
});
