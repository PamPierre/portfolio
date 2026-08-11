import mongoose from "mongoose";

/**
 * Établit la connexion à MongoDB via Mongoose.
 * Le process s'arrête si la connexion échoue afin d'éviter
 * de démarrer une API sans base de données fonctionnelle.
 */
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB connecté : ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ Erreur de connexion MongoDB : ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
