import { useEffect, useState } from "react";
import axios from "axios";
import { Trash2, ImageOff } from "lucide-react";

export default function ListItems() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    try {
      const res = await axios.get(
        "http://localhost:2500/api/food/list-food"
      );
      setItems(res.data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ FIXED DELETE FUNCTION
  const deleteFood = async (id) => {
    if (!window.confirm("Delete this item?")) return;

    try {
      const res = await axios.delete(
        "http://localhost:2500/api/food/remove-food",
        {
          data: { id }, // ✅ axios delete body
        }
      );

      if (res.data.success) {
        // ✅ UI update without reload
        setItems((prev) => prev.filter((item) => item._id !== id));
      }
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className="w-full">

      {/* PAGE HEADER */}
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-gray-100">
          All Food Items
        </h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Manage your menu items
        </p>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto rounded-2xl border bg-white dark:bg-gray-800">
        <table className="min-w-[700px] w-full text-sm">

          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="p-3 text-left">Image</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td colSpan="5" className="py-10 text-center">Loading...</td>
              </tr>
            )}

            {!loading && items.length === 0 && (
              <tr>
                <td colSpan="5" className="py-14 text-center">
                  <ImageOff />
                  <p>No items found</p>
                </td>
              </tr>
            )}

            {!loading && items.map((item) => (
              <tr key={item._id} className="border-t">
                <td className="p-3">
                  <img
                    src={`http://localhost:2500/upload/${item.image}`}
                    className="w-14 h-14 rounded-lg object-cover"
                  />
                </td>
                <td className="p-3">{item.name}</td>
                <td className="p-3">{item.category}</td>
                <td className="p-3">$ {item.price}</td>

                <td className="p-3 text-center">
                  <button
                    onClick={() => deleteFood(item._id)} // ✅ FIXED
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>
    </div>
  );
}
