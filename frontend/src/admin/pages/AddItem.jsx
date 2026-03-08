import { useState } from "react";
import { UploadCloud, XCircle } from "lucide-react";
import axios from "axios";
import "../.././index.css";

export default function AddItem() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    image: null,
    preview: null,
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setForm({
      ...form,
      image: file,
      preview: URL.createObjectURL(file),
    });
  };

  const handleSubmit = async () => {
    if (!form.image) return setError("Please upload product image");
    if (!form.name) return setError("Product name is required");
    if (!form.category) return setError("Please select category");
    if (!form.price) return setError("Product price is required");

    setError("");
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("category", form.category);
      formData.append("price", form.price);
      formData.append("image", form.image); // 🔴 multer key

      await axios.post(
        "http://localhost:2500/api/food/add-food",
        formData
      );

      // alert("✅ Product Added Successfully");

      // reset form
      setForm({
        name: "",
        description: "",
        category: "",
        price: "",
        image: null,
        preview: null,
      });

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl w-full relative">

      {/* ERROR TOAST */}
      {error && (
        <div className="fixed top-20 right-4 sm:right-6 z-50 w-[90%] sm:w-80
          bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl shadow-lg">
          <div className="flex gap-3 p-4 text-sm">
            <XCircle className="text-red-500" />
            <span className="flex-1 text-gray-700 dark:text-gray-200">
              {error}
            </span>
            <button onClick={() => setError("")}>✕</button>
          </div>
          <div className="h-1 bg-red-500 rounded-b-xl"></div>
        </div>
      )}

      {/* CARD */}
      <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 
        rounded-2xl p-6 sm:p-8 space-y-6">

        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Add New Product
        </h2>

        {/* IMAGE UPLOAD */}
        <div>
          <p className="text-sm mb-2 text-gray-600 dark:text-gray-300">
            Upload Image
          </p>

          <label className="
            w-36 h-28 border-2 border-dashed rounded-xl
            flex flex-col items-center justify-center
            text-gray-400 cursor-pointer
            hover:border-red-400
            overflow-hidden
          ">
            {form.preview ? (
              <img src={form.preview} className="w-full h-full object-cover" />
            ) : (
              <>
                <UploadCloud />
                <span className="text-xs mt-1">Upload</span>
              </>
            )}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>

        {/* NAME */}
        <div>
          <label className="text-sm">Product name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Type here"
            className="input"
          />
        </div>

        {/* DESCRIPTION */}
        <div>
          <label className="text-sm">Product description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows="4"
            placeholder="Write here"
            className="input resize-none"
          />
        </div>

        {/* CATEGORY + PRICE */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="w-full sm:w-48">
            <label className="text-sm">Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="input"
            >
              <option value="">Select category</option>
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

          <div className="w-full sm:w-32">
            <label className="text-sm">Price</label>
            <input
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="$ 1.99"
              className="input"
            />
          </div>
        </div>

        {/* BUTTON */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-red-500 hover:bg-red-600 disabled:opacity-60
            text-white px-10 py-2 rounded-lg text-sm"
        >
          {loading ? "ADDING..." : "ADD ITEM"}
        </button>
      </div>
    </div>
  );
}
