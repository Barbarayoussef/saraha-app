import joi from "joi";

export const messageSchema = joi.object({
  receiverId: joi.string().required(),
  content: joi.string().required(),
  image: joi.string().optional(),
});
