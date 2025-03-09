import React, { useEffect, useState } from "react";
import { FiCamera, FiLoader } from "react-icons/fi";
import axios from "axios";
import { toast } from "react-toastify";


function Add() {
  const BASE_URL = "http://localhost:4000"; // ✅ Changed variable name
  const [image, setImage] = useState(null); // ✅ Added image state
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    price: "",
    description: "",
    category: "salad",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file); // ✅ Save file for form submission
      setImagePreview(URL.createObjectURL(file)); // ✅ Show preview
    }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!image) {
      alert("Please upload an image!"); // ✅ Error handling
      return;
    }

    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("category", data.category);
    formData.append("price", Number(data.price));

    setIsLoading(true);

    try {
      const response = await axios.post(`${BASE_URL}/api/food/add`, formData, {
        headers: { "Content-Type": "multipart/form-data" }, 
      });

      console.log("response", response);

      if (response.data.success) {
        
        setData({
          name: "",
          price: "",
          description: "",
          category: "salad",
        });
        setImagePreview(null);
        setImage(null);
        toast.success(response.data.message);
      }else{
        toast.error(response.data.message);
      }

    } catch (error) {
      console.error("Error adding product:", error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    console.log("data", data);
  }, [data]);

  return (
    <div className="max-w-lg mx-auto p-6 bg-gray-200 shadow-lg rounded-lg mt-8">
      <h2 className="text-2xl font-bold text-center text-red-500">
        🍔 Add New Product
      </h2>

      <form className="space-y-4" onSubmit={onSubmitHandler}>
        {/* Image Upload */}
        <div className="flex flex-col items-center">
          <p className="text-lg font-medium">📸 Upload Image</p>
          <label htmlFor="image" className="relative cursor-pointer">
            {!imagePreview && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-300 rounded-lg">
                <FiCamera size={50} className="text-gray-500" />
              </div>
            )}
            <img
              src={imagePreview || "https://via.placeholder.com/150"}
              alt="Preview"
              className="w-40 h-32 object-cover rounded-sm border-2 border-gray-300 hover:border-red-500 transition-all"
            />
          </label>

          <input
            type="file"
            name="image"
            id="image"
            hidden
            required
            onChange={handleImageChange}
          />
        </div>

        {/* Product Name */}
        <div>
          <p className="text-lg font-medium">📝 Name of Product</p>
          <input
            type="text"
            name="name"
            placeholder="Enter product name"
            onChange={onChangeHandler}
            value={data.name}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-red-500 bg-gray-100"
          />
        </div>

        {/* Description */}
        <div>
          <p className="text-lg font-medium">✍️ Description</p>
          <textarea
            name="description"
            placeholder="Write content here..."
            onChange={onChangeHandler}
            value={data.description}
            className="w-full p-2 border rounded-md focus:ring-2 focus:ring-red-500 bg-gray-100"
          ></textarea>
        </div>

        {/* Category & Price */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <p className="text-lg font-medium">📂 Product Category</p>
            <select
              name="category"
              onChange={onChangeHandler}
              value={data.category}
              className="w-full p-2 border rounded-md focus:ring-2 focus:ring-red-500 bg-gray-100"
            >
              <option value="salad">🥗 Salad</option>
              <option value="rolls">🌯 Rolls</option>
              <option value="samosa">🥟 Samosa</option>
              <option value="aloo">🥔 Aloo</option>
              <option value="pasta">🍝 Pasta</option>
              <option value="burger">🍔 Burger</option>
            </select>
          </div>

          <div className="flex-1">
            <p className="text-lg font-medium">💰 Price</p>
            <input
              type="number"
              name="price"
              placeholder="Enter price in $"
              onChange={onChangeHandler}
              value={data.price}
              className="w-full p-2 bg-gray-100 border rounded-md focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gray-300 text-white py-2 rounded-md text-lg font-bold transition-all flex items-center justify-center gap-2"
        >
          {isLoading ? 
            <FiLoader className="animate-spin text-xl" />
           : 
            "🚀 Add Product"
          }
        </button>
      </form>
    </div>
  );
}

export default Add;
