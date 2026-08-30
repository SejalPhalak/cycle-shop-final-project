import { Link } from "react-router-dom";

function CycleCard({ cycle }) {
  const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  const SERVER_URL = API_URL.replace(/\/api\/?$/, "");

  const imageUrl = cycle?.image
    ? `${SERVER_URL}/uploads/${cycle.image}`
    : "";

  console.log("Cycle:", cycle?.name);
  console.log("Image:", cycle?.image);
  console.log("Image URL:", imageUrl);

  const isAvailable = Number(cycle?.stock || 0) > 0;

  const formattedPrice =
    typeof cycle?.price === "number"
      ? cycle.price.toLocaleString("en-IN")
      : "0";

  return (
    <div className="group overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl">

      <Link to={`/cycles/${cycle._id}`}>
        <div className="relative flex h-56 items-center justify-center overflow-hidden bg-[var(--color-bg)]">

          {imageUrl ? (
            <img
              src={imageUrl}
              alt={cycle?.name || "Cycle"}
              className="h-full w-full object-contain p-3 transition duration-300 group-hover:scale-105"
              onLoad={() => {
                console.log("IMAGE LOADED:", imageUrl);
              }}
              onError={(e) => {
                console.error("IMAGE ERROR:", imageUrl);
                e.currentTarget.style.display = "none";

                const fallback = e.currentTarget.nextElementSibling;

                if (fallback) {
                  fallback.classList.remove("hidden");
                }
              }}
            />
          ) : null}

          <div
            className={`${
              imageUrl ? "hidden" : "flex"
            } absolute inset-0 items-center justify-center text-5xl`}
          >
            🚲
          </div>

          <div className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-[var(--color-primary)] shadow-sm">
            {cycle?.category || "Cycle"}
          </div>

        </div>
      </Link>

      <div className="p-5">

        <p className="mb-2 text-sm font-semibold text-[var(--color-primary)]">
          {cycle?.category || "Cycle"}
        </p>

        <Link to={`/cycles/${cycle._id}`}>
          <h2 className="line-clamp-1 text-xl font-bold text-[var(--color-dark-blue)] transition hover:text-[var(--color-primary)]">
            {cycle?.name || "Cycle"}
          </h2>
        </Link>

        <p className="mt-1 text-sm text-[var(--color-text)]">
          Brand: {cycle?.brand || "N/A"}
        </p>

        <div className="mt-5 flex items-center justify-between gap-3">

          <p className="text-xl font-bold text-[var(--color-primary)]">
            ₹{formattedPrice}
          </p>

          <Link
            to={`/cycles/${cycle._id}`}
            className="rounded-full bg-[var(--color-primary)] px-4 py-2 text-sm font-semibold text-white transition duration-200 hover:bg-[var(--color-dark-blue)]"
          >
            View Details
          </Link>

        </div>

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