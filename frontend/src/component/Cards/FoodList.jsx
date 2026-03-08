import { useState } from "react";
import { useCategory } from "./CategoryContext";

export default function FoodList() {
  const {
    filtered,
    toggleCart,
    cart,
    url,
    increaseQty,
    decreaseQty,
  } = useCategory();

  // ⭐ rating state (per item)
  const [ratings, setRatings] = useState({});

  const handleRating = (id) => {
    setRatings((prev) => ({
      ...prev,
      [id]: prev[id] >= 5 ? 1 : (prev[id] || 1) + 1,
    }));
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 p-6">
      {filtered.map((item) => (
        <div
          key={item._id}
          className="
            group flex flex-col justify-between
            bg-white dark:bg-[#1a1f2e]
            rounded-3xl border border-gray-100 dark:border-gray-800
            shadow-md hover:shadow-2xl dark:shadow-black/50
            transition-all duration-300 ease-in-out hover:-translate-y-1
            overflow-hidden
          "
        >
          {/* IMAGE WRAPPER */}
          <div className="relative h-56 overflow-hidden">
            <img
              src={`${url}/images/${item.image}`}
              alt={item.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          <div className="p-5 flex flex-col flex-grow">
            {/* NAME + ⭐ RATING */}
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white leading-tight pr-2">
                {item.name}
              </h3>

              <div className="flex items-center gap-1 bg-gray-50 dark:bg-gray-800 px-2 py-1 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm">
                <span className="text-sm font-bold text-gray-700 dark:text-gray-300">
                  {ratings[item._id] || 1}
                </span>
                <button
                  onClick={() => handleRating(item._id)}
                  className="text-yellow-400 text-lg hover:scale-125 active:scale-95 transition-transform"
                >
                  ★
                </button>
              </div>
            </div>

            {/* DESCRIPTION */}
            <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-4 line-clamp-2">
              {item.description}
            </p>

            {/* SPACER */}
            <div className="mt-auto">
              {/* PRICE + QTY CONTROLS */}
              <div className="flex items-center justify-between mb-4">
                <p className="text-2xl font-extrabold text-gray-900 dark:text-white">
                  <span className="text-orange-500 mr-0.5">$</span>{item.price}
                </p>

                {cart[item._id] && (
                  <div className="flex items-center bg-gray-100 dark:bg-gray-800 rounded-full px-1 py-1 shadow-inner">
                    <button
                      onClick={() => decreaseQty(item._id)}
                      className="
                        w-8 h-8 flex items-center justify-center rounded-full
                        bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-200
                        shadow-sm hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-500
                        transition-colors font-bold text-lg
                      "
                    >
                      −
                    </button>

                    <span className="w-8 text-center font-bold text-gray-800 dark:text-white text-sm">
                      {cart[item._id]}
                    </span>

                    <button
                      onClick={() => increaseQty(item._id)}
                      className="
                        w-8 h-8 flex items-center justify-center rounded-full
                        bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-200
                        shadow-sm hover:bg-green-50 dark:hover:bg-green-900/30 hover:text-green-500
                        transition-colors font-bold text-lg
                      "
                    >
                      +
                    </button>
                  </div>
                )}
              </div>

              {/* ADD / REMOVE BUTTON */}
              {cart[item._id] ? (
                <button
                  onClick={() => toggleCart(item._id)}
                  className="
                    w-full py-3 rounded-xl font-bold text-sm tracking-wide
                    bg-red-50 text-red-500 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/40
                    border border-red-200 dark:border-red-800
                    transition-all active:scale-95
                  "
                >
                  Remove from Cart
                </button>
              ) : (
                <button
                  onClick={() => toggleCart(item._id)}
                  className="
                    w-full py-3 rounded-xl font-bold text-sm tracking-wide text-white
                    bg-orange-500 hover:bg-orange-600 shadow-lg shadow-orange-500/30
                    transition-all hover:shadow-orange-500/50 active:scale-95
                  "
                >
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}