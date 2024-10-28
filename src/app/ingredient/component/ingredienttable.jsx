"use client";

import React from "react";
import { PiClockCountdownLight } from "react-icons/pi";

const IngredientTable = ({ title, loading }) => {
  const tableHead = ["No", "Raw Ingredient", "Category", "Price", "Stock"];

  const ingredients = [
    { id: 1, name: "Beef", category: "Meat", price: "$3.00", stock: "20" },
    { id: 2, name: "Cheese", category: "Dairy", price: "$1.00", stock: "15" },
    { id: 3, name: "Lettuce", category: "Vegetable", price: "$0.50", stock: "30" },
    { id: 4, name: "Tomato", category: "Vegetable", price: "$0.75", stock: "25" },
    { id: 5, name: "Pepperoni", category: "Meat", price: "$1.50", stock: "10" },
    { id: 6, name: "Pasta", category: "Grain", price: "$2.50", stock: "50" },
    { id: 7, name: "Chicken", category: "Meat", price: "$2.00", stock: "15" },
    { id: 8, name: "Ham", category: "Meat", price: "$1.50", stock: "12" },
    { id: 9, name: "Croutons", category: "Bakery", price: "$0.50", stock: "40" },
    { id: 10, name: "Alfredo Sauce", category: "Condiment", price: "$1.00", stock: "5 liters" },
  ];

  return (
    <div className="w-full h-full">
      <h2 className="text-xl font-bold text-gray-700 mb-4">{title}</h2>
      <table className="w-full bg-white shadow-lg rounded-lg">
        <thead>
          <tr className="bg-gray-100 border-b">
            {tableHead.map((head, index) => (
              <th key={index} className="py-3 px-4 text-gray-600 font-medium text-left">
                {head}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            Array.from({ length: 5 }).map((_, index) => (
              <tr key={index}>
                <td className="py-3 px-4">
                  <Skeleton height={20} />
                </td>
                <td className="py-3 px-4">
                  <Skeleton height={20} />
                </td>
                <td className="py-3 px-4">
                  <Skeleton height={20} />
                </td>
                <td className="py-3 px-4">
                  <Skeleton height={20} />
                </td>
                <td className="py-3 px-4">
                  <Skeleton height={20} />
                </td>
              </tr>
            ))
          ) : (
            ingredients.map((ingredient, index) => (
              <tr key={ingredient.id} className="border-b">
                <td className="py-3 px-4 text-gray-700">{index + 1}</td>
                <td className="py-3 px-4 text-gray-700">{ingredient.name}</td>
                <td className="py-3 px-4 text-gray-700">{ingredient.category}</td>
                <td className="py-3 px-4 text-gray-700">{ingredient.price}</td>
                <td className="py-3 px-4 text-gray-700">{ingredient.stock}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default IngredientTable;
