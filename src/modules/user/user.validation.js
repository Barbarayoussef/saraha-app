import joi from "joi";

export const updateSchema = joi.object({
  name: joi.string().optional().min(2),
  shareProfileName: joi.string().optional().min(10),
  password: joi
    .string()
    .optional()
    .pattern(
      new RegExp(
        "/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/",
      ),
    ),
  oldPassword: joi
    .string()
    .optional()
    .pattern(
      new RegExp(
        "/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/",
      ),
    ),
});
