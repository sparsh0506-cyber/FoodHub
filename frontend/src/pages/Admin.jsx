import { useState } from "react";
 
export default function Admin() {
  const [showError, setShowError] = useState(true);
 
  return (
    <div className="min-h-screen flex
      bg-gray-50 dark:bg-gray-900
      text-gray-800 dark:text-gray-100">
 
      {/* ================= Sidebar ================= */}
      <aside
        className="w-64 px-6 py-8 border-r
        bg-white dark:bg-gray-800
        border-gray-200 dark:border-gray-700"
      >
        <div className="space-y-4">
          <button
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg
            border border-orange-400 text-orange-500
            hover:bg-orange-50 dark:hover:bg-orange-900/20"
          >
            ➕ Add Items
          </button>
 
          <button
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg
            border border-gray-300 dark:border-gray-600
            hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            📋 List Items
          </button>
 
          <button
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg
            border border-gray-300 dark:border-gray-600
            hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            🧾 Orders
          </button>
        </div>
      </aside>
 
      {/* ================= Main ================= */}
      <main className="flex-1 p-10 relative">
 
        {/* ===== Error Toast ===== */}
        {showError && (
          <div
            className="absolute top-6 right-6 flex items-center gap-3
            bg-white dark:bg-gray-800
            border-l-4 border-red-500
            shadow-lg px-4 py-3 rounded-md"
          >
            <span className="text-red-500 text-xl">❗</span>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Server error while fetching orders
            </p>
            <button
              onClick={() => setShowError(false)}
              className="ml-4 text-gray-400 hover:text-red-500"
            >
              ✖
            </button>
          </div>
        )}
 
        {/* ================= Add Item Form ================= */}
        <div className="max-w-2xl">
 
          {/* Upload */}
          <div className="mb-6">
            <p className="mb-2 text-gray-600 dark:text-gray-400">
              Upload Image
            </p>
 
            <label
              className="w-32 h-32 border-2 border-dashed
              flex flex-col items-center justify-center cursor-pointer
              text-gray-400
              border-gray-300 dark:border-gray-600
              hover:border-orange-400"
            >
              ☁️
              <span className="text-sm">Upload</span>
              <input type="file" hidden />
            </label>
          </div>
 
          {/* Name */}
          <div className="mb-6">
            <label className="block mb-2 text-gray-600 dark:text-gray-400">
              Product name
            </label>
            <input
              type="text"
              placeholder="Type here"
              className="w-full px-4 py-2 rounded-md outline-none
              border border-gray-300 dark:border-gray-600
              bg-white dark:bg-gray-800
              text-gray-800 dark:text-gray-100"
            />
          </div>
 
          {/* Description */}
          <div className="mb-6">
            <label className="block mb-2 text-gray-600 dark:text-gray-400">
              Product Description
            </label>
            <textarea
              placeholder="Write here"
              className="w-full px-4 py-3 rounded-md h-32 resize-none
              border border-gray-300 dark:border-gray-600
              bg-white dark:bg-gray-800
              text-gray-800 dark:text-gray-100"
            />
          </div>
 
          {/* Category & Price */}
          <div className="flex gap-6 mb-8">
            <div className="flex-1">
              <label className="block mb-2 text-gray-600 dark:text-gray-400">
                Product category
              </label>
              <select
                className="w-full px-4 py-2 rounded-md
                border border-gray-300 dark:border-gray-600
                bg-white dark:bg-gray-800
                text-gray-800 dark:text-gray-100"
              >
                <option>Select category</option>
                <option>Salad</option>
                <option>Rolls</option>
                <option>Deserts</option>
                <option>Sandwich</option>
                <option>Cake</option>
                <option>Pure veg</option>
                <option>Pasta</option>
                <option>Noodles</option>
              </select>
            </div>
 
            <div className="w-40">
              <label className="block mb-2 text-gray-600 dark:text-gray-400">
                Product price
              </label>
              <input
                type="number"
                placeholder="$20"
                className="w-full px-4 py-2 rounded-md
                border border-gray-300 dark:border-gray-600
                bg-white dark:bg-gray-800
                text-gray-800 dark:text-gray-100"
              />
            </div>
          </div>
 
          {/* Button */}
          <button
            className="px-10 py-3 rounded-md
            bg-black dark:bg-orange-500
            text-white hover:opacity-90"
          >
            ADD
          </button>
 
        </div>
      </main>
    </div>
  );
}
 
 