const User = require("../models/user.model"); // fonctionne correctement

// ➤ Création d'un nouvel utilisateur (faite par l'admin)
exports.create = (req, res) => {
  const { nom, prenom, email, telephone, username, password } = req.body;
  if (!nom || !prenom || !email || !telephone || !username || !password) {
    return res.status(400).send({ message: "Tous les champs sont requis" });
  }

  const newUser = new User({
    nom,
    prenom,
    email,
    telephone,
    username,
    password,
  });

  newUser
    .save()
    .then(() =>
      res.status(200).send({ message: "Utilisateur créé avec succès" })
    )
    .catch((err) => res.status(500).send({ message: err.message }));
};

// ➤ Récupérer tous les utilisateurs
exports.findAll = (req, res) => {
  User.find({})
    .then((data) => res.send(data))
    .catch((err) => res.status(500).send({ message: err.message }));
};

// ➤ Supprimer un utilisateur
exports.delete = (req, res) => {
  const id = req.params.id;
  if (!id) return res.status(400).send({ message: "ID requis" });

  User.findByIdAndDelete(id)
    .then((data) => {
      if (!data)
        return res.status(404).send({ message: "Utilisateur non trouvé" });
      res.status(200).send({ message: "Utilisateur supprimé avec succès" });
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};

// ➤ Récupérer un utilisateur par ID
exports.findOne = (req, res) => {
  const id = req.params.id;
  if (!id) return res.status(400).send({ message: "ID requis" });

  User.findById(id)
    .then((data) => res.send(data))
    .catch((err) => res.status(500).send({ message: err.message }));
};

// ➤ Mettre à jour un utilisateur
exports.update = (req, res) => {
  const id = req.params.id;
  const { nom, prenom, email, telephone, username, password } = req.body;
  if (!id || !nom || !prenom || !email || !telephone || !username || !password)
    return res.status(400).send({ message: "Tous les champs sont requis" });

  User.findByIdAndUpdate(
    id,
    { nom, prenom, email, telephone, username, password },
    { new: true }
  )
    .then((data) => {
      if (!data)
        return res.status(404).send({ message: "Utilisateur non trouvé" });
      res.status(200).send({ message: "Utilisateur mis à jour avec succès" });
    })
    .catch((err) => res.status(500).send({ message: err.message }));
};
