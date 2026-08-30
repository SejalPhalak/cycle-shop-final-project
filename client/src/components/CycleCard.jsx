import { Link } from "react-router-dom";

import accessories from "../assets/images/accessories.jpg";
import cityBike from "../assets/images/city-bike.jpg";
import cityClassic from "../assets/images/city-classic-step-through.jpg";
import cityFolding from "../assets/images/city-folding-commuter.jpg";
import citySport from "../assets/images/city-sport-hybrid.jpg";
import cityUrban from "../assets/images/city-urban-utility.jpg";

import electricFolding from "../assets/images/electric-folding-e-bike.jpg";
import electricMountain from "../assets/images/electric-mountain-pro.jpg";
import electricUrban from "../assets/images/electric-urban-commuter.jpg";

import familyCycle from "../assets/images/family-cycle-fun.jpg";
import gravelAdventure from "../assets/images/gravel-bike-adventure.png";

import kidsBike from "../assets/images/kids-bike-fun.jpg";
import kidsCollection from "../assets/images/kids-bike-collection.jpg";

import modernEBike from "../assets/images/modern-e-bike.jpg";

import mountainBike from "../assets/images/mountain-bike.png";
import mountainDownhill from "../assets/images/mountain-downhill.jpg";
import mountainEntry from "../assets/images/mountain-entry-budget.jpg";
import mountainPro from "../assets/images/mountain-pro-trails.jpg";
import mountainXC from "../assets/images/mountain-xc-hardtail.jpg";

import carbonRace from "../assets/images/performance-carbon-race.jpg";
import classicSteel from "../assets/images/performance-classic-steel.jpg";
import enduranceRoad from "../assets/images/performance-endurance-road.jpg";
import roadBike from "../assets/images/performance-road-bike.jpg";

import repairService from "../assets/images/repair-service.jpg";
import storefront from "../assets/images/storefront-view.jpg";

import urbanCommute from "../assets/images/urban-commute.jpg";
import urbanCommute1 from "../assets/images/urban-commute1.jpg";


/*
|--------------------------------------------------------------------------
| Cycle Image Map
|--------------------------------------------------------------------------
| MongoDB stores only the image filename.
| This map connects that filename with the actual frontend image.
|--------------------------------------------------------------------------
*/

const cycleImages = {
  "accessories.jpg": accessories,

  "city-bike.jpg": cityBike,
  "city-classic-step-through.jpg": cityClassic,
  "city-folding-commuter.jpg": cityFolding,
  "city-sport-hybrid.jpg": citySport,
  "city-urban-utility.jpg": cityUrban,

  "electric-folding-e-bike.jpg": electricFolding,
  "electric-mountain-pro.jpg": electricMountain,
  "electric-urban-commuter.jpg": electricUrban,

  "family-cycle-fun.jpg": familyCycle,
  "gravel-bike-adventure.png": gravelAdventure,

  "kids-bike-fun.jpg": kidsBike,
  "kids-bike-collection.jpg": kidsCollection,

  "modern-e-bike.jpg": modernEBike,

  "mountain-bike.png": mountainBike,
  "mountain-downhill.jpg": mountainDownhill,
  "mountain-entry-budget.jpg": mountainEntry,
  "mountain-pro-trails.jpg": mountainPro,
  "mountain-xc-hardtail.jpg": mountainXC,

  "performance-carbon-race.jpg": carbonRace,
  "performance-classic-steel.jpg": classicSteel,
  "performance-endurance-road.jpg": enduranceRoad,
  "performance-road-bike.jpg": roadBike,

  "repair-service.jpg": repairService,
  "storefront-view.jpg": storefront,

  "urban-commute.jpg": urbanCommute,
  "urban-commute1.jpg": urbanCommute1,
};


/*
|--------------------------------------------------------------------------
| Cycle Card Component
|--------------------------------------------------------------------------
*/

function CycleCard({ cycle }) {

  // Get the correct frontend image
  const cycleImage = cycleImages[cycle.image];


  return (
    <div className="group overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Cycle image */}
      <Link to={`/cycles/${cycle._id}`}>

        <div className="h-56 overflow-hidden bg-[var(--color-bg)]">

          {cycleImage ? (
            <img
              src={cycleImage}
              alt={cycle.name}
              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-gray-400">
              Image not available
            </div>
          )}

        </div>

      </Link>


      {/* Cycle information */}
      <div className="p-5">

        {/* Category */}
        <p className="mb-2 text-sm font-medium text-[var(--color-primary)]">
          {cycle.category}
        </p>


        {/* Cycle name */}
        <Link to={`/cycles/${cycle._id}`}>

          <h2 className="line-clamp-1 text-xl font-bold text-[var(--color-dark-blue)]">
            {cycle.name}
          </h2>

        </Link>


        {/* Brand */}
        <p className="mt-1 text-sm text-[var(--color-text)]">
          Brand: {cycle.brand}
        </p>


        {/* Price and details button */}
        <div className="mt-5 flex items-center justify-between">

          <p className="text-xl font-bold text-[var(--color-primary)]">
            ₹{cycle.price?.toLocaleString("en-IN")}
          </p>


          <Link
            to={`/cycles/${cycle._id}`}
            className="rounded-full bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[var(--color-dark-blue)]"
          >
            View Details
          </Link>

        </div>


        {/* Stock status */}
        <p
          className={`mt-3 text-sm font-medium ${
            cycle.stock > 0
              ? "text-green-600"
              : "text-red-500"
          }`}
        >
          {cycle.stock > 0
            ? `${cycle.stock} available`
            : "Out of stock"}
        </p>

      </div>

    </div>
  );
}


export default CycleCard;