const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  nomClient: { type: String, required: true },
  email: { type: String, required: true },
  nomAgence: { type: String, required: true }, // tu peux remplacer par agenceId si tu veux lier avec une collection Agence
  numeroTelephone: { type: String, required: true },

  // Nouvelle gestion des plages
  dateDebutReservation: { type: Date, required: true },
  dateFinReservation: { type: Date, required: true },
  heureDebutReservation: { type: String, required: true },
  heureFinReservation: { type: String, required: true },

  statut: { type: String, default: "En attente" }, // En attente / Confirmée / Annulée
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Reservation", reservationSchema);
