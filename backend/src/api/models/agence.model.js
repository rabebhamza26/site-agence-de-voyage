module.exports = (mongoose) => {
  const Schema = mongoose.Schema;

  const AgenceSchema = new Schema(
    {
      nomAgence: { type: String, required: true },
      adresse: { type: String, required: true },
      offre: { type: String, required: true },
      description: { type: String },
      prix: { type: Number, required: true },
      image: { type: String },
      disponible: { type: Boolean, default: true },
    },
    { timestamps: true }
  );

  AgenceSchema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  return mongoose.model("Agence", AgenceSchema);
};
