import React from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";

function Order({ BASE_URL }) {
  const [order, setOrder] = useState([]);

  const fetchOrder = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/order/list`);
      // console.log("✅ Full API Response:", response.data);

      if (response.data.success && Array.isArray(response.data.orders)) {
        setOrder(response.data.orders);
      } else {
        toast.error("❌ Failed to fetch orders!");
        setOrder([]); // Ensure it's an array
      }
    } catch (error) {
      console.error("❌ Error fetching orders:", error);
      setOrder([]); // Handle errors gracefully
    }
  };

  

  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <div className="container mx-auto p-4 bg-gray-200 mt-3">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-900">
        🛒 My Orders
      </h1>

      {order.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-gray-200">
          {order.map((order) => (
            <div
              key={order._id}
              className="bg-white shadow-md rounded-xl p-5 border transition-all duration-300 hover:shadow-2xl hover:scale-105"
            >
              <h2 className="text-lg font-semibold text-gray-900">
                📦 Order ID: <span className="text-blue-600">{order._id}</span>
              </h2>
              <p className="text-gray-700">
                💰 <strong>Amount:</strong> ₹{order.amount}
              </p>
              <p className="text-gray-700">
                📌 <strong>Status:</strong>{" "}
                <select name="status" className="bg-gray-200 border border-gray-300 rounded">
                  <option value="Food Proccessing">{order.status}</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>
              </p>
              <p className="text-gray-700">
                💳 <strong>Payment:</strong>{" "}
                {order.payment ? "✅ Paid" : "❌ Not Paid"}
              </p>

              {/* Address Section */}
              {order.address && (
                <div className="mt-4 p-3 border rounded-lg bg-gray-100">
                  <h3 className="font-semibold text-gray-800">
                    📍 Shipping Address
                  </h3>
                  <p>
                    🏠 {order.address.firstName} {order.address.lastName}
                  </p>
                  <p>
                    📍 {order.address.street}, {order.address.city},{" "}
                    {order.address.state}
                  </p>
                  <p>
                    📮 {order.address.zipCode}, {order.address.country},📧{" "}
                    {order.address.phone}
                  </p>
                  <p>
                    📧 Email:{" "}
                    <span className="text-blue-600">{order.address.email}</span>
                  </p>
                </div>
              )}

              {/* Items List */}
              <h3 className="mt-4 font-semibold text-gray-800">🛍 Items:</h3>
              <ul className="pl-4 space-y-1 text-gray-700">
                {order.items.map((item, index) => (
                  <li key={index} className="flex items-center">
                    🔹{" "}
                    <span className="ml-2">
                      {item.name} - ₹{item.price}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600 text-lg">
          🚫 You don't have any orders yet.
        </p>
      )}
    </div>
  );
}

export default Order;
