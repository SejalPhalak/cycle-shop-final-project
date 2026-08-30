import { Link } from "react-router-dom";

function CycleCard({ cycle }) {
  // Create the complete image URL from the backend API URL
  const imageUrl = cycle?.image
    ? `${import.meta.env.VITE_API_URL.replace("/api", "")}/uploads/${cycle.image}`
    : "";

  // Check whether the cycle is currently available
  const isAvailable = Number(cycle?.stock || 0) > 0;

  // Format the cycle price in Indian currency format
  const formattedPrice =
    typeof cycle?.price === "number"
      ? cycle.price.toLocaleString("en-IN")
      : "0";

  return (
    <div className="group overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Cycle image section */}
      <Link to={`/cycles/${cycle._id}`}>
        <div className="h-56 overflow-hidden bg-[var(--color-bg)]">

          {imageUrl ? (
            <img
              src={imageUrl}
              alt={cycle?.name || "Cycle"}
              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
              onError={(event) => {
                event.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <div className="flex h-full items-center justify-center text-5xl">
              🚲
            </div>
          )}

        </div>
      </Link>


      {/* Cycle information */}
      <div className="p-5">

        {/* Category */}
        <p className="mb-2 text-sm font-semibold text-[var(--color-primary)]">
          {cycle?.category || "Cycle"}
        </p>


        {/* Cycle name */}
        <Link to={`/cycles/${cycle._id}`}>
          <h2 className="line-clamp-1 text-xl font-bold text-[var(--color-dark-blue)] transition hover:text-[var(--color-primary)]">
            {cycle?.name || "Cycle"}
          </h2>
        </Link>


        {/* Brand */}
        <p className="mt-1 text-sm text-[var(--color-text)]">
          Brand: {cycle?.brand || "N/A"}
        </p>


        {/* Price and details button */}
        <div className="mt-5 flex items-center justify-between gap-3">

          {/* Price */}
          <p className="text-xl font-bold text-[var(--color-primary)]">
            ₹{formattedPrice}
          </p>


          {/* Details button */}
          <Link
            to={`/cycles/${cycle._id}`}
            className="rounded-full bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-white transition duration-200 hover:bg-[var(--color-dark-blue)]"
          >
            View Details
          </Link>

        </div>


        {/* Stock status */}
        <p
          className={`mt-3 text-sm font-medium ${
            isAvailable
              ? "text-green-600"
              : "text-red-500"
          }`}
        >
          {isAvailable
            ? `${cycle.stock} available`
            : "Out of stock"}
        </p>

      </div>
    </div>
  );
}

export default CycleCard;