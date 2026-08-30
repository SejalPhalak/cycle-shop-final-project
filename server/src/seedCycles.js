import mongoose from "mongoose";
import dotenv from "dotenv";
import Cycle from "./models/Cycle.js";

dotenv.config();

const cycles = [
  // =========================
  // MOUNTAIN BIKES
  // =========================

  {
    name: "Mountain Explorer 29",
    description:
      "A strong mountain bike designed for trails, rough roads and outdoor adventures.",
    price: 24999,
    image: "mountain-bike.png",
    category: "Mountain",
    stock: 15,
    brand: "Rockrider",
  },

  {
    name: "Trail Master Pro",
    description:
      "A durable mountain cycle with comfortable handling for challenging trails.",
    price: 28999,
    image: "gravel-bike-adventure.png",
    category: "Mountain",
    stock: 12,
    brand: "Firefox",
  },

  {
    name: "Mountain Rider X",
    description:
      "A reliable mountain bike built for weekend adventures and off-road riding.",
    price: 21999,
    image: "performance-road-bike.jpg",
    category: "Mountain",
    stock: 18,
    brand: "Hero",
  },

  {
    name: "Adventure MTB 500",
    description:
      "A performance-focused mountain bike suitable for trails and adventure rides.",
    price: 31999,
    image: "mountain-bike.png",
    category: "Mountain",
    stock: 10,
    brand: "Giant",
  },


  // =========================
  // ROAD BIKES
  // =========================

  {
    name: "Speed Road 700",
    description:
      "A lightweight road cycle designed for fast and smooth rides on city roads.",
    price: 29999,
    image: "performance-road-bike.jpg",
    category: "Road",
    stock: 14,
    brand: "Trek",
  },

  {
    name: "Road Racer Pro",
    description:
      "A fast road bike designed for riders who enjoy speed and long-distance rides.",
    price: 35999,
    image: "modern-e-bike.jpg",
    category: "Road",
    stock: 9,
    brand: "Scott",
  },

  {
    name: "Velocity 700C",
    description:
      "A comfortable and efficient road bike for everyday fitness and long rides.",
    price: 27999,
    image: "performance-road-bike.jpg",
    category: "Road",
    stock: 16,
    brand: "Giant",
  },

  {
    name: "Road Sprint X",
    description:
      "A stylish road cycle with smooth performance for fitness and professional riding.",
    price: 38999,
    image: "city-bike.jpg",
    category: "Road",
    stock: 8,
    brand: "Firefox",
  },


  // =========================
  // HYBRID BIKES
  // =========================

  {
    name: "Urban Hybrid 500",
    description:
      "A versatile hybrid cycle perfect for city commuting, fitness and daily rides.",
    price: 19999,
    image: "urban-commute.jpg",
    category: "Hybrid",
    stock: 20,
    brand: "Hero",
  },

  {
    name: "City Hybrid Pro",
    description:
      "A comfortable hybrid bicycle made for smooth daily commuting and leisure rides.",
    price: 22999,
    image: "city-bike.jpg",
    category: "Hybrid",
    stock: 17,
    brand: "Firefox",
  },

  {
    name: "Comfort Hybrid X",
    description:
      "A practical hybrid bike offering comfort and control for everyday journeys.",
    price: 24999,
    image: "urban-commute.jpg",
    category: "Hybrid",
    stock: 13,
    brand: "Trek",
  },

  {
    name: "Hybrid Explorer",
    description:
      "A flexible hybrid cycle suitable for city roads, parks and weekend rides.",
    price: 26999,
    image: "family-cycle-fun.jpg",
    category: "Hybrid",
    stock: 11,
    brand: "Giant",
  },


  // =========================
  // ELECTRIC BIKES
  // =========================

  {
    name: "Electric Ride 500",
    description:
      "A modern electric bicycle designed for comfortable and effortless city commuting.",
    price: 44999,
    image: "modern-e-bike.jpg",
    category: "Electric",
    stock: 10,
    brand: "Hero",
  },

  {
    name: "E-Bike Urban Pro",
    description:
      "A stylish electric cycle designed for efficient everyday transportation.",
    price: 49999,
    image: "modern-e-bike.jpg",
    category: "Electric",
    stock: 8,
    brand: "Firefox",
  },

  {
    name: "Electric Cruiser X",
    description:
      "A comfortable electric bicycle with smooth riding performance for city travel.",
    price: 52999,
    image: "modern-e-bike.jpg",
    category: "Electric",
    stock: 7,
    brand: "Trek",
  },

  {
    name: "E-Motion 700",
    description:
      "A premium electric bike built for comfortable commuting and longer rides.",
    price: 59999,
    image: "modern-e-bike.jpg",
    category: "Electric",
    stock: 6,
    brand: "Giant",
  },
];


const seedCycles = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);

    console.log("MongoDB connected");

    await Cycle.deleteMany({});

    console.log("Old cycles removed");

    const createdCycles = await Cycle.insertMany(cycles);

    console.log(
      `${createdCycles.length} cycles inserted successfully`
    );

    console.log("Mountain: 4");
    console.log("Road: 4");
    console.log("Hybrid: 4");
    console.log("Electric: 4");

    await mongoose.connection.close();

    console.log("Database connection closed");

    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error.message);

    await mongoose.connection.close();

    process.exit(1);
  }
};


seedCycles();