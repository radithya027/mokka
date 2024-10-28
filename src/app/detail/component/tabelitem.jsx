"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PiClockCountdownLight } from "react-icons/pi";

const TableItems = ({ title, loading }) => {
  const router = useRouter();
  const [itemDetails, setItemDetails] = useState(null);
  
  const items = [
    {
      id: 1,
      itemName: "Burger",
      ingredients: [
        { name: "Beef", price: "$3.00" },
        { name: "Cheese", price: "$1.00" },
        { name: "Lettuce", price: "$0.50" },
        { name: "Tomato", price: "$0.50" },
      ],
    },
    {
      id: 2,
      itemName: "Pizza",
      ingredients: [
        { name: "Pepperoni", price: "$1.50" },
        { name: "Cheese", price: "$1.00" },
        { name: "Tomato Sauce", price: "$0.75" },
      ],
    },
    {
      id: 3,
      itemName: "Salad",
      ingredients: [
        { name: "Lettuce", price: "$1.00" },
        { name: "Croutons", price: "$0.50" },
        { name: "Caesar Dressing", price: "$0.75" },
      ],
    },
    {
      id: 4,
      itemName: "Pasta",
      ingredients: [
        { name: "Pasta", price: "$2.50" },
        { name: "Alfredo Sauce", price: "$1.00" },
        { name: "Chicken", price: "$2.00" },
      ],
    },
    {
      id: 5,
      itemName: "Sandwich",
      ingredients: [
        { name: "Ham", price: "$1.50" },
        { name: "Cheese", price: "$1.00" },
        { name: "Lettuce", price: "$0.50" },
      ],
    },
  ];

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const id = queryParams.get("id");
    // Temukan item yang sesuai dengan ID
    const selectedItem = items.find(item => item.id === parseInt(id));
    setItemDetails(selectedItem);
  }, []);

  return (
    <div className="w-full h-full">
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : itemDetails ? (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-700 mb-4">{itemDetails.itemName}</h2>
          <table className="w-full bg-white shadow-lg rounded-lg">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="py-3 px-4 text-gray-600 font-medium text-left">Ingredient</th>
                <th className="py-3 px-4 text-gray-600 font-medium text-left">Price</th>
              </tr>
            </thead>
            <tbody>
              {itemDetails.ingredients.map((ingredient, index) => (
                <tr key={index} className="border-b">
                  <td className="py-3 px-4 text-gray-700">{ingredient.name}</td>
                  <td className="py-3 px-4 text-gray-700">{ingredient.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center">Item not found.</div>
      )}
    </div>
  );
};

export default TableItems;
