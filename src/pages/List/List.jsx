import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";

function List( {BASE_URL} ) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const foodEmojis = {
    salad: "🥗",
    rolls: "🌯",
    samosa: "🥟",
    aloo: "🥔",
    pasta: "🍝",
    burger: "🍔",
    pizza: "🍕",
    fries: "🍟",
    sandwich: "🥪",
    drink: "🥤",
  };

  const fetchList = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/food/list`);
      console.log("response", response);

      if (response.data.success) {
        setList(response.data.data);
        toast.success("Food list fetched successfully!");
      } else {
        toast.error("❌ Failed to fetch food list!");
      }
    } catch (error) {
      toast.error("❌ Error fetching data!");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (foodId) => {
    console.log("Deleting food item with ID:", foodId);

    try {
      const response = await axios.post(
        `${BASE_URL}/api/food/remove`,
        { id: foodId },
        { headers: { "Content-Type": "application/json" }, timeout: 10000 }
      );
      toast.success("Deleted response", response); // Add this line
      await fetchList();
    } catch (error) {
      console.error("Error deleting food item:", error);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 bg-white shadow-md rounded-lg mt-6">
      <h2 className="text-3xl font-bold text-center text-red-600 mb-6">
        🍽️ All Foods List
      </h2>

      {/* Loader */}
      {loading ? (
        <p className="text-center text-gray-500 animate-pulse">
          ⏳ Loading food items...
        </p>
      ) : list.length === 0 ? (
        <p className="text-center text-gray-600">🚫 No food items available.</p>
      ) : (
        <div>
          {/* Table for Large Screens */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full border border-gray-300 rounded-lg shadow-md">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="p-3 text-left">📸 Image</th>
                  <th className="p-3 text-left">📝 Name</th>
                  <th className="p-3 text-left">📂 Category</th>
                  <th className="p-3 text-left">💰 Price</th>
                  <th className="p-3 text-center">⚙️ Action</th>
                </tr>
              </thead>
              <tbody>
                {list.map((item, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-300 hover:bg-gray-200 transition-all"
                  >
                    <td className="p-3 flex justify-center">
                      <img
                        src={item.image || "https://via.placeholder.com/100"}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-md border shadow-md"
                      />
                    </td>
                    <td className="p-3 font-medium text-gray-900">
                      {item.name}
                    </td>
                    <td className="p-3 text-gray-700">
                      {foodEmojis[item.category] || "🍽️"} {item.category}
                    </td>
                    <td className="p-3 text-green-600 font-bold">
                      ${item.price}
                    </td>
                    <td className="p-3 flex justify-center gap-3">
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Grid Layout for Mobile Screens */}
          <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            {list.map((item, index) => (
              <div
                key={index}
                className="bg-gray-200 p-4 rounded-lg shadow-md flex flex-col items-center"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-35 h-30 object-cover rounded-md border shadow-md"
                />
                <h3 className="mt-2 font-semibold text-lg">{item.name}</h3>
                <p className="text-gray-600">
                  {foodEmojis[item.category] || "🍽️"} {item.category}
                </p>
                <p className="text-gray-600 font-bold mt-1">${item.price}</p>
                <div className="flex gap-3 mt-3">
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default List;
