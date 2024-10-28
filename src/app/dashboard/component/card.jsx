"use client";

import React, { useState } from "react"; // Import useState
import { useRouter } from "next/navigation"; // Import useRouter
import { PiClockCountdownLight } from "react-icons/pi";
import { AiOutlineEdit } from "react-icons/ai"; // Import ikon edit

const TableItems = ({ title, loading }) => {
  const router = useRouter();
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState(null); // State untuk menyimpan item yang sedang diedit
  const tableHead = ["Item Name", "Variant", "Ingredients", "Total Price", "Detail", "Edit"]; // Tambahkan "Edit" ke header tabel

  const items = [
    { id: 1, itemName: "Burger", variant: "Cheese", ingredients: "4 Ingredients", totalPrice: "$5.99" },
    { id: 2, itemName: "Pizza", variant: "Pepperoni", ingredients: "3 Ingredients", totalPrice: "$8.99" },
    { id: 3, itemName: "Salad", variant: "Caesar", ingredients: "3 Ingredients", totalPrice: "$4.99" },
    { id: 4, itemName: "Pasta", variant: "Alfredo", ingredients: "3 Ingredients", totalPrice: "$7.99" },
    { id: 5, itemName: "Sandwich", variant: "Ham & Cheese", ingredients: "3 Ingredients", totalPrice: "$3.99" },
  ];

  const handleViewDetails = (item) => {
    router.push(`/detail?id=${item.id}`); // Atau gunakan path yang sesuai dengan kebutuhan Anda
  };

  const handleEditItem = (item) => {
    setCurrentItem(item); // Set item yang akan diedit
    setModalOpen(true); // Buka modal
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setCurrentItem(null); // Reset item yang sedang diedit
  };

  const handleSaveChanges = () => {
    // Implementasikan logika untuk menyimpan perubahan
    // Misalnya, Anda bisa mengirimkan data ke API untuk memperbarui item
    console.log("Changes saved:", currentItem);
    handleCloseModal(); // Tutup modal setelah menyimpan
  };

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
                {Array.from({ length: tableHead.length }).map((_, i) => (
                  <td key={i} className="py-3 px-4">
                    <Skeleton height={20} />
                  </td>
                ))}
              </tr>
            ))
          ) : (
            items.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="py-3 px-4 text-gray-700">{item.itemName}</td>
                <td className="py-3 px-4 text-gray-700">{item.variant}</td>
                <td className="py-3 px-4 text-gray-700">{item.ingredients}</td>
                <td className="py-3 px-4 text-gray-700">{item.totalPrice}</td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => handleViewDetails(item)}
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition"
                  >
                    <PiClockCountdownLight />
                  </button>
                </td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => handleEditItem(item)} // Panggil fungsi edit
                    className="bg-yellow-500 text-white p-2 rounded hover:bg-yellow-600 transition"
                  >
                    <AiOutlineEdit /> {/* Ikon edit */}
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* Modal untuk Edit Item */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-bold mb-4">Edit Item</h3>
            <form onSubmit={(e) => { e.preventDefault(); handleSaveChanges(); }}>
              <div className="mb-4">
                <label className="block text-gray-700">Item Name:</label>
                <input
                  type="text"
                  value={currentItem?.itemName}
                  onChange={(e) => setCurrentItem({ ...currentItem, itemName: e.target.value })}
                  className="border rounded px-3 py-2 w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Variant:</label>
                <input
                  type="text"
                  value={currentItem?.variant}
                  onChange={(e) => setCurrentItem({ ...currentItem, variant: e.target.value })}
                  className="border rounded px-3 py-2 w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Ingredients:</label>
                <input
                  type="text"
                  value={currentItem?.ingredients}
                  onChange={(e) => setCurrentItem({ ...currentItem, ingredients: e.target.value })}
                  className="border rounded px-3 py-2 w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Total Price:</label>
                <input
                  type="text"
                  value={currentItem?.totalPrice}
                  onChange={(e) => setCurrentItem({ ...currentItem, totalPrice: e.target.value })}
                  className="border rounded px-3 py-2 w-full"
                  required
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded mr-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableItems;
