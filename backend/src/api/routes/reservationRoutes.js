const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservationController");

// Créer une réservation
router.post("/", reservationController.createReservation);

// Obtenir toutes les réservations
router.get("/", reservationController.getAllReservations);

// Supprimer une réservation
router.delete("/:id", reservationController.deleteReservation);

// Mettre à jour le statut d'une réservation
router.put("/:id/status", reservationController.updateReservationStatus);

router.get("/agences", reservationController.getAgences);

// ✅ Modifier une réservation (client)
router.put("/:id", reservationController.updateReservation);

module.exports = router;
