import { Link } from "react-router-dom";

function CycleCard({ cycle }) {
  return (
    <div className="group overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl">

      <Link to={`/cycles/${cycle._id}`}>
        <div className="h-56 overflow-hidden bg-[var(--color-bg)]">
          <img
            src={`${import.meta.env.VITE_API_URL.replace("/api", "")}/uploads/${cycle.image}`}
            alt={cycle.name}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        </div>
      </Link>

      <div className="p-5">

        <p className="mb-2 text-sm font-medium text-[var(--color-primary)]">
          {cycle.category}
        </p>

        <Link to={`/cycles/${cycle._id}`}>
          <h2 className="line-clamp-1 text-xl font-bold text-[var(--color-dark-blue)]">
            {cycle.name}
          </h2>
        </Link>

        <p className="mt-1 text-sm text-[var(--color-text)]">
          Brand: {cycle.brand}
        </p>

        <div className="mt-5 flex items-center justify-between">

          <p className="text-xl font-bold text-[var(--color-primary)]">
            ₹{cycle.price?.toLocaleString("en-IN")}
          </p>

          <Link
            to={`/cycles/${cycle._id}`}
            className="rounded-full bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-white hover:bg-[var(--color-dark-blue)]"
          >
            View Details
          </Link>

        </div>

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
// update code for CycleCard.jsx

// update code for CycleCard.jsx
