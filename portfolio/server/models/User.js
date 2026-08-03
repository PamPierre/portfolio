import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false, // n'est jamais renvoyé par défaut dans les requêtes
    },
    role: {
      type: String,
      enum: ["admin"],
      default: "admin",
    },
    // Biographie éditable depuis le dashboard admin (section "À propos")
    bio: {
      fr: {
        type: String,
        default:
          "Ingénieur data, formateur et entrepreneur burkinabè, Djibril Pierre Clavair Pamousso est co-fondateur et gérant d'Africa Data Entry. Titulaire d'un Master « Données et Systèmes Connectés » de l'École des Mines de Saint-Étienne, il a débuté sa carrière dans le support technique avant de se spécialiser en ingénierie des données. Il a notamment occupé les fonctions de Data Engineer et de Data Science Manager chez Rocket4Sales à Lyon, où il a contribué à créer et structurer le pôle data de l'entreprise.",
      },
      en: {
        type: String,
        default:
          "A Burkinabé data engineer, trainer and entrepreneur, Djibril Pierre Clavair Pamousso is co-founder and manager of Africa Data Entry. Holder of a Master's degree in \"Data and Connected Systems\" from École des Mines de Saint-Étienne, he began his career in technical support before specializing in data engineering. He notably served as Data Engineer and Data Science Manager at Rocket4Sales in Lyon, where he helped build and structure the company's data department.",
      },
    },
  },
  { timestamps: true }
);

// Hash automatique du mot de passe avant sauvegarde
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Méthode d'instance pour comparer un mot de passe en clair au hash stocké
userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model("User", userSchema);
