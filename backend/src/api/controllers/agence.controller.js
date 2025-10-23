const db = require("../../database/db.config");
const Agence = db.Agence;

// Créer une agence
exports.create = async (req, res) => {
  try {
    const { nomAgence, adresse, offre, description, prix } = req.body;
    const image = req.file ? req.file.filename : "";

    if (!nomAgence || !adresse || !offre || !prix) {
      return res.status(400).json({
        message:
          "Les champs obligatoires (nomAgence, adresse, offre, prix) sont requis.",
      });
    }

    const newAgence = new Agence({
      nomAgence,
      adresse,
      offre,
      description: description || "",
      prix,
      image,
      disponible: true,
    });

    const saved = await newAgence.save();

    res.status(201).json({
      message: "Agence créée avec succès",
      data: saved,
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la création de l'agence",
      error: error.message,
    });
  }
};

// Récupérer toutes les agences
exports.findAll = (req, res) => {
  Agence.find({})
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Erreur lors de la récupération des agences",
      });
    });
};

// Supprimer une agence
exports.delete = (req, res) => {
  const id = req.params.id;
  if (!id) {
    return res.status(400).send({ message: "L'ID est requis" });
  }

  Agence.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        return res.status(404).send({ message: "Agence non trouvée" });
      }
      res.status(200).send({ message: "Agence supprimée avec succès" });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Erreur lors de la suppression de l'agence avec l'ID " + id,
      });
    });
};

// Récupérer une agence par ID
exports.findOne = (req, res) => {
  const id = req.params.id;

  Agence.findById(id)
    .then((data) => {
      if (!data) {
        return res
          .status(404)
          .send({ message: "Agence non trouvée avec l'ID " + id });
      }
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Erreur lors de la récupération de l'agence avec l'ID " + id,
      });
    });
};

// Mettre à jour une agence
// Mettre à jour une agence avec image
exports.update = async (req, res) => {
  const id = req.params.id;
  const { nomAgence, adresse, offre, description, prix } = req.body;
  const image = req.file ? req.file.filename : undefined;

  try {
    const updateData = { nomAgence, adresse, offre, description, prix };
    if (image) updateData.image = image;

    const updated = await Agence.findByIdAndUpdate(id, updateData, { new: true });

    if (!updated) {
      return res.status(404).send({ message: `Agence avec ID=${id} non trouvée.` });
    }

    res.status(200).json({ message: "Agence mise à jour avec succès", data: updated });
  } catch (err) {
    res.status(500).send({ message: "Erreur lors de la mise à jour", error: err.message });
  }
};

