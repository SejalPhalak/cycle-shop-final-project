import mongoose from "mongoose";

const favouriteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    cycles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cycle",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Favourite = mongoose.model("Favourite", favouriteSchema);

export default Favourite;