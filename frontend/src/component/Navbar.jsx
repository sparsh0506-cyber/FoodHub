import { NavLink, useNavigate } from "react-router-dom";
import {
  FiSearch,
  FiShoppingCart,
  FiMoon,
  FiSun,
  FiX,
  FiUser,
  FiLogOut,
  FiPackage,
} from "react-icons/fi";
import { assets } from "../assets/frontend_assets/assets.js";
import { useEffect, useState } from "react";
import { useCategory } from "../component/Cards/CategoryContext.jsx";

export default function Navbar({ onSignup }) {
  const { searchQuery, setSearchQuery, setActive } = useCategory();
  const [dark, setDark] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navigate = useNavigate();

  // 🔐 token check
  const token = localStorage.getItem("token");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  // Enter → scroll to food
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const foodSection = document.getElementById("food-display");
      if (foodSection) {
        foodSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // 🚪 Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setProfileOpen(false);
    navigate("/");
  };

  const navStyle = ({ isActive }) =>
    `text-base font-medium pb-1 border-b-2 transition
     ${isActive
      ? "text-orange-500 border-orange-500"
      : "text-gray-700 dark:text-gray-300 border-transparent hover:text-orange-500 hover:border-orange-500"
    }`;

  return (
    <nav className="flex justify-between items-center px-6 md:px-24 py-4 bg-white dark:bg-[#0E1116] border-b border-gray-200 dark:border-gray-700/10 shadow-sm sticky top-0 z-50 min-h-[80px]">
      {/* LOGO */}
      <NavLink to="/">
        <img
          src={assets.logo}
          className="w-32 md:w-40 cursor-pointer"
          alt="logo"
        />
      </NavLink>

      {/* SEARCH OPEN */}
      {searchOpen ? (
        <div className="flex-1 flex justify-center max-w-3xl mx-8">
          <div className="relative w-full flex items-center">
            <FiSearch className="absolute left-4 text-orange-500 text-xl" />
            <input
              autoFocus
              type="text"
              placeholder="Search food..."
              value={searchQuery}
              onKeyDown={handleKeyDown}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (e.target.value !== "") setActive("All");
              }}
              className="w-full bg-gray-100 dark:bg-gray-800 py-3 px-12 rounded-full outline-none border-2 border-orange-500 dark:text-white"
            />
            <button
              onClick={() => {
                setSearchOpen(false);
                setSearchQuery("");
              }}
              className="absolute right-4 text-xl text-gray-500 hover:text-red-500"
            >
              <FiX />
            </button>
          </div>
        </div>
      ) : (
        <>
          {/* MENU */}
          <div className="hidden md:flex gap-10">
            <NavLink to="/" className={navStyle}>
              Home
            </NavLink>
            <NavLink to="/menu" className={navStyle}>
              Menu
            </NavLink>
            <NavLink to="/mobile-app" className={navStyle}>
              Mobile App
            </NavLink>
            <NavLink to="/contact" className={navStyle}>
              Contact
            </NavLink>
          </div>

          {/* RIGHT ICONS */}
          <div className="flex items-center gap-6 relative">
            <button
              onClick={() => setSearchOpen(true)}
              className="text-2xl text-gray-700 dark:text-gray-300 hover:text-orange-500"
            >
              <FiSearch />
            </button>

            <NavLink to="/cart">
              <FiShoppingCart className="text-2xl text-gray-700 dark:text-gray-300 hover:text-orange-500" />
            </NavLink>

            <button
              onClick={() => setDark(!dark)}
              className="p-2 rounded-full bg-gray-100 dark:bg-gray-800"
            >
              {dark ? <FiSun /> : <FiMoon />}
            </button>

            {/* 🔐 LOGIN / PROFILE */}
            {!token ? (
              <button
                onClick={onSignup}
                className="hidden lg:block px-7 py-2 rounded-full border border-orange-500 text-black dark:text-white hover:shadow-[0_0_20px_rgba(249,115,22,0.7)]"
              >
                Sign Up
              </button>
            ) : (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="p-2 rounded-full bg-orange-100 dark:bg-gray-800 text-orange-500 text-xl"
                >
                  <FiUser />
                </button>

                {/* PROFILE DROPDOWN */}
                {profileOpen && (
                  <div className="absolute right-0 mt-3 w-48 bg-white dark:bg-[#161b22] rounded-xl shadow-lg border dark:border-gray-700 overflow-hidden z-50">
                    <button
                      onClick={() => {
                        navigate("/MyOrders");
                        setProfileOpen(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      <FiPackage /> Orders
                    </button>

                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-gray-800"
                    >
                      <FiLogOut /> Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </nav>
  );
}