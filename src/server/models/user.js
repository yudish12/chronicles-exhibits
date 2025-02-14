import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  token: { type: String, default: null },
  tokenExpiry : {type: Date , default : null},
  isAdmin: { type: Boolean, default: false },
  isHidden: { type: Boolean, default:false }
});

const User = mongoose.models.User || mongoose.model("User", UserSchema);

// Prefill admin user when the model is first loaded
// const seedAdmin = async () => {
//   const existingAdmin = await User.findOne({ email: "admin@chronicleexhibits.com" });

//   if (!existingAdmin) {
//     await User.create({
//       email: "admin@chronicleexhibits.com",
//       password: "Chronicle@22",
//       isAdmin: true,
//     });
//     console.log("Admin user created successfully!");
//   }
// };

// seedAdmin().catch((err) => console.error("Error seeding admin user:", err));

export default User;
