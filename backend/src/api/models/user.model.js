const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    telephone: { type: String, required: true },
    username: { type: String, required: true, unique: true }, // 🔑 login
    password: { type: String, required: true }, // ⚠️ à sécuriser avec bcrypt
  },
  { timestamps: true }
);

// Personnaliser la réponse JSON
UserSchema.method("toJSON", function () {
  const { __v, _id, password, ...object } = this.toObject();
  object.id = _id;
  return object;
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
