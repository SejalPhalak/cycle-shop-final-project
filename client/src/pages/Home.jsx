import { Link } from "react-router-dom";

// Home page images
import heroBanner from "../assets/images/hero-banner.jpg";
import cityBike from "../assets/images/city-bike.jpg";
import mountainBike from "../assets/images/mountain-bike.png";
import urbanCommute from "../assets/images/urban-commute.jpg";
import performanceRoadBike from "../assets/images/performance-road-bike.jpg";
import modernEBike from "../assets/images/modern-e-bike.jpg";
import gravelAdventure from "../assets/images/gravel-bike-adventure.png";
import familyCycleFun from "../assets/images/family-cycle-fun.jpg";
import storefrontView from "../assets/images/storefront-view.jpg";

function Home() {
  const categories = [
    {
      title: "City Cycles",
      text: "Perfect for daily rides",
      image: cityBike,
    },
    {
      title: "Mountain Bikes",
      text: "Built for adventure",
      image: mountainBike,
    },
    {
      title: "Commuter Bikes",
      text: "Smooth everyday rides",
      image: urbanCommute,
    },
    {
      title: "Sports Bikes",
      text: "Ride with more speed",
      image: performanceRoadBike,
    },
  ];

  const featuredCycles = [
    {
      name: "Urban Explorer",
      category: "City Cycle",
      price: "₹18,999",
      image: modernEBike,
    },
    {
      name: "Mountain Pro",
      category: "Mountain Bike",
      price: "₹24,999",
      image: gravelAdventure,
    },
    {
      name: "Speed Rider",
      category: "Sports Bike",
      price: "₹32,999",
      image: familyCycleFun,
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Discover",
      text: "Explore our collection and find a cycle that matches your style.",
      icon: "🔍",
    },
    {
      number: "02",
      title: "Choose",
      text: "Check cycle details, pricing, availability and select your ride.",
      icon: "🛒",
    },
    {
      number: "03",
      title: "Ride",
      text: "Place your order and get ready for your next cycling adventure.",
      icon: "🚴",
    },
  ];

  const features = [
    {
      icon: "✓",
      title: "Quality Cycles",
      text: "Carefully selected cycles for every type of rider.",
    },
    {
      icon: "⚡",
      title: "Easy Shopping",
      text: "Simple browsing, cart and checkout experience.",
    },
    {
      icon: "🔒",
      title: "Secure Orders",
      text: "Your account and order information stays protected.",
    },
    {
      icon: "💬",
      title: "Great Support",
      text: "We're here whenever you need help with your ride.",
    },
  ];

  return (
    <main className="bg-[var(--color-bg)] text-[var(--color-text)]">

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-white">

        <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-[var(--color-secondary)] opacity-30 blur-3xl"></div>

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 md:grid-cols-2 md:py-24">

          {/* Hero Content */}
          <div className="relative z-10">

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--color-secondary)] bg-[var(--color-bg)] px-4 py-2 text-sm font-semibold text-[var(--color-dark-blue)]">
              🚴 Ride smarter. Ride better.
            </div>

            <h1 className="max-w-xl text-5xl font-black leading-[1.05] tracking-tight text-[var(--color-dark-blue)] sm:text-6xl lg:text-7xl">
              Your ride is
              <span className="block text-[var(--color-primary)]">
                just a tap
              </span>
              away.
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-gray-600 sm:text-lg">
              Discover quality cycles, compare your options and find the
              perfect ride for your everyday journey and adventures.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">

              <Link
                to="/cycles"
                className="rounded-full bg-[var(--color-primary)] px-7 py-3.5 font-bold text-white shadow-lg shadow-blue-200 transition duration-300 hover:-translate-y-1 hover:bg-[var(--color-dark-blue)] hover:shadow-xl"
              >
                Explore Cycles →
              </Link>

              <Link
                to="/register"
                className="rounded-full border-2 border-[var(--color-dark-blue)] bg-white px-7 py-3.5 font-bold text-[var(--color-dark-blue)] transition duration-300 hover:-translate-y-1 hover:bg-[var(--color-dark-blue)] hover:text-white"
              >
                Get Started
              </Link>

            </div>

            {/* Stats */}
            <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">

              <div className="rounded-2xl border border-blue-100 bg-white p-4 shadow-sm">
                <p className="text-2xl font-black text-[var(--color-primary)]">
                  100+
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Cycles
                </p>
              </div>

              <div className="rounded-2xl border border-blue-100 bg-white p-4 shadow-sm">
                <p className="text-2xl font-black text-[var(--color-primary)]">
                  15+
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Brands
                </p>
              </div>

              <div className="rounded-2xl border border-blue-100 bg-white p-4 shadow-sm">
                <p className="text-2xl font-black text-[var(--color-primary)]">
                  4.9
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  User Rating
                </p>
              </div>

            </div>

          </div>


          {/* HERO IMAGE */}
          <div className="relative">

            <div className="relative mx-auto flex h-[400px] max-w-lg items-center justify-center overflow-hidden rounded-[2rem] bg-gradient-to-br from-[var(--color-dark-blue)] via-[var(--color-primary)] to-[var(--color-secondary)] shadow-2xl">

              <img
                src={heroBanner}
                alt="Cycle Shop"
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-black/10"></div>

              <div className="absolute inset-0 opacity-20">

                <div className="absolute left-10 top-10 h-32 w-32 rounded-full border-[20px] border-white"></div>

                <div className="absolute bottom-5 right-5 h-48 w-48 rounded-full border-[25px] border-white"></div>

              </div>

              <div className="relative z-10 text-center">

                <div className="mt-5 rounded-2xl bg-white/95 px-6 py-4 shadow-xl backdrop-blur">

                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
                    Your next adventure
                  </p>

                  <p className="mt-1 text-xl font-black text-[var(--color-dark-blue)]">
                    Starts Here
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* BRAND STRIP */}
      <section className="bg-[var(--color-dark-blue)] py-4">

        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-5 text-sm font-bold tracking-wider text-white/80">

          <span>HERO</span>
          <span>•</span>
          <span>URBAN</span>
          <span>•</span>
          <span>MTB</span>
          <span>•</span>
          <span>ROAD</span>
          <span>•</span>
          <span>SPORTS</span>
          <span>•</span>
          <span>COMMUTER</span>

        </div>

      </section>


      {/* CATEGORY SECTION */}
      <section className="bg-white py-16 sm:py-20">

        <div className="mx-auto max-w-7xl px-5 sm:px-8">

          <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">

            <div>

              <p className="mb-2 text-sm font-bold uppercase tracking-widest text-[var(--color-primary)]">
                Find your style
              </p>

              <h2 className="text-3xl font-black text-[var(--color-dark-blue)] sm:text-4xl">
                Pick your vibe.
              </h2>

              <p className="mt-2 max-w-lg text-gray-500">
                Choose a category and discover cycles made for the way you ride.
              </p>

            </div>

            <Link
              to="/cycles"
              className="font-bold text-[var(--color-primary)] hover:text-[var(--color-dark-blue)]"
            >
              View all cycles →
            </Link>

          </div>


          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">

            {categories.map((category) => (

              <Link
                key={category.title}
                to="/cycles"
                className="group relative min-h-48 overflow-hidden rounded-3xl bg-[var(--color-dark-blue)] p-5 shadow-lg transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >

                <img
                  src={category.image}
                  alt={category.title}
                  className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-[var(--color-dark-blue)]/45"></div>

                <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[var(--color-primary)] opacity-40 transition duration-300 group-hover:scale-150"></div>

                <div className="relative flex h-full min-h-36 flex-col justify-end">

                  <div>

                    <h3 className="text-lg font-bold text-white">
                      {category.title}
                    </h3>

                    <p className="mt-1 text-xs text-blue-100">
                      {category.text}
                    </p>

                  </div>

                </div>

              </Link>

            ))}

          </div>

        </div>

      </section>


      {/* FEATURED SECTION */}
      <section className="bg-[var(--color-bg)] py-16 sm:py-20">

        <div className="mx-auto max-w-7xl px-5 sm:px-8">

          <div className="mb-10 flex items-end justify-between gap-4">

            <div>

              <p className="mb-2 text-sm font-bold uppercase tracking-widest text-[var(--color-primary)]">
                Popular picks
              </p>

              <h2 className="text-3xl font-black text-[var(--color-dark-blue)] sm:text-4xl">
                Featured rides.
              </h2>

              <p className="mt-2 text-gray-500">
                Some of the rides our customers love.
              </p>

            </div>

            <Link
              to="/cycles"
              className="hidden rounded-full border border-[var(--color-dark-blue)] px-5 py-2 text-sm font-bold text-[var(--color-dark-blue)] transition hover:bg-[var(--color-dark-blue)] hover:text-white sm:block"
            >
              View all
            </Link>

          </div>


          <div className="grid gap-6 md:grid-cols-3">

            {featuredCycles.map((cycle) => (

              <div
                key={cycle.name}
                className="group overflow-hidden rounded-3xl bg-white shadow-md transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >

                {/* Featured Image */}
                <div className="flex h-60 items-center justify-center overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100">

                  <img
                    src={cycle.image}
                    alt={cycle.name}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
                  />

                </div>

                <div className="p-5">

                  <p className="text-sm font-semibold text-[var(--color-primary)]">
                    {cycle.category}
                  </p>

                  <h3 className="mt-1 text-xl font-bold text-[var(--color-dark-blue)]">
                    {cycle.name}
                  </h3>

                  <div className="mt-5 flex items-center justify-between">

                    <p className="text-xl font-black text-[var(--color-primary)]">
                      {cycle.price}
                    </p>

                    <Link
                      to="/cycles"
                      className="rounded-full bg-[var(--color-primary)] px-4 py-2 text-sm font-bold text-white transition hover:bg-[var(--color-dark-blue)]"
                    >
                      View Ride
                    </Link>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* THREE STEPS */}
      <section className="relative overflow-hidden bg-[var(--color-dark-blue)] py-16 sm:py-20">

        <div className="absolute inset-0 opacity-10">

          <div className="h-full w-full bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] [background-size:18px_18px]"></div>

        </div>

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">

          <div className="mx-auto mb-12 max-w-2xl text-center">

            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-[var(--color-secondary)]">
              Simple process
            </p>

            <h2 className="text-3xl font-black text-white sm:text-4xl">

              Three steps to the

              <span className="block text-[var(--color-secondary)]">
                open road.
              </span>

            </h2>

          </div>


          <div className="grid gap-5 md:grid-cols-3">

            {steps.map((step) => (

              <div
                key={step.number}
                className="group rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur transition duration-300 hover:-translate-y-2 hover:border-[var(--color-secondary)] hover:bg-white/10"
              >

                <div className="flex items-start justify-between">

                  <span className="text-4xl font-black text-[var(--color-primary)]">
                    {step.number}
                  </span>

                  <span className="text-3xl">
                    {step.icon}
                  </span>

                </div>

                <h3 className="mt-8 text-xl font-bold text-white">
                  {step.title}
                </h3>

                <p className="mt-2 leading-6 text-blue-100/70">
                  {step.text}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* FEATURES */}
      <section className="bg-white py-16 sm:py-20">

        <div className="mx-auto max-w-7xl px-5 sm:px-8">

          <div className="mb-10 text-center">

            <p className="mb-2 text-sm font-bold uppercase tracking-widest text-[var(--color-primary)]">
              Why CycleHub
            </p>

            <h2 className="text-3xl font-black text-[var(--color-dark-blue)] sm:text-4xl">
              Built for freedom, priced with honesty.
            </h2>

          </div>


          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

            {features.map((feature) => (

              <div
                key={feature.title}
                className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--color-bg)] text-xl font-bold text-[var(--color-primary)]">
                  {feature.icon}
                </div>

                <h3 className="mt-5 font-bold text-[var(--color-dark-blue)]">
                  {feature.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  {feature.text}
                </p>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* EXPERIENCE SECTION */}
      <section className="bg-[var(--color-bg)] py-16 sm:py-20">

        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 sm:px-8 md:grid-cols-2">

          <div className="relative flex min-h-[360px] items-center justify-center overflow-hidden rounded-[2rem] bg-[var(--color-dark-blue)] shadow-2xl">

            <img
              src={storefrontView}
              alt="Cycle Ride"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-[var(--color-dark-blue)]/30"></div>

            <div className="relative z-10 text-center">

              <div className="mt-5 rounded-xl bg-white px-5 py-3">

                <p className="font-bold text-[var(--color-dark-blue)]">
                  Ride your way.
                </p>

              </div>

            </div>

          </div>


          <div>

            <p className="mb-3 text-sm font-bold uppercase tracking-widest text-[var(--color-primary)]">
              More than a cycle
            </p>

            <h2 className="text-4xl font-black leading-tight text-[var(--color-dark-blue)]">

              More than a rental —

              <span className="block text-[var(--color-primary)]">
                a joyful experience.
              </span>

            </h2>

            <p className="mt-5 leading-7 text-gray-600">
              From your first search to your final ride, CycleHub is designed
              to make the entire cycling experience simple and enjoyable.
            </p>

            <div className="mt-7 space-y-3">

              <div className="rounded-xl border border-blue-100 bg-white p-4 shadow-sm">

                <p className="font-bold text-[var(--color-dark-blue)]">
                  ✓ Find the right cycle
                </p>

              </div>

              <div className="rounded-xl border border-blue-100 bg-white p-4 shadow-sm">

                <p className="font-bold text-[var(--color-dark-blue)]">
                  ✓ Check availability easily
                </p>

              </div>

              <div className="rounded-xl border border-blue-100 bg-white p-4 shadow-sm">

                <p className="font-bold text-[var(--color-dark-blue)]">
                  ✓ Manage your orders
                </p>

              </div>

            </div>

            <Link
              to="/cycles"
              className="mt-7 inline-block rounded-full bg-[var(--color-primary)] px-7 py-3 font-bold text-white transition hover:bg-[var(--color-dark-blue)]"
            >
              Start Your Journey →
            </Link>

          </div>

        </div>

      </section>


      {/* TESTIMONIALS */}
      <section className="bg-white py-16 sm:py-20">

        <div className="mx-auto max-w-7xl px-5 sm:px-8">

          <div className="mb-10 text-center">

            <p className="mb-2 text-sm font-bold uppercase tracking-widest text-[var(--color-primary)]">
              Rider stories
            </p>

            <h2 className="text-3xl font-black text-[var(--color-dark-blue)] sm:text-4xl">

              Loved by riders,

              <span className="text-[var(--color-primary)]">
                {" "}trusted by many.
              </span>

            </h2>

          </div>


          <div className="grid gap-5 md:grid-cols-3">

            {[
              {
                name: "Rahul Kumar",
                text: "The cycle selection was excellent and the ordering experience was very simple.",
              },
              {
                name: "Priya Sharma",
                text: "I found exactly the kind of cycle I was looking for. The website is easy to use.",
              },
              {
                name: "Amit Patil",
                text: "Clean experience, good cycles and a very smooth checkout process.",
              },
            ].map((review) => (

              <div
                key={review.name}
                className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm"
              >

                <div className="text-2xl text-[var(--color-secondary)]">
                  “
                </div>

                <p className="mt-2 leading-6 text-gray-600">
                  {review.text}
                </p>

                <div className="mt-6 flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--color-primary)] font-bold text-white">
                    {review.name.charAt(0)}
                  </div>

                  <div>

                    <p className="font-bold text-[var(--color-dark-blue)]">
                      {review.name}
                    </p>

                    <p className="text-xs text-yellow-500">
                      ★★★★★
                    </p>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* FINAL CTA */}
      <section className="bg-[var(--color-bg)] px-5 py-12 sm:px-8">

        <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-[var(--color-dark-blue)] p-8 shadow-2xl sm:p-12">

          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">

            <div>

              <p className="mb-2 text-sm font-bold uppercase tracking-widest text-[var(--color-secondary)]">
                Your next ride awaits
              </p>

              <h2 className="text-3xl font-black text-white sm:text-4xl">

                Ready to hit

                <span className="block text-[var(--color-secondary)]">
                  the road?
                </span>

              </h2>

              <p className="mt-3 max-w-lg text-blue-100/70">
                Find your perfect cycle and start your next adventure with
                CycleHub.
              </p>

            </div>


            <div className="flex flex-wrap gap-3">

              <Link
                to="/cycles"
                className="rounded-full bg-[var(--color-primary)] px-6 py-3 font-bold text-white transition hover:bg-white hover:text-[var(--color-dark-blue)]"
              >
                Browse Cycles
              </Link>

              <Link
                to="/register"
                className="rounded-full border border-white/30 px-6 py-3 font-bold text-white transition hover:bg-white hover:text-[var(--color-dark-blue)]"
              >
                Create Account
              </Link>

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}

export default Home;