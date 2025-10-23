const express = require("express");
const database = require("./src/database/db.config");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use("/upload", express.static(path.join(__dirname, "upload")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connexion à la base de données
database.mongoose
  .connect(database.url, {})
  .then(() => console.log("Connected to database"))
  .catch((err) => console.error(err));

// Route de test
app.get("/", (req, res) => {
  res.send({ message: "Hello, World!" });
});

// Importation des routes existantes
const routes = require("./src/api/routes/routes");
app.use("/api", routes); // Préfixe /api pour toutes les routes

// **Importation de la route de réservation**
const reservationRoutes = require("./src/api/routes/reservationRoutes");
app.use("/api/reservations", reservationRoutes); // Préfixe /api/reservations

const userRoutes = require("./src/api/routes/userRoutes");
app.use("/api/users", userRoutes);

const loginRoutes = require("./src/api/routes/loginRoutes");
app.use("/api/login", loginRoutes);


// Lancement du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Listening on port", PORT);
});
