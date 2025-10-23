const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../models/user.model"); // modèle User (MongoDB)
const SECRET_KEY = process.env.JWT_SECRET || "monsecret123";

// Route de login
router.post("/", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Chercher l’utilisateur dans MongoDB
    const user = await User.findOne({ username, password }); 
    // ⚠️ Ici tu stockes en clair, mieux vaut hasher avec bcrypt (je peux te l’ajouter si tu veux)

    if (!user) {
      return res.status(401).json({ message: "Identifiants invalides" });
    }

    // Création du token JWT
    const token = jwt.sign(
      { id: user._id, username: user.username },
      SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
});

module.exports = router;
