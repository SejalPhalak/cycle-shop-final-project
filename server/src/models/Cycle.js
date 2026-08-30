import mongoose from "mongoose";

const cycleSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },

    description: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
    },

    price: {
      type: Number,
      required: true,
      min: 1,
    },

    image: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
    },

    category: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },

    stock: {
      type: Number,
      required: true,
      min: 0,
      max: 10000,
      default: 0,
    },

    brand: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },
  },
  {
    timestamps: true,
  }
);

const Cycle = mongoose.model("Cycle", cycleSchema);

export default Cycle;