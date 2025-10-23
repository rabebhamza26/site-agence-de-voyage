const Reservation = require("../models/Reservation");


// Créer une réservation
exports.createReservation = async (req, res) => {
  try {
    const {
      nomClient,
      email,
      nomAgence,
      numeroTelephone,
      dateDebutReservation,
      dateFinReservation,
      heureDebutReservation,
      heureFinReservation,
    } = req.body;

    // Vérifier si l’agence est déjà réservée pour cette plage
    const existing = await Reservation.findOne({
      nomAgence,
      $or: [
        {
          dateDebutReservation: { $lte: dateFinReservation },
          dateFinReservation: { $gte: dateDebutReservation },
        },
      ],
    });

    if (existing) {
      return res.status(400).json({
        message: "Cette plage est déjà réservée pour cette agence.",
      });
    }

    const reservation = new Reservation({
      nomClient,
      email,
      nomAgence,
      numeroTelephone,
      dateDebutReservation,
      dateFinReservation,
      heureDebutReservation,
      heureFinReservation,
    });

    await reservation.save();
    res
      .status(201)
      .json({ message: "Réservation créée avec succès", reservation });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// Obtenir toutes les réservations
exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// ✅ Obtenir les réservations d’un client
exports.getReservationsByEmail = async (req, res) => {
  try {
    const { email } = req.params;
    const reservations = await Reservation.find({ email });
    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// Supprimer une réservation
exports.deleteReservation = async (req, res) => {
  try {
    const { id } = req.params;
    await Reservation.findByIdAndDelete(id);
    res.status(200).json({ message: "Réservation supprimée avec succès" });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// ✅ Modifier une réservation (client)
exports.updateReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const reservation = await Reservation.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!reservation) {
      return res.status(404).json({ message: "Réservation non trouvée" });
    }

    res.status(200).json({ message: "Réservation mise à jour", reservation });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// Mettre à jour uniquement le statut (admin)
exports.updateReservationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { statut } = req.body;

    const reservation = await Reservation.findByIdAndUpdate(
      id,
      { statut },
      { new: true }
    );

    if (!reservation) {
      return res.status(404).json({ message: "Réservation non trouvée" });
    }

    res.status(200).json({ message: "Statut mis à jour", reservation });
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// ✅ Récupérer toutes les agences
exports.getAgences = async (req, res) => {
  try {
    const agences = await Agence.find();
    res.status(200).json(agences);
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};
