import { userModel } from "../../models/user.model.js";
export const updateProfile = async (req, res) => {
  let id = req.user.id;
  let { name, password, shareProfileName, oldPassword } = req.body;
  let user = await userModel.findById(id);
  let updatedObject = {};
  name ? (updatedObject.name = name) : null;
  shareProfileName ? (updatedObject.shareProfileName = shareProfileName) : null;
  if (password) {
    let oldPasswordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!oldPasswordMatch) {
      return res.status(400).json({ message: "Old password does not match" });
    }
    let hashedPassword = await bcrypt.hash(password, 10);
    updatedObject.password = hashedPassword;
  }

  await userModel.findByIdAndUpdate(id, updatedObject, { new: true });
  return res.status(200).json({ message: "Profile updated successfully" });
};
export const getProfile = async (req, res) => {
  let id = req.user.id;
  console.log(id);
  let user = await userModel.findById({ _id: id });
  return res.status(200).json({ message: "Your Profile", user });
};

export const deleteUser = async (req, res) => {
  let id = req.user.id;
  let deletedUser = await userModel.findByIdAndDelete(id);
  if (!deletedUser) {
    return res.status(400).json({ message: "User not found" });
  }
  return res.status(200).json({ message: "User deleted successfully" });
};

export const generateUrl = async (req, res) => {
  let id = req.user.id;
  let user = await userModel.findById(id);
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }
  let profileUrl = `http://localhost:3000/user/${user.shareProfileName}`;
  return res.status(200).json({ message: "Profile url", profileUrl });
};

export const getUserData = async (req, res) => {
  let { url } = req.body;
  let data = url.split("/")[4];
  let userData = await userModel
    .findOne({ shareProfileName: data })
    .select("-password -__v -role");
  if (!userData) {
    return res.status(400).json({ message: "User not found" });
  }
  return res.status(200).json({ message: "User data", userData });
};
